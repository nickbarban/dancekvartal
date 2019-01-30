import { element, by, ElementFinder } from 'protractor';

export class CourseComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-course div table .btn-danger'));
    title = element.all(by.css('jhi-course div h2#page-heading span')).first();

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

export class CourseUpdatePage {
    pageTitle = element(by.id('jhi-course-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    teacherSelect = element(by.id('field_teacher'));
    studentSelect = element(by.id('field_student'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async teacherSelectLastOption() {
        await this.teacherSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async teacherSelectOption(option) {
        await this.teacherSelect.sendKeys(option);
    }

    getTeacherSelect(): ElementFinder {
        return this.teacherSelect;
    }

    async getTeacherSelectedOption() {
        return this.teacherSelect.element(by.css('option:checked')).getText();
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

export class CourseDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-course-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-course'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
