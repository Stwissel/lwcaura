import { LightningElement, track, wire } from 'lwc';
import idSpy from '@salesforce/apex/ObjectIdSpy.getObjectIdMappings';

export default class ObjectIdSpy extends LightningElement {
  @track idList;

  @wire(idSpy)
  spiedUpon({ error, data }) {
    if (data) {
      this.idList = JSON.stringify(data, null, 2);
    } else if (error) {
      this.idList = JSON.stringify(error, null, 2);
    }
  }
}
