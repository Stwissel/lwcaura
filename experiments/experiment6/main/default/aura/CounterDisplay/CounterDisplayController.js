/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
({
    doInit: function(component, event, helper) {
        // eslint-disable-next-line no-debugger
        debugger;
        var newNumber = localStorage.getItem('fancyNumber');
        if (newNumber) {
            component.set('v.theNumber', newNumber);
        }
        localStorage.removeItem('fancyNumber');
    }
});
