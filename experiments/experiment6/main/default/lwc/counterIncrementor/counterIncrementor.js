import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CounterIncrementor extends NavigationMixin(
    LightningElement
) {
    @track buttonValue = localStorage.getItem('fancyNumberPrivate') || 42;
    @track localStore = 'n/a';

    handleClick() {
        this.buttonValue++;
        localStorage.setItem('fancyNumber', this.buttonValue);
        localStorage.setItem('fancyNumberPrivate', this.buttonValue);
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

    goPage() {
        this.buttonValue++;
        localStorage.setItem('fancyNumber', this.buttonValue);
        // And navigate
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'TangoPage'
            }
        });
    }

    handleRefresh() {
        // eslint-disable-next-line no-debugger
        debugger;
        let newNumber = localStorage.getItem('fancyNumber');
        this.localStorage = newNumber || 'n/a';
    }
}
