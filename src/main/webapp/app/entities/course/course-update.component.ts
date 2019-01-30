import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from './course.service';
import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from 'app/entities/teacher';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student';
import { ILesson } from 'app/shared/model/lesson.model';
import { LessonService } from 'app/entities/lesson';

@Component({
    selector: 'jhi-course-update',
    templateUrl: './course-update.component.html'
})
export class CourseUpdateComponent implements OnInit {
    course: ICourse;
    isSaving: boolean;

    teachers: ITeacher[];

    students: IStudent[];
    predicate: any;
    reverse: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected courseService: CourseService,
        protected teacherService: TeacherService,
        protected studentService: StudentService,
        protected lessonService: LessonService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ course }) => {
            this.course = course;
        });
        this.teacherService.query().subscribe(
            (res: HttpResponse<ITeacher[]>) => {
                this.teachers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.studentService.query().subscribe(
            (res: HttpResponse<IStudent[]>) => {
                this.students = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.lessonService.query().subscribe(
            (res: HttpResponse<ILesson[]>) => {
                /*console.log('Response length' + res.body.length);
                res.body.forEach(item => {
                    console.log('Course-Update.Component: lesson.id=' + item.id);
                    console.log('Course-Update.Component: lesson.course.id=' + item.course.id);
                    console.log('Course-Update.Component: lesson.students.length=' + item.students.length);
                });*/

                return (this.course.lessons = res.body.filter(value => value.course.id === this.course.id));
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    reset() {
        this.course.lessons = [];
    }

    trackId(index: number, item: ILesson) {
        return item.id;
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.course.id !== undefined) {
            this.subscribeToSaveResponse(this.courseService.update(this.course));
        } else {
            this.subscribeToSaveResponse(this.courseService.create(this.course));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourse>>) {
        result.subscribe((res: HttpResponse<ICourse>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTeacherById(index: number, item: ITeacher) {
        return item.id;
    }

    trackStudentById(index: number, item: IStudent) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
