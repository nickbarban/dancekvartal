import { Moment } from 'moment';

export interface ITeacher {
    id?: number;
    firstName?: string;
    lastName?: string;
    birthday?: Moment;
    phone?: string;
    email?: string;
}

export class Teacher implements ITeacher {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public birthday?: Moment,
        public phone?: string,
        public email?: string
    ) {}
}
