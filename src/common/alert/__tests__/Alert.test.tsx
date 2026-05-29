import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Alert} from '../Alert';

describe('Alert', () => {
    const defaultProps = {
        type: 'success' as const,
        message: 'Operation completed',
        onClose: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render the message', () => {
        render(<Alert {...defaultProps}/>);
        expect(screen.getByText('Operation completed')).toBeInTheDocument();
    });

    it('should render the title when provided', () => {
        render(<Alert {...defaultProps} title="Success"/>);
        expect(screen.getByText('Success')).toBeInTheDocument();
    });

    it('should not render title when not provided', () => {
        render(<Alert {...defaultProps}/>);
        expect(screen.queryByText('Success')).not.toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', async () => {
        const user = userEvent.setup();
        render(<Alert {...defaultProps}/>);

        await user.click(screen.getByRole('button', {name: /close/i}));
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('should render different alert types', () => {
        const types = ['success', 'error', 'warning', 'info'] as const;

        types.forEach(type => {
            const {unmount} = render(
                <Alert {...defaultProps} type={type} message={`${type} message`}/>
            );
            expect(screen.getByText(`${type} message`)).toBeInTheDocument();
            unmount();
        });
    });

    it('should render action links when provided', () => {
        const links = [
            {text: 'Retry', onClick: vi.fn()},
            {text: 'Dismiss', onClick: vi.fn()},
        ];
        render(<Alert {...defaultProps} links={links}/>);

        expect(screen.getByText('Retry')).toBeInTheDocument();
        expect(screen.getByText('Dismiss')).toBeInTheDocument();
    });

    it('should call link onClick when link is clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<Alert {...defaultProps} links={[{text: 'Retry', onClick}]}/>);

        await user.click(screen.getByText('Retry'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
