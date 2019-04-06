import { LightningElement, api } from 'lwc';

export default class SpecialInput extends LightningElement {
    @api fieldName;
    @api value = '';

    handleChange = event => {
        event.stopPropagation();
        window.clearTimeout(this.timeout);
        let realData = {
            name: this.fieldName,
            /* All uppercase */
            value: event.target.value.toUpperCase()
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
}
