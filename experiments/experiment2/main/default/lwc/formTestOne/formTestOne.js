import { LightningElement, api } from 'lwc';
import COLOR1_FIELD from '@salesforce/schema/LWC_Edit__c.Text_Color__c';
import COLOR2_FIELD from '@salesforce/schema/LWC_Edit__c.Pick_Color__c';
import NAME_FIELD from '@salesforce/schema/LWC_Edit__c.Name';
import SUMMARY_FIELD from '@salesforce/schema/LWC_Edit__c.Summary__c';

export default class FormTestOne extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api color;

    initialLoadDone = false;

    color1Field = COLOR1_FIELD;
    color2Field = COLOR2_FIELD;
    nameField = NAME_FIELD;
    summaryField = SUMMARY_FIELD;

    handleLoad(event) {
        /* eslint-disable no-console */
        console.log('data loaded');
        console.log(event.detail.objectInfos);
        if (!this.initialLoadDone) {
            this.updateFieldValue('Text_Color__c', 'Pink we all love Pink!');
        }
    }

    updateFieldValue(fieldName, fieldValue) {
        let querySelector = 'lightning-input-field';
        let allElements = this.template.querySelectorAll(querySelector);
        /* eslint-disable no-debugger */
        // debugger;
        if (allElements) {
            allElements.forEach(ele => {
                if (ele.fieldName === fieldName) {
                    ele.value = fieldValue;
                }
            });
        } else {
            /* eslint-disable no-console */
            console.log("Can't get to " + fieldName);
        }
        this.initialLoadDone = true;
    }

    handleRecordCreated(event) {
        /* eslint-disable no-console */
        console.log('record created');
        console.log(event.detail);
    }

    connectedCallback() {
        /* eslint-disable no-console */
        console.log('connected callback');
    }
}
