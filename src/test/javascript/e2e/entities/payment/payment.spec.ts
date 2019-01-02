/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PaymentComponentsPage, PaymentDeleteDialog, PaymentUpdatePage } from './payment.page-object';

const expect = chai.expect;

describe('Payment e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let paymentUpdatePage: PaymentUpdatePage;
    let paymentComponentsPage: PaymentComponentsPage;
    let paymentDeleteDialog: PaymentDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Payments', async () => {
        await navBarPage.goToEntity('payment');
        paymentComponentsPage = new PaymentComponentsPage();
        expect(await paymentComponentsPage.getTitle()).to.eq('dancekvartalApp.payment.home.title');
    });

    it('should load create Payment page', async () => {
        await paymentComponentsPage.clickOnCreateButton();
        paymentUpdatePage = new PaymentUpdatePage();
        expect(await paymentUpdatePage.getPageTitle()).to.eq('dancekvartalApp.payment.home.createOrEditLabel');
        await paymentUpdatePage.cancel();
    });

    it('should create and save Payments', async () => {
        const nbButtonsBeforeCreate = await paymentComponentsPage.countDeleteButtons();

        await paymentComponentsPage.clickOnCreateButton();
        await promise.all([
            paymentUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            paymentUpdatePage.setSumInput('5'),
            paymentUpdatePage.studentSelectLastOption()
        ]);
        expect(await paymentUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
        expect(await paymentUpdatePage.getSumInput()).to.eq('5');
        await paymentUpdatePage.save();
        expect(await paymentUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await paymentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Payment', async () => {
        const nbButtonsBeforeDelete = await paymentComponentsPage.countDeleteButtons();
        await paymentComponentsPage.clickOnLastDeleteButton();

        paymentDeleteDialog = new PaymentDeleteDialog();
        expect(await paymentDeleteDialog.getDialogTitle()).to.eq('dancekvartalApp.payment.delete.question');
        await paymentDeleteDialog.clickOnConfirmButton();

        expect(await paymentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
