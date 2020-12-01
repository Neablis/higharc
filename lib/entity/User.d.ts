import { BaseEntity } from 'typeorm';
export default class User extends BaseEntity {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isAdmin: boolean;
    addId(): void;
    hashPassword(): Promise<void>;
}
//# sourceMappingURL=User.d.ts.map