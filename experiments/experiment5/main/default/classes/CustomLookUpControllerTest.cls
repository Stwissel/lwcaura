@IsTest
public without sharing class CustomLookUpControllerTest {
    @isTest
    public static void testFetchLookUpValues() {
        String searchKeyWord = 'XXXXXXXXXXXXX';
        String objectName = 'Account';
        List<SObject> result = CustomLookUpController.fetchLookUpValues(searchKeyWord, objectName);

        System.assert(result != null, 'fetchLookupValues returns a valid list');
        System.assert(result.isEmpty(), 'fetchLookupValues has no entry:'+searchKeyWord+' in object '+ objectName);
    }
}
