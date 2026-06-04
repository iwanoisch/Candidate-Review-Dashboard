import {useTranslation} from 'react-i18next';
import {TrashIcon} from '@heroicons/react/24/outline';
import {useModalDialog} from "../../common/modal-dialog/useModalDialog.ts";
import {NoteItemProps} from "./NoteItem.type.ts";

const NoteItem = ({note, canDelete, onDelete}: NoteItemProps) => {
    const {t} = useTranslation();
    const {showModalDialog, hideModalDialog} = useModalDialog();

    const handleDelete = () => {
        const modalId = showModalDialog({
            type: 'warning',
            title: t('notes.confirm_delete_title', 'Elimina nota'),
            message: t('notes.confirm_delete', 'Sei sicuro di voler eliminare questa nota? L\'azione non può essere annullata.'),
            focusBlocked: true,
            duration: 0,
            links: [
                {
                    text: t('common.delete', 'Elimina'),
                    variant: 'danger',
                    onClick: () => {
                        onDelete(note.id);
                        hideModalDialog(modalId);
                    },
                },
                {
                    text: t('common.cancel', 'Annulla'),
                    variant: 'cancel',
                    onClick: () => {
                        hideModalDialog(modalId);
                    },
                },
            ],
        });
    };

    return (
        <article className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-600">{note.author}</span>
                    <span className="text-slate-300" aria-hidden="true">&bull;</span>
                    <span className="font-mono bg-amber-50 text-amber-800 border border-amber-100 rounded px-1 text-xs uppercase">
                        {note.authorRole}
                    </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <time dateTime={note.date} className="font-mono">
                        {note.date}
                    </time>
                    {canDelete && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="text-slate-400 hover:text-red-500 transition-colors duration-150 p-0.5 rounded focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                            aria-label={t('notes.delete', 'Elimina nota')}
                        >
                            <TrashIcon className="size-3.5" aria-hidden="true"/>
                        </button>
                    )}
                </div>
            </div>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {note.content}
            </p>
        </article>
    );
};

export default NoteItem;
