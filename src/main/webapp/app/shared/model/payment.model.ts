import { Moment } from 'moment';
import { IStudent } from 'app/shared/model//student.model';

export interface IPayment {
    id?: number;
    date?: Moment;
    sum?: number;
    student?: IStudent;
}

export class Payment implements IPayment {
    constructor(public id?: number, public date?: Moment, public sum?: number, public student?: IStudent) {}
}
