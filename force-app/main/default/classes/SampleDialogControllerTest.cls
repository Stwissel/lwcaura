@isTest
public with sharing class SampleDialogControllerTest {
    
    @isTest
    static void testRecordTypeForOpportunity() {
        List<String> result = SampleDialogController.getAvailableRecordTypeNamesForSObject('Opportunity');
        System.assert(!result.isEmpty(), 'Opportunity record types must not be empty');
    }

    @isTest
    static void testColorSelection() {
        List<String> result = SampleDialogController.getColors();
        System.assert(!result.isEmpty(), 'Must return a color');
        System.assert(result[0]=='Red','First color needs to be Red');
    }
}
