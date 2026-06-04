import {SubmitEventHandler, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ChatBubbleLeftIcon, PaperAirplaneIcon} from '@heroicons/react/24/outline';
import type {NotesFeedbackProps} from './Notes.type.ts';
import NoteItem from "./NoteItem.tsx";

export const Notes = ({notes, isAdmin, currentUserName, onAddNote, onDeleteNote}: NotesFeedbackProps) => {
    const {t} = useTranslation();
    const [content, setContent] = useState('');

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const trimmed = content.trim();
        if (!trimmed || !onAddNote) return;
        onAddNote(trimmed);
        setContent('');
    };

    return (
        <article
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4"
            aria-label={t('notes.section_label')}
        >
            {/* Header */}
            <div className="flex items-center space-x-2 text-slate-800">
                <ChatBubbleLeftIcon className="size-5 shrink-0 text-amber-500" aria-hidden="true"/>
                <h3 className="font-bold text-xs uppercase tracking-widest">
                    {t('notes.title')} ({notes.length})
                </h3>
            </div>

            {/* Form - solo admin */}
            {isAdmin && (
                <div className="border-b border-slate-100 pb-4">
                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <label htmlFor="note-input" className="sr-only">
                            {t('notes.placeholder')}
                        </label>
                        <textarea
                            id="note-input"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={t('notes.placeholder')}
                            rows={3}
                            required
                            className="w-full bg-slate-50 border border-slate-200 focus:border-primary-500 hover:border-slate-300 focus:bg-white rounded-xl p-3 text-xs outline-none transition-all duration-150 resize-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!content.trim()}
                                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 text-white rounded-xl text-xs font-semibold transition-colors duration-150 disabled:opacity-40"
                                aria-label={t('notes.submit')}
                            >
                                <PaperAirplaneIcon className="size-3.5" aria-hidden="true"/>
                                <span>{t('notes.submit')}</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Notes list */}
            {notes.length > 0 ? (
                <div
                    className="space-y-3 max-h-56 overflow-y-auto pr-1"
                    role="list"
                    aria-label={t('notes.list_label')}
                >
                    {notes.map((note) => (
                        <div key={note.id} role="listitem">
                            <NoteItem
                                note={note}
                                canDelete={isAdmin && note.author === currentUserName}
                                onDelete={onDeleteNote}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-xs text-slate-400 text-center py-4">
                    {t('notes.empty')}
                </p>
            )}
        </article>
    );
};
