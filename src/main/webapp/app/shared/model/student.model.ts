import { Moment } from 'moment';
import { IPayment } from 'app/shared/model//payment.model';
import { ILesson } from 'app/shared/model//lesson.model';

export interface IStudent {
    id?: number;
    firstName?: string;
    lastName?: string;
    birthday?: Moment;
    personalPhone?: string;
    parentPhone?: string;
    email?: string;
    payments?: IPayment[];
    lessons?: ILesson[];
}

export class Student implements IStudent {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public birthday?: Moment,
        public personalPhone?: string,
        public parentPhone?: string,
        public email?: string,
        public payments?: IPayment[],
        public lessons?: ILesson[]
    ) {}
}
