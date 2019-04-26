/**
 * Static utility class to work around some query limitations
 */
public with sharing class SobjectUtility {
    
    /* Get list of all fields for a given object */
    public static String getAllFieldsForObject(Id objectId) {
        Schema.SObjectType sobjectType = objectId.getSObjectType();
        Schema.DescribeSObjectResult objDescribe = sobjectType.getDescribe();  
        return SobjectUtility.fieldsForObject(objDescribe);
    }

    /* Get a query for a single object with all fields and a parameter objectId
     * for the object to be queried   
    */
    public static String getFullQueryForID(Id objectId) {
        String result = 'SELECT ';
        Schema.SObjectType sobjectType = objectId.getSObjectType();
        Schema.DescribeSObjectResult objDescribe = sobjectType.getDescribe(); 
        String objName = objDescribe.getName();
        String fields = SobjectUtility.fieldsForObject(objDescribe);
        result += fields + ' FROM ' + objName + ' WHERE id = :objectId';
        return result;
    }

    /* Common utility methods */
    
    // Retrieve a list of all fields for a given object base on DescribeSObjectResult
    private static String fieldsForObject(Schema.DescribeSObjectResult objDescribe) {
        List<String> fieldNames = '';
        Map<String, Schema.Schema.DescribeFieldResult> fieldMap = objDescribe.fields.getMap();
        return fieldMap.keySet().join(',');
    }


}
