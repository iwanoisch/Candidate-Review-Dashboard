import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ModalDialogContext} from '../../common/modal-dialog/ModalDialogContext';
import {Notes} from '../notes/Notes';
import {StatusRecruitment} from '../statusRecruitment/StatusRecruitment';
import type {CandidateNote} from '../../features/applicant/applicant.type';
import type {CandidateStatus} from '../../features/applicant/applicant.type';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({t: (key: string) => key}),
}));

const mockModalDialogContext = {
    showModalDialog: vi.fn(() => 'mock-id'),
    hideModalDialog: vi.fn(),
    hideAllModalsDialog: vi.fn(),
};

const mockNote: CandidateNote = {
    id: 'note-1',
    author: 'Admin User',
    authorRole: 'admin' as const,
    date: '2026-01-01',
    content: 'Test note content',
};

const mockNoteByOther: CandidateNote = {
    id: 'note-2',
    author: 'Other User',
    authorRole: 'admin' as const,
    date: '2026-01-02',
    content: 'Note by someone else',
};

function renderWithModalDialog(ui: React.ReactElement) {
    return render(
        <ModalDialogContext.Provider value={mockModalDialogContext}>
            {ui}
        </ModalDialogContext.Provider>
    );
}

describe('Role-based access', () => {
    describe('Notes component', () => {
        const defaultProps = {
            notes: [mockNote, mockNoteByOther],
            currentUserName: 'Admin User',
            onAddNote: vi.fn(),
            onDeleteNote: vi.fn(),
        };

        it('admin sees textarea for adding notes', () => {
            renderWithModalDialog(
                <Notes {...defaultProps} isAdmin={true}/>
            );

            expect(screen.getByRole('textbox')).toBeInTheDocument();
        });

        it('admin sees submit button', () => {
            renderWithModalDialog(
                <Notes {...defaultProps} isAdmin={true}/>
            );

            expect(screen.getByRole('button', {name: 'notes.submit'})).toBeInTheDocument();
        });

        it('admin sees delete button on own notes', () => {
            renderWithModalDialog(
                <Notes {...defaultProps} isAdmin={true}/>
            );

            const deleteButtons = screen.getAllByRole('button', {name: 'notes.delete'});
            expect(deleteButtons.length).toBe(1);
        });

        it('admin does NOT see delete button on other people\'s notes', () => {
            renderWithModalDialog(
                <Notes
                    {...defaultProps}
                    notes={[mockNoteByOther]}
                    isAdmin={true}
                />
            );

            expect(screen.queryByRole('button', {name: 'notes.delete'})).not.toBeInTheDocument();
        });

        it('viewer does NOT see textarea', () => {
            renderWithModalDialog(
                <Notes {...defaultProps} isAdmin={false}/>
            );

            expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
        });

        it('viewer does NOT see submit button', () => {
            renderWithModalDialog(
                <Notes {...defaultProps} isAdmin={false}/>
            );

            expect(screen.queryByRole('button', {name: 'notes.submit'})).not.toBeInTheDocument();
        });

        it('viewer does NOT see delete button', () => {
            renderWithModalDialog(
                <Notes {...defaultProps} isAdmin={false}/>
            );

            expect(screen.queryByRole('button', {name: 'notes.delete'})).not.toBeInTheDocument();
        });
    });

    describe('StatusRecruitment component', () => {
        const defaultProps = {
            currentStatus: 'Screening' as CandidateStatus,
            onStatusChange: vi.fn(),
        };

        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('admin: status buttons are enabled', () => {
            renderWithModalDialog(
                <StatusRecruitment {...defaultProps} isAdmin={true}/>
            );

            const buttons = screen.getAllByRole('radio');
            buttons.forEach((button) => {
                expect(button).not.toBeDisabled();
            });
        });

        it('viewer: status buttons are disabled', () => {
            renderWithModalDialog(
                <StatusRecruitment {...defaultProps} isAdmin={false}/>
            );

            const buttons = screen.getAllByRole('radio');
            buttons.forEach((button) => {
                expect(button).toBeDisabled();
            });
        });

        it('admin: clicking a different status does NOT immediately call onStatusChange (modal should appear)', async () => {
            const user = userEvent.setup();

            renderWithModalDialog(
                <StatusRecruitment {...defaultProps} isAdmin={true}/>
            );

            const offeredButton = screen.getByRole('radio', {name: 'candidates.status_offered'});
            await user.click(offeredButton);

            expect(defaultProps.onStatusChange).not.toHaveBeenCalled();
            expect(mockModalDialogContext.showModalDialog).toHaveBeenCalled();
        });

        it('viewer: clicking status button does nothing (disabled)', async () => {
            const user = userEvent.setup();

            renderWithModalDialog(
                <StatusRecruitment {...defaultProps} isAdmin={false}/>
            );

            const offeredButton = screen.getByRole('radio', {name: 'candidates.status_offered'});
            await user.click(offeredButton);

            expect(defaultProps.onStatusChange).not.toHaveBeenCalled();
            expect(mockModalDialogContext.showModalDialog).not.toHaveBeenCalled();
        });
    });
});
