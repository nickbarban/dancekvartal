import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DancekvartalStudentModule } from './student/student.module';
import { DancekvartalTeacherModule } from './teacher/teacher.module';
import { DancekvartalPaymentModule } from './payment/payment.module';
import { DancekvartalLessonModule } from './lesson/lesson.module';
import { DancekvartalCourseModule } from './course/course.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        DancekvartalStudentModule,
        DancekvartalTeacherModule,
        DancekvartalPaymentModule,
        DancekvartalLessonModule,
        DancekvartalCourseModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DancekvartalEntityModule {}
