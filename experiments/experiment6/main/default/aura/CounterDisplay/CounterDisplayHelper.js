/* eslint-disable vars-on-top */
/* eslint-disable no-unused-expressions */
({
    checkForFancyNumber: function(component, attrName, attrName2, storageName) {
        // eslint-disable-next-line no-debugger
        debugger;
        var newNumber = localStorage.getItem(storageName);
        if (newNumber) {
            component.set(attrName, newNumber);
        }
        localStorage.removeItem(storageName);
        var myPageRef = component.get('v.pageReference');
        var secondAttr =
            myPageRef && myPageRef.state ? myPageRef.state.counter : 'n/a';
        component.set(attrName2, secondAttr);
    }
});
