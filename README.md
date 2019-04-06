# LWC - Aura experiments

All experiments require that you deploy the components to a Salesforce instance.
Use `sfdx force:source:deploy -p experiments/experiment[number]` to deploy the one you are interested in

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
-   Deploy with `sfdx force:source:deploy -p experiments/experiment1`

## Experiment 2

## Experiment 3

## Experiment 4

## Experiment 5

## Experiment 6

## Experiment 7

Creation of 2 lwc components. The `slotMachine` has an unnamed `<slot>` element that can be filled with multiple `colorEmitter` custom elements. `bubbleDemo` shows an example how it can be uses:

```xml
<template>
    <div style="background-color: #FFFFFF">
        <h1>Slotmachine</h1>
        <c-slot-machine>
            <c-color-emitter color="red"></c-color-emitter>
            <c-color-emitter color="yellow"></c-color-emitter>
            <c-color-emitter color="green"></c-color-emitter>
        </c-slot-machine>
    </div>
</template>
```

Add the `bubbleDemo` to a lightning app page. `colorEmitter` emits a custom event `colorSelected` that the `slotMachine` listens to.

## Experiment 8

Extending the ability of `record-edit-form` to use custom input fields. Forms can look this this:

```xml
<template>
    <lightning-card title="Form Sample">
        <div class="slds-p-horizontal_small">
            <c-extended-form object-api-name="Account">
                <lightning-layout-item size="6" padding="around-medium">
                    <lightning-input-field
                        field-name="Name"
                    ></lightning-input-field>
                </lightning-layout-item>
                <lightning-layout-item size="6" padding="around-medium"
                    ><lightning-input-field
                        field-name="AccountSource"
                    ></lightning-input-field
                ></lightning-layout-item>
                <lightning-layout-item size="6" padding="around-medium"
                    ><lightning-input-field
                        field-name="AccountNumber"
                    ></lightning-input-field
                ></lightning-layout-item>
                <lightning-layout-item size="6" padding="around-medium"
                    ><c-special-input
                        field-name="Phone"
                        data-field
                    ></c-special-input>
                </lightning-layout-item>
            </c-extended-form>
        </div>
    </lightning-card>
</template>
```
