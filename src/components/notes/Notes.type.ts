import type {CandidateNote} from '../../features/applicant/applicant.type';

export interface NotesFeedbackProps {
    notes: CandidateNote[];
    isAdmin: boolean;
    currentUserName: string;
    onAddNote: (content: string) => void;
    onDeleteNote: (noteId: string) => void;
}
