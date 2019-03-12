@SuppressWarnings('PMD.AvoidGlobalModifier')
global with sharing class SampleDialogController {

    static List<String> availableColors = new List<String> {
        'Red',
        'Green',
        'Yellow',
        'Blue',
        'Black',
        'White'
    };
    
    @AuraEnabled(cacheable=true)
    public static List<String> getAvailableRecordTypeNamesForSObject(String objectName) {
        List<String> recordTypeNames = new List<String>();
        Schema.SObjectType sObjectTypeObj = Schema.getGlobalDescribe().get(objectName);
        List<RecordTypeInfo> infos = sObjectTypeObj.getDescribe().getRecordTypeInfos();    
        if (infos.size() > 0) {
            for (RecordTypeInfo i : infos) {
                System.debug('recordType: '+i);
                if (i.isAvailable() && !i.isMaster()) {
                    recordTypeNames.add(i.getName());
                }    
            }
        }
        System.debug('recordTypeNames: '+recordTypeNames);
        return recordTypeNames; 
    }

    @AuraEnabled
    public static List<String> getColors(){
       Integer listSize = availableColors.size()-1;
       Integer randomNumber = Integer.valueOf(Math.random()*listSize);
       List<String> result = new List<String>();
       for (Integer i = 0; i <= randomNumber; i++) {
           result.add(availableColors[i]);
       }
       return result;
    }
}
