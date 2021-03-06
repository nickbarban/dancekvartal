import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourse } from 'app/shared/model/course.model';
import { ILesson } from 'app/shared/model/lesson.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LessonService } from 'app/entities/lesson';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-course-detail',
    templateUrl: './course-detail.component.html'
})
export class CourseDetailComponent implements OnInit {
    course: ICourse;
    predicate: any;
    reverse: any;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected lessonService: LessonService,
        protected jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ course }) => {
            this.course = course;
        });
        this.lessonService.query().subscribe(
            (res: HttpResponse<ILesson[]>) => {
                this.course.lessons = res.body.filter(value => value.course.id === this.course.id);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
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
}
