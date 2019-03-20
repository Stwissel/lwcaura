public without sharing class ObjectIdSpy {  
    @AuraEnabled(cacheable=true)
    public static Map<String,String> getObjectIdMappings(){
        Map<String,String> result = new Map<String,String>();
        Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
        for(String key : gd.keySet()) {
            Schema.SObjectType ot = gd.get(key);
            String curPrefix = ot.getDescribe().getKeyPrefix();
            String curName = ot.getDescribe().getName();
            // Fair warning: will omit objects that share the prefix
            result.put(curPrefix, curName);
        }
      return result;
    } 
}
