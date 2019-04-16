import { LightningElement, api, track } from 'lwc';
import { panelDeselected, panelSelected, registerPanel } from './selector';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const groupName = 'Demo';

export default class SelectablePanel extends LightningElement {
    @api cardTitle;
    @track isSelected = false;

    connectedCallback() {
        this.panelName = registerPanel(
            { name: groupName, max: 2, min: 1 },
            this.setSelected
        );
    }

    setSelected = (on, message) => {
        this.isSelected = on;
        let panel = this.template.querySelector('div');
        if (on) {
            panel.classList.add('selected');
        } else {
            panel.classList.remove('selected');
        }
        if (message) {
            const evt = new ShowToastEvent({
                message: message,
                variant: 'info'
            });
            this.dispatchEvent(evt);
        }
    };

    toggleSelect() {
        const on = !this.isSelected;
        this.setSelected(on);
        if (on) {
            panelSelected(groupName, this.panelName);
        } else {
            panelDeselected(groupName, this.panelName);
        }
    }
}
