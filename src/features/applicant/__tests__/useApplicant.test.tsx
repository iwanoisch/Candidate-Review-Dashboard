import {renderHook, act} from '@testing-library/react';
import {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {useApplicant} from '../useApplicant';
import {createTestStore, mockAlertContext} from '../../../test/test-utils';
import {AlertContext} from '../../../common/alert/AlertContext';
import {ApiSimulationContext} from '../../../common/api-simulation/ApiSimulationContext';
import {DEFAULT_FILTERS} from '../../../constants/filter.constant';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({t: (key: string) => key}),
}));

// Elimina i delay dei mock per velocizzare i test
vi.spyOn(globalThis, 'setTimeout').mockImplementation((fn: TimerHandler) => {
    if (typeof fn === 'function') fn();
    return 0 as unknown as ReturnType<typeof setTimeout>;
});

interface WrapperOptions {
    simulateError?: boolean;
    simulateLatency?: boolean;
}

function createWrapper(options: WrapperOptions = {}) {
    const store = createTestStore();
    const simulationValue = {
        simulateError: options.simulateError ?? false,
        setSimulateError: vi.fn(),
        simulateLatency: options.simulateLatency ?? false,
        setSimulateLatency: vi.fn(),
    };

    const Wrapper = ({children}: { children: ReactNode }) => (
        <Provider store={store}>
            <MemoryRouter>
                <AlertContext.Provider value={mockAlertContext}>
                    <ApiSimulationContext.Provider value={simulationValue}>
                        {children}
                    </ApiSimulationContext.Provider>
                </AlertContext.Provider>
            </MemoryRouter>
        </Provider>
    );

    return {Wrapper, store};
}

