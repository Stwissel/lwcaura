({
    getRecType: function(component, event) {
        var isCancel = event.getParam('isCancel');
        if (!isCancel) {
            var message = 'Record Type:';
            message += event.getParam('recordType');
            message += '; color:';
            message += event.getParam('color');
            component.find('notifLib').showToast({
                variant: 'info',
                title: 'AURA: Nicely Done',
                message: message
            });
        } else {
            component.find('notifLib').showToast({
                variant: 'warning',
                title: 'AURA: Next time then',
                message: 'You closed without a selection'
            });
        }
        component.set('v.hideAura', true);
    },

    lwcselection: function(component, event) {
        var isCancel = event.getParam('isCancel');
        if (!isCancel) {
            var message = 'Record Type:';
            message += event.getParam('recordType');
            message += '; color:';
            message += event.getParam('color');
            component.find('notifLib').showToast({
                variant: 'info',
                title: 'LWC:Nicely Done',
                message: message
            });
        } else {
            component.find('notifLib').showToast({
                variant: 'warning',
                title: 'LWC: Next time then',
                message: 'You closed without a selection'
            });
        }
        component.set('v.hideLWC', true);
    },

    moonshot: function(component, event) {
        component.set('v.hideAura', false);
    },

    marsshot: function(component, event) {
        component.set('v.hideLWC', false);
    }
});
