import { LightningElement, api } from 'lwc';

export default class UxQuickLookupResult extends LightningElement {
    @api iconName;
    @api record;

    handleOnClick = () => {
        let Id = this.record.Id;
        let Name = this.record.Name;
        let payload = {
            detail: { Id: Id, Name: Name }
        };
        let selection = new CustomEvent('selection', payload);
        this.dispatchEvent(selection);
    };

    get fieldNameResults() {
        if (!this.record) {
            return null;
        }
        let foundSomething = false;
        let result = [];
        for (let fName in this.record) {
            if (
                fName !== 'Id' &&
                fName !== 'Name' &&
                this.record.hasOwnProperty(fName)
            ) {
                result.push({ name: fName, value: this.record[fName] });
                foundSomething = true;
            }
        }
        return foundSomething ? result : null;
    }
}
