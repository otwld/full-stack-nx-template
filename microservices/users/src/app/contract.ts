export interface UsersContract {
    GetById: {
        Pattern: 'get_user_by_id';  // ⬅️ Important for strong pattern linking
        Request: { id: string };
        Response: { id: string; name: string } | undefined;
    };

    Create: {
        Pattern: 'create_user';
        Request: { name: string; };
        Response: { id: string, name: string };
    };
}

// Helper to extract the pattern type
type ExtractPattern<T> = T extends { Pattern: infer P } ? P : never;

// Auto-generate UsersPatterns
export const UsersPatterns: {
    [K in keyof UsersContract]: ExtractPattern<UsersContract[K]>;
} = {
    GetById: 'get_user_by_id',
    Create: 'create_user',
} as const;