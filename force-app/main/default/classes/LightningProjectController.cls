public with sharing class LightningProjectController {
    @AuraEnabled(cacheable=true)
    public static String beatPlanRecordsId() {
        return [SELECT Id from Beat_Plan__c limit 1];
    } 
}
