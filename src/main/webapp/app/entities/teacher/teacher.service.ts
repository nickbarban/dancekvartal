import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITeacher } from 'app/shared/model/teacher.model';

type EntityResponseType = HttpResponse<ITeacher>;
type EntityArrayResponseType = HttpResponse<ITeacher[]>;

@Injectable({ providedIn: 'root' })
export class TeacherService {
    public resourceUrl = SERVER_API_URL + 'api/teachers';

    constructor(protected http: HttpClient) {}

    create(teacher: ITeacher): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(teacher);
        return this.http
            .post<ITeacher>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(teacher: ITeacher): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(teacher);
        return this.http
            .put<ITeacher>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITeacher>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITeacher[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(teacher: ITeacher): ITeacher {
        const copy: ITeacher = Object.assign({}, teacher, {
            birthday: teacher.birthday != null && teacher.birthday.isValid() ? teacher.birthday.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.birthday = res.body.birthday != null ? moment(res.body.birthday) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((teacher: ITeacher) => {
                teacher.birthday = teacher.birthday != null ? moment(teacher.birthday) : null;
            });
        }
        return res;
    }
}
