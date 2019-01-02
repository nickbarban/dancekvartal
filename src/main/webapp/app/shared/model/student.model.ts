import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IPayment } from 'app/shared/model//payment.model';

export interface IStudent {
    id?: number;
    firstName?: string;
    lastName?: string;
    birthday?: Moment;
    phone?: string;
    email?: string;
    user?: IUser;
    payments?: IPayment[];
}

export class Student implements IStudent {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public birthday?: Moment,
        public phone?: string,
        public email?: string,
        public user?: IUser,
        public payments?: IPayment[]
    ) {}
}
