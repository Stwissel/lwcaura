import { LightningElement, api } from 'lwc';
import id from '@salesforce/user/Id';

export default class InfoBox extends LightningElement {
    userid = id;
    @api recordId;
    @api objectApiName;
    @api title = 'Native LWC';
}
