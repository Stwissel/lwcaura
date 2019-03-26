import { LightningElement, api, track } from 'lwc';
import fetchLookUpValues from '@salesforce/apex/CustomLookUpController.fetchLookUpValues';

export default class UxQuickLookup extends LightningElement {
    @api objectApiName;
    @api iconName = 'standard:account';
    @api label = 'Lookup';

    @track resultClass;
    @track selectedRecord = null;
    @track results = null;
    @track message = null;
    @track showSpinner = false;
    @track lastSearchValue;

    constructor() {
        super();
        this.switchResult(false);
    }

    handleSearchTerm(event) {
        let searchValue = event.detail;
        if (searchValue) {
            this.switchResult(true);
            this.message = 'searching...';
            this.showSpinner = true;
            fetchLookUpValues({
                searchKeyWord: searchValue,
                objectName: this.objectApiName
            })
                .then(result => this.setResult(result))
                .catch(error => this.handleError(error));
        } else {
            this.switchResult(false);
            this.message = null;
            this.showSpinner = false;
            this.results = null;
        }
        this.lastSearchValue = searchValue;
    }

    setResult(newValues) {
        this.showSpinner = false;
        if (newValues && newValues.length > 0) {
            this.message = null;
            this.results = newValues;
        } else {
            this.message = 'no results found';
        }
    }

    /* Shows and hides the result area */
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
        // Restore last results
        this.switchResult(this.lastSearchValue && this.results);
    }

    handleError(error) {
        this.showSpinner = false;
        this.message = "Sorry didn't work!";
        let errorDispatch = new CustomEvent('failure', { detail: error });
        this.dispatchEvent(errorDispatch);
    }

    handleRecordSelect(event) {
        let record = event.detail;
        this.selectedRecord = record;
        let selectionDispatch = new CustomEvent('recordselected', {
            detail: record
        });
        this.dispatchEvent(selectionDispatch);
        this.switchResult(false);
    }
}
