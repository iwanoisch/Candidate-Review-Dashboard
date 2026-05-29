import {renderHook} from '@testing-library/react';
import {usePermissions} from '../usePermissions';
import {ROLE_PERMISSIONS} from '../../../constants/permissions.constant';
import {createTestStore, mockAdminUser, mockViewerUser} from '../../../test/test-utils';
import {Provider} from 'react-redux';
import type {ReactNode} from 'react';

function createWrapper(preloadedAuth: Parameters<typeof createTestStore>[0]) {
    const store = createTestStore(preloadedAuth);
    return ({children}: {children: ReactNode}) => (
        <Provider store={store}>{children}</Provider>
    );
}

describe('ROLE_PERMISSIONS', () => {
    it('admin should have all permissions', () => {
        expect(ROLE_PERMISSIONS.admin).toContain('candidates:read');
        expect(ROLE_PERMISSIONS.admin).toContain('candidates:edit');
        expect(ROLE_PERMISSIONS.admin).toContain('candidates:delete');
        expect(ROLE_PERMISSIONS.admin).toContain('candidates:add_note');
        expect(ROLE_PERMISSIONS.admin).toContain('candidates:change_status');
        expect(ROLE_PERMISSIONS.admin).toContain('settings:edit_profile');
        expect(ROLE_PERMISSIONS.admin).toContain('settings:edit_theme');
    });

    it('viewer should only have read and theme permissions', () => {
        expect(ROLE_PERMISSIONS.viewer).toContain('candidates:read');
        expect(ROLE_PERMISSIONS.viewer).toContain('settings:edit_theme');
        expect(ROLE_PERMISSIONS.viewer).not.toContain('candidates:edit');
        expect(ROLE_PERMISSIONS.viewer).not.toContain('candidates:delete');
    });
});

describe('usePermissions', () => {
    describe('admin role', () => {
        it('should return admin role and all permissions', () => {
            const wrapper = createWrapper({auth: {user: mockAdminUser, isAuthenticated: true, token: 'tok'}});
            const {result} = renderHook(() => usePermissions(), {wrapper});

            expect(result.current.role).toBe('admin');
            expect(result.current.permissions).toEqual(ROLE_PERMISSIONS.admin);
        });

        it('can() should return true for all admin permissions', () => {
            const wrapper = createWrapper({auth: {user: mockAdminUser, isAuthenticated: true, token: 'tok'}});
            const {result} = renderHook(() => usePermissions(), {wrapper});

            expect(result.current.can('candidates:edit')).toBe(true);
            expect(result.current.can('candidates:delete')).toBe(true);
            expect(result.current.can('settings:edit_profile')).toBe(true);
        });

        it('canAll() should return true when admin has all requested permissions', () => {
            const wrapper = createWrapper({auth: {user: mockAdminUser, isAuthenticated: true, token: 'tok'}});
            const {result} = renderHook(() => usePermissions(), {wrapper});

            expect(result.current.canAll('candidates:read', 'candidates:edit', 'candidates:delete')).toBe(true);
        });
    });

    describe('viewer role', () => {
        it('should return viewer role with limited permissions', () => {
            const wrapper = createWrapper({auth: {user: mockViewerUser, isAuthenticated: true, token: 'tok'}});
            const {result} = renderHook(() => usePermissions(), {wrapper});

            expect(result.current.role).toBe('viewer');
            expect(result.current.permissions).toEqual(ROLE_PERMISSIONS.viewer);
        });

        it('can() should return false for edit/delete permissions', () => {
            const wrapper = createWrapper({auth: {user: mockViewerUser, isAuthenticated: true, token: 'tok'}});
            const {result} = renderHook(() => usePermissions(), {wrapper});

            expect(result.current.can('candidates:edit')).toBe(false);
            expect(result.current.can('candidates:delete')).toBe(false);
            expect(result.current.can('candidates:read')).toBe(true);
        });

        it('canAll() should return false when viewer lacks some permissions', () => {
            const wrapper = createWrapper({auth: {user: mockViewerUser, isAuthenticated: true, token: 'tok'}});
            const {result} = renderHook(() => usePermissions(), {wrapper});

            expect(result.current.canAll('candidates:read', 'candidates:edit')).toBe(false);
        });

        it('canAny() should return true when viewer has at least one permission', () => {
            const wrapper = createWrapper({auth: {user: mockViewerUser, isAuthenticated: true, token: 'tok'}});
            const {result} = renderHook(() => usePermissions(), {wrapper});

            expect(result.current.canAny('candidates:read', 'candidates:edit')).toBe(true);
        });

        it('canAny() should return false when viewer has none of the permissions', () => {
            const wrapper = createWrapper({auth: {user: mockViewerUser, isAuthenticated: true, token: 'tok'}});
            const {result} = renderHook(() => usePermissions(), {wrapper});

            expect(result.current.canAny('candidates:edit', 'candidates:delete')).toBe(false);
        });
    });

    describe('unauthenticated user', () => {
        it('should return no role and empty permissions', () => {
            const wrapper = createWrapper({});
            const {result} = renderHook(() => usePermissions(), {wrapper});

            expect(result.current.role).toBeUndefined();
            expect(result.current.permissions).toEqual([]);
        });

        it('can() should return false for any permission', () => {
            const wrapper = createWrapper({});
            const {result} = renderHook(() => usePermissions(), {wrapper});

            expect(result.current.can('candidates:read')).toBe(false);
        });
    });
});
