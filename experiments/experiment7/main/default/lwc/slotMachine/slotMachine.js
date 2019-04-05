/* eslint-disable no-debugger */
import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SlotMachine extends LightningElement {
    @track currentColor = 'n/a';
    @track slotCount;

    constructor() {
        super();
        this.slotUpdated = false;
    }

    /* Must be named handleEvent, for binding to this */
    handleEvent(event) {
        let nowColor = event.detail;
        this.currentColor = nowColor;
        const evt = new ShowToastEvent({
            title: 'Color Event',
            message: 'Color event ' + nowColor,
            variant: 'success'
        });
        this.dispatchEvent(evt);
    }

    renderedCallback() {
        // Can we get the elements
        if (!this.slotUpdated) {
            this.slotUpdated = true;
            const slot = this.template.querySelector('slot');
            if (slot) {
                let assignedNodes = slot.assignedNodes(true);
                assignedNodes.forEach(n => {
                    n.addEventListener('colorSelected', this, true);
                });
                this.slotCount = assignedNodes.length;
            } else {
                this.slotCount = 'n/a';
            }
        }
    }
}
