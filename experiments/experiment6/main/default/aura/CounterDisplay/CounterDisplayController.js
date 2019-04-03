/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
({
    doInit: function(component, event, helper) {
        helper.checkForFancyNumber(
            component,
            'v.theNumber',
            'v.secondNumber',
            'fancyNumber'
        );
    },

    handlePageChange: function(component, event, helper) {
        helper.checkForFancyNumber(
            component,
            'v.theNumber',
            'v.secondNumber',
            'fancyNumber'
        );
    }
});
