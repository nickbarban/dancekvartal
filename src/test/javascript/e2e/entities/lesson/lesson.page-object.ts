import { element, by, ElementFinder } from 'protractor';

export class LessonComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-lesson div table .btn-danger'));
    title = element.all(by.css('jhi-lesson div h2#page-heading span')).first();

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

export class LessonUpdatePage {
    pageTitle = element(by.id('jhi-lesson-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    dateInput = element(by.id('field_date'));
    studentSelect = element(by.id('field_student'));
    courseSelect = element(by.id('field_course'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
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

    async courseSelectLastOption() {
        await this.courseSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async courseSelectOption(option) {
        await this.courseSelect.sendKeys(option);
    }

    getCourseSelect(): ElementFinder {
        return this.courseSelect;
    }

    async getCourseSelectedOption() {
        return this.courseSelect.element(by.css('option:checked')).getText();
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

export class LessonDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-lesson-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-lesson'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
