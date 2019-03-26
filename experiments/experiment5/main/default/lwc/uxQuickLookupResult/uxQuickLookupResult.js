import { LightningElement, api } from 'lwc';

export default class UxQuickLookupResult extends LightningElement {
    @api iconName;
    @api record;

    handleOnClick(event) {
        let Id = event.target.getAttribute('data-id');
        let Name = event.target.innerText;
        let payload = { detail: { Id: Id, Name: Name } };
        let selection = new CustomEvent('selection', payload);
        this.dispatchEvent(selection);
    }
}
