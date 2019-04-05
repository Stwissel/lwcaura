/* eslint-disable no-debugger */
/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

export default class SpecialInput extends LightningElement {
    @api extendedFieldName;
    @api value = '';

    handleChange = event => {
        event.stopPropagation();
        window.clearTimeout(this.timeout);
        let realData = {
            name: this.extendedFieldName,
            value: 'X:' + event.target.value
        };
        // Do we need this
        this.value = realData.value;
        this.fireChange(realData);
    };

    fireChange(changedValue) {
        let customChange = new CustomEvent('valueChanged', {
            detail: changedValue,
            bubbles: true,
            cancelable: true
        });
        this.dispatchEvent(customChange);
    }

    handleTango(event) {
        debugger;
        console.log(event);
    }
}
