/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LessonComponentsPage, LessonDeleteDialog, LessonUpdatePage } from './lesson.page-object';

const expect = chai.expect;

describe('Lesson e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let lessonUpdatePage: LessonUpdatePage;
    let lessonComponentsPage: LessonComponentsPage;
    /*let lessonDeleteDialog: LessonDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Lessons', async () => {
        await navBarPage.goToEntity('lesson');
        lessonComponentsPage = new LessonComponentsPage();
        expect(await lessonComponentsPage.getTitle()).to.eq('dancekvartalApp.lesson.home.title');
    });

    it('should load create Lesson page', async () => {
        await lessonComponentsPage.clickOnCreateButton();
        lessonUpdatePage = new LessonUpdatePage();
        expect(await lessonUpdatePage.getPageTitle()).to.eq('dancekvartalApp.lesson.home.createOrEditLabel');
        await lessonUpdatePage.cancel();
    });

    /* it('should create and save Lessons', async () => {
        const nbButtonsBeforeCreate = await lessonComponentsPage.countDeleteButtons();

        await lessonComponentsPage.clickOnCreateButton();
        await promise.all([
            lessonUpdatePage.setNameInput('name'),
            lessonUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            // lessonUpdatePage.studentSelectLastOption(),
            lessonUpdatePage.courseSelectLastOption(),
        ]);
        expect(await lessonUpdatePage.getNameInput()).to.eq('name');
        expect(await lessonUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
        await lessonUpdatePage.save();
        expect(await lessonUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await lessonComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last Lesson', async () => {
        const nbButtonsBeforeDelete = await lessonComponentsPage.countDeleteButtons();
        await lessonComponentsPage.clickOnLastDeleteButton();

        lessonDeleteDialog = new LessonDeleteDialog();
        expect(await lessonDeleteDialog.getDialogTitle())
            .to.eq('dancekvartalApp.lesson.delete.question');
        await lessonDeleteDialog.clickOnConfirmButton();

        expect(await lessonComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
