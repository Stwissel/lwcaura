import { LightningElement, api } from 'lwc';

export default class ExtendedForm extends LightningElement {
    @api recordTypeId;
    @api recordId;
    @api objectApiName;

    constructor() {
        super();
        // Holds our fields
        this.specialFieldMap = {};
    }
}
