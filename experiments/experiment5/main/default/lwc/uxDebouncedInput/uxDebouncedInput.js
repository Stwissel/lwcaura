import { LightningElement, api } from 'lwc';
import { clearTimeout } from 'timers';

export default class UxDebouncedInput extends LightningElement {
    @api label = 'Lookup';
    @api delay = 300;

    constructor() {
        super();
        this.timeout = null;
    }

    /* Bubbles change event up after debouncing */
    handleChange(event) {
        clearTimeout(this.timeout);
        let searchTerm = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.timeout = setTimeout(() => {
            this.fireChange(searchTerm);
        }, this.delay);
    }

    fireChange(changedValue) {
        let customChange = new CustomEvent('change', { detail: changedValue });
        this.dispatchEvent(customChange);
    }
}
