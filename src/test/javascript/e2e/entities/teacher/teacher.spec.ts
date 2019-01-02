/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TeacherComponentsPage, TeacherDeleteDialog, TeacherUpdatePage } from './teacher.page-object';

const expect = chai.expect;

describe('Teacher e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let teacherUpdatePage: TeacherUpdatePage;
    let teacherComponentsPage: TeacherComponentsPage;
    let teacherDeleteDialog: TeacherDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Teachers', async () => {
        await navBarPage.goToEntity('teacher');
        teacherComponentsPage = new TeacherComponentsPage();
        expect(await teacherComponentsPage.getTitle()).to.eq('dancekvartalApp.teacher.home.title');
    });

    it('should load create Teacher page', async () => {
        await teacherComponentsPage.clickOnCreateButton();
        teacherUpdatePage = new TeacherUpdatePage();
        expect(await teacherUpdatePage.getPageTitle()).to.eq('dancekvartalApp.teacher.home.createOrEditLabel');
        await teacherUpdatePage.cancel();
    });

    it('should create and save Teachers', async () => {
        const nbButtonsBeforeCreate = await teacherComponentsPage.countDeleteButtons();

        await teacherComponentsPage.clickOnCreateButton();
        await promise.all([
            teacherUpdatePage.setFirstNameInput('firstName'),
            teacherUpdatePage.setLastNameInput('lastName'),
            teacherUpdatePage.setBirthdayInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            teacherUpdatePage.setPhoneInput('phone'),
            teacherUpdatePage.setEmailInput('email'),
            teacherUpdatePage.userSelectLastOption()
        ]);
        expect(await teacherUpdatePage.getFirstNameInput()).to.eq('firstName');
        expect(await teacherUpdatePage.getLastNameInput()).to.eq('lastName');
        expect(await teacherUpdatePage.getBirthdayInput()).to.contain('2001-01-01T02:30');
        expect(await teacherUpdatePage.getPhoneInput()).to.eq('phone');
        expect(await teacherUpdatePage.getEmailInput()).to.eq('email');
        await teacherUpdatePage.save();
        expect(await teacherUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await teacherComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Teacher', async () => {
        const nbButtonsBeforeDelete = await teacherComponentsPage.countDeleteButtons();
        await teacherComponentsPage.clickOnLastDeleteButton();

        teacherDeleteDialog = new TeacherDeleteDialog();
        expect(await teacherDeleteDialog.getDialogTitle()).to.eq('dancekvartalApp.teacher.delete.question');
        await teacherDeleteDialog.clickOnConfirmButton();

        expect(await teacherComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
