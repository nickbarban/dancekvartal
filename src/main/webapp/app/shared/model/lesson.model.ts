import { Moment } from 'moment';
import { IStudent } from 'app/shared/model//student.model';
import { ICourse } from 'app/shared/model//course.model';

export interface ILesson {
    id?: number;
    name?: string;
    date?: Moment;
    students?: IStudent[];
    course?: ICourse;
}

export class Lesson implements ILesson {
    constructor(public id?: number, public name?: string, public date?: Moment, public students?: IStudent[], public course?: ICourse) {}
}
