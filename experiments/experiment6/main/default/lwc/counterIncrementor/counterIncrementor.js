import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CounterIncrementor extends NavigationMixin(
    LightningElement
) {
    @track buttonValue = 42;
    @track localStore = 'n/a';

    handleClick() {
        this.buttonValue++;
        localStorage.setItem('fancyNumber', this.buttonValue);
        // And navigate
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__CounterDisplay'
            },
            state: {
                counter: this.buttonValue
            }
        });
    }

    renderedCallback() {
        // eslint-disable-next-line no-debugger
        debugger;
        let newNumber = localStorage.getItem('fancyNumber');
        // eslint-disable-next-line eqeqeq
        if (!(newNumber == this.localStore)) {
            this.localStorage = newNumber || 'n/a';
        }
    }
}
