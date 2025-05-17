import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './entity';
import { GetAllUsersDTO } from './dtos/get-all-users.dto';

export interface UsersContract {
  GetById: {
    Pattern: 'user_get_by_id'; // ⬅️ Important for strong pattern linking
    Request: { id: string };
    Response: User | undefined | null;
  };

  Create: {
    Pattern: 'user_create';
    Request: CreateUserDTO;
    Response: User;
  };

  GetAll: {
    Pattern: 'user_get_all';
    Request: GetAllUsersDTO;
    Response: User[];
  };
}

// Helper to extract the pattern type
type ExtractPattern<T> = T extends { Pattern: infer P } ? P : never;

// Auto-generate UsersPatterns
export const UsersPatterns: {
  [K in keyof UsersContract]: ExtractPattern<UsersContract[K]>;
} = {
  GetById: 'user_get_by_id',
  Create: 'user_create',
  GetAll: 'user_get_all',
} as const;
