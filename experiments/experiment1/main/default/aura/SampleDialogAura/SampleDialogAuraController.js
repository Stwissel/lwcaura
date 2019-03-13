({
    doInit: function(component, event, helper) {
        helper.setCounter(component, 2, helper);
        var fetchRecordTypes = component.get(
            'c.getAvailableRecordTypeNamesForSObject'
        );
        fetchRecordTypes.setParams({
            objectName: component.get('v.objectName')
        });
        fetchRecordTypes.setCallback(this, function(resp) {
            var state = resp.getState();
            if (state === 'SUCCESS') {
                var respVal = resp.getReturnValue();
                var recordTypeSelect = [];
                for (var i = 0; i < respVal.length; i++) {
                    recordTypeSelect.push({
                        label: respVal[i],
                        value: respVal[i]
                    });
                }
                component.set('v.availabeRecordTypes', recordTypeSelect);
                helper.setCounter(component, -1, helper);
            }
        });

        $A.enqueueAction(fetchRecordTypes);

        var fetchColors = component.get('c.getColors');
        fetchColors.setCallback(this, function(resp) {
            var state = resp.getState();
            if (state === 'SUCCESS') {
                var respVal = resp.getReturnValue();
                var colorSelect = [];
                for (var i = 0; i < respVal.length; i++) {
                    colorSelect.push({
                        label: respVal[i],
                        value: respVal[i]
                    });
                }
                component.set('v.availableColorList', colorSelect);
                helper.setCounter(component, -1, helper);
            }
        });

        $A.enqueueAction(fetchColors);
    },

    selectionMade: function(component, event, helper) {
        var selRecord = component.get('v.selectedRecordType');
        var selColor = component.get('v.selectedColor');
        var getevent = component.getEvent('RecordTypeSelected');
        getevent.setParams({
            recordType: selRecord,
            color: selColor,
            isCancel: false
        });
        getevent.fire();
    },

    cancelNewMethod: function(component, event, helper) {
        var getevent = component.getEvent('RecordTypeSelected');
        getevent.setParams({
            isCancel: true
        });
        getevent.fire();
    }
});
