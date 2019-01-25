import { Moment } from 'moment';
import { ITeacher } from 'app/shared/model//teacher.model';
import { IStudent } from 'app/shared/model//student.model';

export interface ILesson {
    id?: number;
    name?: string;
    date?: Moment;
    teacher?: ITeacher;
    students?: IStudent[];
}

export class Lesson implements ILesson {
    constructor(public id?: number, public name?: string, public date?: Moment, public teacher?: ITeacher, public students?: IStudent[]) {}
}
