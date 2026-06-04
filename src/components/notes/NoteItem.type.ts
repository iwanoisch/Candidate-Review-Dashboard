import type {CandidateNote} from "../../features/applicant/applicant.type.ts";

export interface NoteItemProps {
    note: CandidateNote;
    canDelete: boolean;
    onDelete: (noteId: string) => void;
}
