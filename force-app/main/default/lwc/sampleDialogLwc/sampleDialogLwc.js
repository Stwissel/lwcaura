/* eslint-disable no-console */
import { LightningElement, api, track } from 'lwc';
import getRecordTypes from '@salesforce/apex/SampleDialogController.getAvailableRecordTypeNamesForSObject';
import getColors from '@salesforce/apex/SampleDialogController.getColors';

export default class SampleDialogLwc extends LightningElement {
    @api heading;
    @api objectName;
    @track availabeRecordTypes;
    @track selectedRecordType;
    @track availableColorList;
    @track selectedColor;
    @track componentReady;

    constructor() {
        super();
        this.callsWaitingFor = 0;
        this.componentReady = false;
    }

    connectedCallback() {
        // Fetch available record types
        this.awaitCalls(2);
        getRecordTypes({
            objectName: this.objectName
        })
            .then(result => this.updateRecordTypes(result))
            .catch(error => console.log(JSON.stringify(error)));

        getColors()
            .then(result => this.updateColors(result))
            .catch(error => console.log(JSON.stringify(error)));
    }

    updateRecordTypes(result) {
        this.availabeRecordTypes = [];
        for (let i = 0; i < result.length; i++) {
            this.availabeRecordTypes.push({
                label: result[i],
                value: result[i]
            });
        }
        this.logCallCompleted();
    }

    updateColors(result) {
        this.availableColorList = [];
        for (let i = 0; i < result.length; i++) {
            this.availableColorList.push({
                label: result[i],
                value: result[i]
            });
        }
        this.logCallCompleted();
    }

    awaitCalls(callCount) {
        this.callsWaitingFor += callCount;
    }

    logCallCompleted() {
        this.callsWaitingFor--;
        if (this.callsWaitingFor < 1) {
            this.componentReady = true;
        }
    }

    handleRecordTypeChange(event) {
        this.selectedRecordType = event.target.value;
    }

    handleColorChange(event) {
        this.selectedColor = event.target.value;
    }

    // User wants to abort mission
    cancelNewMethod() {
        let payload = { isCancel: true };
        let evt = new CustomEvent('selectionmade', {
            detail: payload
        });
        this.dispatchEvent(evt);
    }

    // Ready to proceed to next step
    selectionMade() {
        let payload = {
            isCancel: false,
            recordType: this.selectedRecordType,
            color: this.selectedColor
        };
        let evt = new CustomEvent('selectionmade', {
            detail: payload
        });
        this.dispatchEvent(evt);
    }
}