describe('useApplicant', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('initial state', () => {
        it('should return empty initial state', () => {
            const {Wrapper} = createWrapper();
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            expect(result.current.candidates).toEqual([]);
            expect(result.current.selectedCandidate).toBeNull();
            expect(result.current.pagination).toBeNull();
            expect(result.current.stats).toBeNull();
        });
    });

    describe('getCandidates — happy path', () => {
        it('should load candidates with default filters', async () => {
            const {Wrapper} = createWrapper();
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            await act(async () => {

                await result.current.getCandidates(DEFAULT_FILTERS);
            });

            expect(result.current.candidates.length).toBeGreaterThan(0);
            expect(result.current.pagination).not.toBeNull();
            expect(result.current.pagination!.currentPage).toBe(1);
        });

        it('should return empty array when search matches nothing', async () => {
            const {Wrapper} = createWrapper();
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            await act(async () => {

                await result.current.getCandidates({...DEFAULT_FILTERS, search: 'xyznonexistent123'});
            });

            expect(result.current.candidates).toEqual([]);
            expect(result.current.pagination!.totalItems).toBe(0);
        });

        it('should paginate candidates', async () => {
            const {Wrapper} = createWrapper();
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            // Page 1
            await act(async () => {

                await result.current.getCandidates(DEFAULT_FILTERS, 1, 3);
            });

            const firstPageCount = result.current.candidates.length;
            expect(firstPageCount).toBe(3);

            // Page 2 — append
            await act(async () => {

                await result.current.getCandidates(DEFAULT_FILTERS, 2, 3);
            });

            expect(result.current.candidates.length).toBe(6);
            expect(result.current.pagination!.currentPage).toBe(2);
        });
    });

    describe('getApplicantStats — happy path', () => {
        it('should load stats', async () => {
            const {Wrapper} = createWrapper();
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            await act(async () => {

                await result.current.getApplicantStats();
            });

            expect(result.current.stats).not.toBeNull();
            expect(result.current.stats!.totalCandidates).toBeGreaterThan(0);
            expect(typeof result.current.stats!.avgScore).toBe('number');
        });
    });

    describe('getCandidateDetail — happy path', () => {
        it('should load candidate detail by id', async () => {
            const {Wrapper} = createWrapper();
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            // First load candidates to get an ID
            await act(async () => {

                await result.current.getCandidates(DEFAULT_FILTERS);
            });

            const candidateId = result.current.candidates[0].id;

            await act(async () => {

                await result.current.getCandidateDetail(candidateId);
            });

            expect(result.current.selectedCandidate).not.toBeNull();
            expect(result.current.selectedCandidate!.id).toBe(candidateId);
        });

        it('should set null when candidate id does not exist', async () => {
            const {Wrapper} = createWrapper();
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            await act(async () => {

                await result.current.getCandidateDetail('non-existent-id');
            });

            expect(result.current.selectedCandidate).toBeNull();
        });
    });

    describe('clearSelectedCandidate', () => {
        it('should clear selected candidate', async () => {
            const {Wrapper} = createWrapper();
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            // Load candidates + detail
            await act(async () => {

                await result.current.getCandidates(DEFAULT_FILTERS);
            });

            await act(async () => {

                await result.current.getCandidateDetail(result.current.candidates[0].id);
            });

            expect(result.current.selectedCandidate).not.toBeNull();

            act(() => {
                result.current.clearSelectedCandidate();
            });

            expect(result.current.selectedCandidate).toBeNull();
        });
    });

    describe('API error simulation', () => {
        it('getCandidates should show alert and return false on error', async () => {
            const {Wrapper} = createWrapper({simulateError: true});
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            let returnValue: boolean = true;
            await act(async () => {

                returnValue = await result.current.getCandidates(DEFAULT_FILTERS);
            });

            expect(returnValue).toBe(false);
            expect(mockAlertContext.showAlert).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'error',
                    message: expect.stringContaining('500'),
                })
            );
        });

        it('getApplicantStats should show alert and return null on error', async () => {
            const {Wrapper} = createWrapper({simulateError: true});
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            let returnValue: unknown = 'not-null';
            await act(async () => {

                returnValue = await result.current.getApplicantStats();
            });

            expect(returnValue).toBeNull();
            expect(mockAlertContext.showAlert).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'error',
                    message: expect.stringContaining('500'),
                })
            );
        });

        it('getCandidateDetail should show alert, clear selection and return null on error', async () => {
            const {Wrapper} = createWrapper({simulateError: true});
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            let returnValue: unknown = 'not-null';
            await act(async () => {

                returnValue = await result.current.getCandidateDetail('any-id');
            });

            expect(returnValue).toBeNull();
            expect(result.current.selectedCandidate).toBeNull();
            expect(mockAlertContext.showAlert).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'error',
                    message: expect.stringContaining('500'),
                })
            );
        });

        it('app state remains consistent after API error — no crash, no stale data', async () => {
            const {Wrapper} = createWrapper({simulateError: true});
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            await act(async () => {

                await result.current.getCandidates(DEFAULT_FILTERS);
            });

            await act(async () => {

                await result.current.getApplicantStats();
            });

            await act(async () => {

                await result.current.getCandidateDetail('any-id');
            });

            // State should still be at defaults — no crash
            expect(result.current.candidates).toEqual([]);
            expect(result.current.stats).toBeNull();
            expect(result.current.selectedCandidate).toBeNull();
            expect(result.current.pagination).toBeNull();
        });
    });

    describe('addNote', () => {
        it('should add a note to selected candidate', async () => {
            const {Wrapper} = createWrapper();
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            // Load candidates + select first
            await act(async () => {

                await result.current.getCandidates(DEFAULT_FILTERS);
            });
            await act(async () => {

                await result.current.getCandidateDetail(result.current.candidates[0].id);
            });

            const notesBefore = result.current.selectedCandidate!.notes?.length ?? 0;

            act(() => {
                result.current.addNote('Test note content', 'Admin User', 'admin');
            });

            const notesAfter = result.current.selectedCandidate!.notes?.length ?? 0;
            expect(notesAfter).toBe(notesBefore + 1);
            expect(result.current.selectedCandidate!.notes![0].content).toBe('Test note content');
        });

        it('should add timeline event when adding note', async () => {
            const {Wrapper} = createWrapper();
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            await act(async () => {

                await result.current.getCandidates(DEFAULT_FILTERS);
            });
            await act(async () => {

                await result.current.getCandidateDetail(result.current.candidates[0].id);
            });

            const timelineBefore = result.current.selectedCandidate!.timeline?.length ?? 0;

            act(() => {
                result.current.addNote('New note', 'Admin User', 'admin');
            });

            const timelineAfter = result.current.selectedCandidate!.timeline?.length ?? 0;
            expect(timelineAfter).toBe(timelineBefore + 1);
            expect(result.current.selectedCandidate!.timeline![0].type).toBe('note_added');
        });

        it('should do nothing if no candidate is selected', () => {
            const {Wrapper} = createWrapper();
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            // No candidate loaded — should not throw
            act(() => {
                result.current.addNote('Test', 'Admin', 'admin');
            });

            expect(result.current.selectedCandidate).toBeNull();
        });
    });

    describe('deleteNote', () => {
        it('should remove a note from selected candidate', async () => {
            const {Wrapper} = createWrapper();
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            await act(async () => {

                await result.current.getCandidates(DEFAULT_FILTERS);
            });
            await act(async () => {

                await result.current.getCandidateDetail(result.current.candidates[0].id);
            });

            // Add a note first
            act(() => {
                result.current.addNote('To be deleted', 'Admin User', 'admin');
            });

            const noteId = result.current.selectedCandidate!.notes![0].id;
            const notesBefore = result.current.selectedCandidate!.notes!.length;

            act(() => {
                result.current.deleteNote(noteId);
            });

            expect(result.current.selectedCandidate!.notes!.length).toBe(notesBefore - 1);
            expect(result.current.selectedCandidate!.notes!.find(n => n.id === noteId)).toBeUndefined();
        });
    });

    describe('changeCandidateStatus', () => {
        it('should change status and add timeline event', async () => {
            const {Wrapper} = createWrapper();
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            await act(async () => {

                await result.current.getCandidates(DEFAULT_FILTERS);
            });
            await act(async () => {

                await result.current.getCandidateDetail(result.current.candidates[0].id);
            });

            const oldStatus = result.current.selectedCandidate!.status;

            act(() => {
                result.current.changeCandidateStatus('Rejected', 'Admin User', 'admin');
            });

            expect(result.current.selectedCandidate!.status).toBe('Rejected');
            expect(result.current.selectedCandidate!.timeline![0].type).toBe('status_change');
            expect(result.current.selectedCandidate!.timeline![0].meta?.oldStatus).toBe(oldStatus);
            expect(result.current.selectedCandidate!.timeline![0].meta?.newStatus).toBe('Rejected');
        });

        it('should also update the candidate in the candidates list', async () => {
            const {Wrapper} = createWrapper();
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            await act(async () => {

                await result.current.getCandidates(DEFAULT_FILTERS);
            });
            await act(async () => {

                await result.current.getCandidateDetail(result.current.candidates[0].id);
            });

            const candidateId = result.current.selectedCandidate!.id;

            act(() => {
                result.current.changeCandidateStatus('Hired', 'Admin User', 'admin');
            });

            const updatedInList = result.current.candidates.find(c => c.id === candidateId);
            expect(updatedInList!.status).toBe('Hired');
        });

        it('should do nothing if no candidate is selected', () => {
            const {Wrapper} = createWrapper();
            const {result} = renderHook(() => useApplicant(), {wrapper: Wrapper});

            // No candidate loaded — should not throw
            act(() => {
                result.current.changeCandidateStatus('Hired', 'Admin', 'admin');
            });

            expect(result.current.selectedCandidate).toBeNull();
        });
    });
});
