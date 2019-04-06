import { LightningElement, api } from 'lwc';

export default class UxDebouncedInput extends LightningElement {
    @api label = 'Lookup';
    @api delay = 300;
    @api value;
    @api fieldName = null;

    constructor() {
        super();
        this.timeout = null;
    }

    /* Bubbles change event up after debouncing */
    handleChange(event) {
        event.stopPropagation();
        window.clearTimeout(this.timeout);
        let searchTerm = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.timeout = window.setTimeout(() => {
            this.fireChange(searchTerm);
        }, this.delay);
    }

    /* Sends changes back compatible to extended form when
       the fieldName as been set */
    fireChange(changedValue) {
        let eventName = this.fieldName ? 'valueChanged' : 'change';
        let payload = this.fieldName
            ? { name: this.fieldName, value: this.changedValue }
            : changedValue;
        let customChange = new CustomEvent(eventName, {
            detail: payload,
            bubbles: true,
            cancelable: true
        });
        this.dispatchEvent(customChange);
    }
}
