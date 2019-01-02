export interface ICourse {
    id?: number;
    name?: string;
}

export class Course implements ICourse {
    constructor(public id?: number, public name?: string) {}
}
