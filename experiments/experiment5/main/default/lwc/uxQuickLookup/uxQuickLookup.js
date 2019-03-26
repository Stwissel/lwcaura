import { LightningElement, api, track } from 'lwc';
import fetchLookUpValues from '@salesforce/apex/CustomLookUpController.fetchLookUpValues';
import fetchExtendedLookUpValues from '@salesforce/apex/CustomLookUpController.fetchExtendedLookUpValues';

export default class UxQuickLookup extends LightningElement {
    @api objectApiName;
    @api iconName = 'standard:account';
    @api label = 'Lookup';
    @api fields = null;

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
            let searchParams = {
                searchKeyWord: searchValue,
                objectName: this.objectApiName
            };
            if (this.fields) {
                this.addFieldsToParam(searchParams);
                fetchExtendedLookUpValues(searchParams)
                    .then(result => this.setResult(result))
                    .catch(error => this.handleError(error));
            } else {
                fetchLookUpValues(searchParams)
                    .then(result => this.setResult(result))
                    .catch(error => this.handleError(error));
            }
        } else {
            this.switchResult(false);
            this.message = null;
            this.showSpinner = false;
            this.results = null;
        }
        this.lastSearchValue = searchValue;
    }

    /* Ensure we always have Name and Id in the query */
    addFieldsToParam(searchParam) {
        let allFields = this.fields.split(',');
        allFields.push('Id');
        allFields.push('Name');
        let cleanFields = this.dedupeArray(allFields).join(',');
        searchParam.fieldsToQuery = cleanFields;
    }

    dedupeArray(incoming) {
        var uniqEs6 = arrArg => {
            return arrArg.filter((elem, pos, arr) => {
                return arr.indexOf(elem) === pos;
            });
        };
        return uniqEs6(incoming);
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
