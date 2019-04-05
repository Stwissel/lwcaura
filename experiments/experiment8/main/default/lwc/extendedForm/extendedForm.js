/* eslint-disable no-debugger */
import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ExtendedForm extends LightningElement {
    @api recordTypeId;
    @api recordId;
    @api objectApiName;

    constructor() {
        super();
        // Holds our fields
        this.specialFieldMap = {};
    }

    connectedCallback() {
        const slot = this.template.querySelector('slot');
        if (slot) {
            slot.addEventListener('valueChanged', this.listenDataChange, true);
        }
    }

    /* Capturing all changed values from our data control */
    listenDataChange = event => {
        debugger;
        let fieldInfo = event.detail;
        this.specialFieldMap[fieldInfo.name] = fieldInfo.value;
    };

    formLoadHandler() {
        debugger;
        let tangoEvent = new CustomEvent('tango', {
            details: { color: 'red', mood: 'good' }
        });
        this.dispatchEvent(tangoEvent);
    }

    formSubmitHandler = event => {
        event.preventDefault();
        const fields = event.detail.fields;
        for (let key in this.specialFieldMap) {
            if (this.specialFieldMap.hasOwnProperty(key)) {
                fields[key] = this.specialFieldMap[key];
            }
        }

        this.template
            .querySelector('lightning-record-edit-form')
            .submit(fields);
    };

    formSuccessHandler(event) {
        const record = event.detail;
        debugger;
        const evt = new ShowToastEvent({
            title: 'Record created',
            message:
                this.objectApiName +
                ' created: ' +
                (record.fields.Name.displayValue || record.fields.Name.value),
            variant: 'success'
        });
        this.dispatchEvent(evt);
    }
}
