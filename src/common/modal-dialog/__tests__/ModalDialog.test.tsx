import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ModalDialog} from '../ModalDialog';

describe('ModalDialog', () => {
    const defaultProps = {
        type: 'info' as const,
        title: 'Confirm Action',
        message: 'Are you sure?',
        onClose: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render title and message', () => {
        render(<ModalDialog {...defaultProps}/>);
        expect(screen.getByText('Confirm Action')).toBeInTheDocument();
        expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    });

    it('should render different dialog types', () => {
        const types = ['success', 'error', 'warning', 'info'] as const;

        types.forEach(type => {
            const {unmount} = render(
                <ModalDialog {...defaultProps} type={type} message={`${type} dialog`}/>
            );
            expect(screen.getByText(`${type} dialog`)).toBeInTheDocument();
            unmount();
        });
    });

    it('should render action links when provided', () => {
        const links = [
            {text: 'Confirm', onClick: vi.fn(), variant: 'primary' as const},
            {text: 'Cancel', onClick: vi.fn(), variant: 'cancel' as const},
        ];
        render(<ModalDialog {...defaultProps} links={links}/>);

        expect(screen.getByText('Confirm')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('should call link onClick when clicked', async () => {
        const user = userEvent.setup();
        const onConfirm = vi.fn();
        render(
            <ModalDialog
                {...defaultProps}
                links={[{text: 'Confirm', onClick: onConfirm}]}
            />
        );

        await user.click(screen.getByText('Confirm'));
        expect(onConfirm).toHaveBeenCalledTimes(1);
    });
});
