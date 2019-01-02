import { Moment } from 'moment';

export interface ILesson {
    id?: number;
    name?: string;
    date?: Moment;
}

export class Lesson implements ILesson {
    constructor(public id?: number, public name?: string, public date?: Moment) {}
}
