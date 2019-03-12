({
    setCounter: function(component, count, helper) {
        helper.counter = helper.counter || 0;
        helper.counter += count;
        component.set('v.componentReady', helper.counter <= 0);
    }
});
