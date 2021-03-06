import { element, by, ElementFinder } from 'protractor';

export class PaymentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-payment div table .btn-danger'));
    title = element.all(by.css('jhi-payment div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PaymentUpdatePage {
    pageTitle = element(by.id('jhi-payment-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    sumInput = element(by.id('field_sum'));
    studentSelect = element(by.id('field_student'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async setSumInput(sum) {
        await this.sumInput.sendKeys(sum);
    }

    async getSumInput() {
        return this.sumInput.getAttribute('value');
    }

    async studentSelectLastOption() {
        await this.studentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async studentSelectOption(option) {
        await this.studentSelect.sendKeys(option);
    }

    getStudentSelect(): ElementFinder {
        return this.studentSelect;
    }

    async getStudentSelectedOption() {
        return this.studentSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class PaymentDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-payment-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-payment'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
