import {describe, it, expect, vi, beforeEach} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ModalDialogContext} from '../../common/modal-dialog/ModalDialogContext';
import type {ModalDialogOptions} from '../../common/modal-dialog/ModalDialog.type';
import NoteItem from '../notes/NoteItem';
import {StatusRecruitment} from '../statusRecruitment/StatusRecruitment';
import type {CandidateNote} from '../../features/applicant/applicant.type';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({t: (key: string, fallback?: string) => fallback ?? key}),
}));

let lastModalOptions: ModalDialogOptions | null = null;
const mockShowModalDialog = vi.fn((options: ModalDialogOptions) => {
    lastModalOptions = options;
    return 'mock-modal-id';
});
const mockHideModalDialog = vi.fn();
const mockModalContext = {
    showModalDialog: mockShowModalDialog,
    hideModalDialog: mockHideModalDialog,
    hideAllModalsDialog: vi.fn(),
};

beforeEach(() => {
    lastModalOptions = null;
    mockShowModalDialog.mockClear();
    mockHideModalDialog.mockClear();
});

const mockNote: CandidateNote = {
    id: 'note-1',
    author: 'Admin User',
    authorRole: 'admin',
    date: '2026-01-01',
    content: 'Test note',
};

describe('NoteItem — delete confirmation modal', () => {
    const renderNoteItem = (canDelete: boolean, onDelete = vi.fn()) => {
        render(
            <ModalDialogContext.Provider value={mockModalContext}>
                <NoteItem note={mockNote} canDelete={canDelete} onDelete={onDelete}/>
            </ModalDialogContext.Provider>
        );
        return {onDelete};
    };

    it('should call showModalDialog with type warning when clicking delete', async () => {
        const user = userEvent.setup();
        renderNoteItem(true);

        const deleteButton = screen.getByRole('button', {name: 'Elimina nota'});
        await user.click(deleteButton);

        expect(mockShowModalDialog).toHaveBeenCalledTimes(1);
        expect(mockShowModalDialog).toHaveBeenCalledWith(
            expect.objectContaining({type: 'warning'})
        );
    });

    it('should have Elimina and Annulla links in the modal options', async () => {
        const user = userEvent.setup();
        renderNoteItem(true);

        const deleteButton = screen.getByRole('button', {name: 'Elimina nota'});
        await user.click(deleteButton);

        expect(lastModalOptions).not.toBeNull();
        expect(lastModalOptions!.links).toHaveLength(2);
        expect(lastModalOptions!.links![0].text).toBe('Elimina');
        expect(lastModalOptions!.links![0].variant).toBe('danger');
        expect(lastModalOptions!.links![1].text).toBe('Annulla');
        expect(lastModalOptions!.links![1].variant).toBe('cancel');
    });

    it('should call onDelete and hideModalDialog when confirming deletion', async () => {
        const user = userEvent.setup();
        const onDelete = vi.fn();
        renderNoteItem(true, onDelete);

        const deleteButton = screen.getByRole('button', {name: 'Elimina nota'});
        await user.click(deleteButton);

        // Simulate clicking 'Elimina' (confirm)
        lastModalOptions!.links![0].onClick();

        expect(onDelete).toHaveBeenCalledTimes(1);
        expect(onDelete).toHaveBeenCalledWith('note-1');
        expect(mockHideModalDialog).toHaveBeenCalledWith('mock-modal-id');
    });

    it('should NOT call onDelete but should call hideModalDialog when cancelling', async () => {
        const user = userEvent.setup();
        const onDelete = vi.fn();
        renderNoteItem(true, onDelete);

        const deleteButton = screen.getByRole('button', {name: 'Elimina nota'});
        await user.click(deleteButton);

        // Simulate clicking 'Annulla' (cancel)
        lastModalOptions!.links![1].onClick();

        expect(onDelete).not.toHaveBeenCalled();
        expect(mockHideModalDialog).toHaveBeenCalledWith('mock-modal-id');
    });

    it('should not render delete button when canDelete is false', () => {
        renderNoteItem(false);

        const deleteButton = screen.queryByRole('button', {name: 'Elimina nota'});
        expect(deleteButton).not.toBeInTheDocument();
    });
});

describe('StatusRecruitment — status change confirmation modal', () => {
    const renderStatusRecruitment = (
        currentStatus: 'Applied' | 'Screening' | 'Interviewing' | 'Offered' | 'Hired' | 'Rejected' = 'Screening',
        isAdmin = true,
        onStatusChange = vi.fn()
    ) => {
        render(
            <ModalDialogContext.Provider value={mockModalContext}>
                <StatusRecruitment
                    currentStatus={currentStatus}
                    isAdmin={isAdmin}
                    onStatusChange={onStatusChange}
                />
            </ModalDialogContext.Provider>
        );
        return {onStatusChange};
    };

    it('should call showModalDialog with type info when clicking a different status', async () => {
        const user = userEvent.setup();
        renderStatusRecruitment('Screening');

        // Click a status that is NOT the current one
        const offerButton = screen.getByRole('radio', {name: 'Offerta'});
        await user.click(offerButton);

        expect(mockShowModalDialog).toHaveBeenCalledTimes(1);
        expect(mockShowModalDialog).toHaveBeenCalledWith(
            expect.objectContaining({type: 'info'})
        );
    });

    it('should NOT call showModalDialog when clicking the current status', async () => {
        const user = userEvent.setup();
        renderStatusRecruitment('Screening');

        const screeningButton = screen.getByRole('radio', {name: 'Screening'});
        await user.click(screeningButton);

        expect(mockShowModalDialog).not.toHaveBeenCalled();
    });

    it('should call onStatusChange with new status and hideModalDialog when confirming', async () => {
        const user = userEvent.setup();
        const onStatusChange = vi.fn();
        renderStatusRecruitment('Screening', true, onStatusChange);

        const offerButton = screen.getByRole('radio', {name: 'Offerta'});
        await user.click(offerButton);

        // Simulate clicking 'Conferma' (confirm)
        lastModalOptions!.links![0].onClick();

        expect(onStatusChange).toHaveBeenCalledTimes(1);
        expect(onStatusChange).toHaveBeenCalledWith('Offered');
        expect(mockHideModalDialog).toHaveBeenCalledWith('mock-modal-id');
    });

    it('should NOT call onStatusChange but should call hideModalDialog when cancelling', async () => {
        const user = userEvent.setup();
        const onStatusChange = vi.fn();
        renderStatusRecruitment('Screening', true, onStatusChange);

        const offerButton = screen.getByRole('radio', {name: 'Offerta'});
        await user.click(offerButton);

        // Simulate clicking 'Annulla' (cancel)
        lastModalOptions!.links![1].onClick();

        expect(onStatusChange).not.toHaveBeenCalled();
        expect(mockHideModalDialog).toHaveBeenCalledWith('mock-modal-id');
    });

    it('should have Conferma and Annulla links in the modal options', async () => {
        const user = userEvent.setup();
        renderStatusRecruitment('Screening');

        const offerButton = screen.getByRole('radio', {name: 'Offerta'});
        await user.click(offerButton);

        expect(lastModalOptions).not.toBeNull();
        expect(lastModalOptions!.links).toHaveLength(2);
        expect(lastModalOptions!.links![0].text).toBe('Conferma');
        expect(lastModalOptions!.links![0].variant).toBe('primary');
        expect(lastModalOptions!.links![1].text).toBe('Annulla');
        expect(lastModalOptions!.links![1].variant).toBe('cancel');
    });
});
