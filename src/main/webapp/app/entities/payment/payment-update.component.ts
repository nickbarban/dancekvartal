import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IPayment } from 'app/shared/model/payment.model';
import { PaymentService } from './payment.service';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student';

@Component({
    selector: 'jhi-payment-update',
    templateUrl: './payment-update.component.html'
})
export class PaymentUpdateComponent implements OnInit {
    payment: IPayment;
    isSaving: boolean;

    students: IStudent[];
    date: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected paymentService: PaymentService,
        protected studentService: StudentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ payment }) => {
            this.payment = payment;
            this.date = this.payment.date != null ? this.payment.date.format(DATE_TIME_FORMAT) : null;
        });
        this.studentService.query().subscribe(
            (res: HttpResponse<IStudent[]>) => {
                this.students = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.payment.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.payment.id !== undefined) {
            this.subscribeToSaveResponse(this.paymentService.update(this.payment));
        } else {
            this.subscribeToSaveResponse(this.paymentService.create(this.payment));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPayment>>) {
        result.subscribe((res: HttpResponse<IPayment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStudentById(index: number, item: IStudent) {
        return item.id;
    }
}
