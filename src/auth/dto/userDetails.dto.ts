export class UserDetails {
    _id?: Object;
    firstName?: string;
    lastName?: string;
    email!: string;
    password!: string;
    confirmPass?: string;
    role?: string;
}