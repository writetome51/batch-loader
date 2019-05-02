# BatchLoader

A TypeScript/Javascript class that loads a batch (array) of data from a larger set  
and hands it to a pagination tool.


## Constructor
<details>
<summary>view constructor</summary>

```ts
constructor(

    dataSource: {

        getData: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
            // `getData()` is called whenever a new batch is loaded.  The number of items it returns
            // matches `itemsPerBatch`.  If `isLastBatch` is true, it only returns the remaining items
            // in the dataset, and ignores itemsPerBatch.

        dataTotal: number;
            // Number of items in entire dataset, not the batch.
            // This must stay accurate after actions that change the total, such as searches.
    },

    batchCalculator: {
        itemsPerBatch: number;
        currentBatchNumber: number;
	currentBatchNumberIsLast: boolean;
	set_currentBatchNumber_basedOnPage: (pageNumber: number) => void;
    },
        // Tells `dataSource` what batch to fetch.

    batchContainer: { data: any[] }
        // `batchContainer` is injected so it can be accessed by a paginator outside of this class.
) 
```
</details>


## Properties
<details>
<summary>view properties</summary>

```ts
itemsPerBatch: integer
    // The number of items `dataSource.getData()` will return.
```
</details>


## Methods
<details>
<summary>view methods</summary>

```ts
loadBatchContainingPage(pageNumber): void
```
The methods below are not important to know about in order to use this  
class.  They're inherited from [BaseClass](https://github.com/writetome51/typescript-base-class#baseclass) .
```ts
protected   _createGetterAndOrSetterForEach(
                  propertyNames: string[],
                  configuration: IGetterSetterConfiguration
            ) : void
     /*********************
     Use this method when you have a bunch of properties that need getter and/or 
     setter functions that all do the same thing. You pass in an array of string 
     names of those properties, and the method attaches the same getter and/or 
     setter function to each property.
     IGetterSetterConfiguration is this object:
     {
         get_setterFunction?: (
             propertyName: string, index?: number, propertyNames?: string[]
         ) => Function,
             // get_setterFunction takes the property name as first argument and 
             // returns the setter function.  The setter function must take one 
             // parameter and return void.
     
         get_getterFunction?: (
             propertyName: string, index?: number, propertyNames?: string[]
         ) => Function
             // get_getterFunction takes the property name as first argument and 
             // returns the getter function.  The getter function must return something.
     }
     *********************/ 
   
   
protected   _returnThis_after(voidExpression: any) : this
    // voidExpression is executed, then function returns this.
    // Even if voidExpression returns something, the returned data isn't used.

protected   _runMethod_and_returnThis(
    callingObject, 
    method: Function, 
    methodArgs: any[], 
    additionalAction?: Function // takes the result returned by method as an argument.
) : this
```
</details>


## Inheritance Chain

BatchLoader<--[BaseClass](https://github.com/writetome51/typescript-base-class#baseclass)


## Installation

`npm install @writetome51/batch-loader`

## Loading
```ts
// if using TypeScript:
import { BatchLoader } from '@writetome51/batch-loader';
// if using ES5 JavaScript:
var BatchLoader = require('@writetome51/batch-loader').BatchLoader;
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
