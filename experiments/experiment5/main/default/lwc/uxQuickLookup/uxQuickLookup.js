import { LightningElement, api, track } from 'lwc';
import fetchLookUpValues from '@salesforce/apex/CustomLookUpController.fetchLookUpValues';

export default class UxQuickLookup extends LightningElement {
    @api objectApiName;
    @api iconName = 'standard:account';
    @api label = 'Lookup';

    @track resultClass;
    @track selectedRecord = null;
    @track results = null;

    constructor() {
        super();
        this.switchResult(false);
    }

    handleSearchTerm(event) {
        let searchValue = event.detail;
        if (searchValue) {
            fetchLookUpValues({
                searchKeyWord: searchValue,
                objectName: this.objectApiName
            })
                .then(result => this.setResult(result))
                .catch(error => this.handleError(error));
        } else {
            this.results = null;
        }
    }

    setResult(newValues) {
        this.results = JSON.stringify(newValues, null, 2);
    }

    onSearchFieldClick() {
        this.switchResult(true);
    }

    switchResult(on) {
        this.resultClass = on
            ? 'slds-form-element slds-lookup slds-is-open'
            : 'slds-form-element slds-lookup slds-is-close';
    }

    handlePillRemove() {
        this.selectedRecord = null;
        let payload = {
            detail: {
                canceled: true,
                recordId: null
            }
        };
        let selected = new CustomEvent('selection', payload);
        this.dispatchEvent(selected);
    }

    handleError(error) {
        let errorDispatch = new CustomEvent('failure', { detail: error });
        this.dispatchEvent(errorDispatch);
    }
}
