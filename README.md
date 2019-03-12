# LWC - Aura experiments

## Experiment 1

Compare the modal dialog between Aura and LWC. 2 buttons launch idendical components one Aura, one LWC.
The components use the same backend APEX class. Fetches the record type for a given object and a random
number of colors.

Syntax for AURA component:

```xml
<aura:handler name="RecordTypeSelected" event="c:RecordTypeSelected" action="{!c.getRecType}"/>
<c:SampleDialogAura objectName="Opportunity"  heading="Aura: Pick an Opportunity and Color" />
```

Syntax for LWC component:

```xml
<c:sampleDialogLwc objectName="Opportunity" heading="LWC: Pick an Opportunity and Color" onselectionmade="{!c.lwcselection}" />
```

### Components

-   SampleDialogController.cls
-   SampleDialogControllerTest.cls
-   aura/RecordTypeSelected
-   aura/SampleDialogAura
-   aura/DemoLWCAuraContainer
-   lwc/sampleDialogLwc

### Setup

-   Opportunity object needs to have a record type (or change the call to fetch another object)
-   Create a lightning page and add `DemoLWCAuraContainer` to it - or add that to any lightning page
