import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RequiredFieldsTest extends LightningElement {
    @track visibility = {};

    constructor() {
        super();
        this._title = 'record-edit-form test';
    }
    handleSubmit() {
        this.showNotification('Submitting form', 'info');
    }

    handleSuccess() {
        this.showNotification('A record has been created', 'success');
    }

    handleError(event) {
        // eslint-disable-next-line no-debugger
        debugger;
        let details = event.detail;
        let errorMsg =
            JSON.stringify(details.detail, null, 2) || 'Unknown error';
        this.showNotification(errorMsg, details.message);
    }

    toggleNumber() {
        this.visibility.number = !this.visibility.number;
    }

    showNotification(message, variant) {
        const evt = new ShowToastEvent({
            title: this._title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(evt);
    }
}
