import type {User} from "../features/auth/slice/auth.type.ts";

export const MOCK_USERS: { email: string; password: string; user: User; token: string }[] = [
    {
        email: "admin",
        password: "admin",
        user: {
            id: "1",
            role: "admin",
            first_name: "Admin",
            last_name: "User",
            email: "admin@crd.local",
            name: "Admin User",
            short_name: "AU",
            avatar: "",
            created_at: "2026-01-01T00:00:00.000Z",
            updated_at: "2026-01-01T00:00:00.000Z",
        },
        token: "mock-token-admin-001",
    },
    {
        email: "viewer",
        password: "viewer",
        user: {
            id: "2",
            role: "viewer",
            first_name: "Viewer",
            last_name: "User",
            email: "viewer@crd.local",
            name: "Viewer User",
            short_name: "VU",
            avatar: "",
            created_at: "2026-01-01T00:00:00.000Z",
            updated_at: "2026-01-01T00:00:00.000Z",
        },
        token: "mock-token-viewer-002",
    },
];
