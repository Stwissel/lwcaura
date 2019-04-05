import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ColorEmitter extends LightningElement {
    @api color;

    colorClick() {
        /*
        const evt = new ShowToastEvent({
            title: 'Color Click',
            message: 'You clicked on ' + this.color,
            variant: 'info'
        });
        this.dispatchEvent(evt);
        */
        const custEvent = new CustomEvent('colorSelected', {
            detail: this.color
        });
        this.dispatchEvent(custEvent);
    }
}
