import { ITeacher } from 'app/shared/model//teacher.model';
import { ILesson } from 'app/shared/model//lesson.model';
import { IStudent } from 'app/shared/model//student.model';

export interface ICourse {
    id?: number;
    name?: string;
    teacher?: ITeacher;
    lessons?: ILesson[];
    students?: IStudent[];
}

export class Course implements ICourse {
    constructor(
        public id?: number,
        public name?: string,
        public teacher?: ITeacher,
        public lessons?: ILesson[],
        public students?: IStudent[]
    ) {}
}
