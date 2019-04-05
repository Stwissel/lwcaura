import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class ExtendedForm extends NavigationMixin(LightningElement) {
    @api recordTypeId;
    @api recordId;
    @api objectApiName;

    constructor() {
        super();
        // Holds our fields
        this.specialFieldMap = {};
        this.addEventListener('valueChanged', this.listenDataChange, false);
    }

    /* Capturing all changed values from our data control */
    listenDataChange = event => {
        let fieldInfo = event.detail;
        this.specialFieldMap[fieldInfo.name] = fieldInfo.value;
    };

    formLoadHandler(event) {
        let fields = event.detail.record.fields;
        const defaultValues = {};
        for (let f in fields) {
            if (fields.hasOwnProperty(f)) {
                let elem = fields[f];
                let val = elem.displayValue || elem.value;
                if (val) {
                    defaultValues[f] = val;
                }
            }
        }
        // Now the input fields
        let specialNodes = this.querySelectorAll('[data-field]');
        for (let i = 0; i < specialNodes.length; i++) {
            let specialNode = specialNodes[i];
            let fieldName = specialNode.fieldName;
            if (defaultValues[fieldName]) {
                specialNode.value = defaultValues[fieldName];
            }
        }
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
        const evt = new ShowToastEvent({
            title: 'Record created',
            message:
                this.objectApiName +
                ' created: ' +
                (record.fields.Name.displayValue || record.fields.Name.value),
            variant: 'success'
        });
        this.dispatchEvent(evt);
        // Now navigate
        let destination = {
            type: 'standard__recordPage',
            attributes: {
                recordId: record.id,
                objectApiName: this.objectApiName,
                actionName: 'view'
            }
        };
        this[NavigationMixin.Navigate](destination);
    }
}
