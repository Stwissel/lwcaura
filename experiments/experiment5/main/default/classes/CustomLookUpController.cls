public with sharing class CustomLookUpController {
    @AuraEnabled
    public static List<sObject> fetchLookUpValues(String searchKeyWord, String objectName) {
        String fieldsToReturn = 'id, Name';
        return CustomLookUpController.fetchExtendedLookUpValues(searchKeyWord, objectName, fieldsToReturn);
    }

    @AuraEnabled
    public static List<sObject> fetchExtendedLookUpValues(String searchKeyWord, String objectNameCandidate,String fieldsToQueryCandidate) {
        String objectName = String.escapeSingleQuotes(objectNameCandidate);
        String fieldsToQuery = String.escapeSingleQuotes(fieldsToQueryCandidate);
        String searchKey = searchKeyWord + '%';
        
        List<sObject> returnList = new List <sObject>();
      
        // Create a Dynamic SOQL Query For Fetch Record List with LIMIT 5   
        String sQuery =  'select '+  fieldsToQuery +' from ' + objectName + ' where Name LIKE :searchKey order by createdDate DESC limit 5';
        
        try {
            List <sObject> lstOfRecords = Database.query(sQuery);
            for (sObject obj: lstOfRecords) {
                returnList.add(obj);
            }
        } catch (Exception e) {
            throw new AuraHandledException('That didn\'n work:'+sQuery+'\n'+e.getMessage());
        }
        return returnList;
    }
}
