import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface ITeacher {
    id?: number;
    firstName?: string;
    lastName?: string;
    birthday?: Moment;
    phone?: string;
    email?: string;
    user?: IUser;
}

export class Teacher implements ITeacher {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public birthday?: Moment,
        public phone?: string,
        public email?: string,
        public user?: IUser
    ) {}
}
