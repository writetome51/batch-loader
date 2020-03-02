# GetPageBatch

A TypeScript/Javascript class intended to be used by a paginator. Its methods load  
a batch (array) of data from a larger set that is too big to be loaded all at once. Each  
batch contains multiple pages of data. The methods figure out what batch to load  
based on a requested page number.

This example illustrates why this class was named like a verb and not a noun:
```ts
 let getPageBatch = new GetPageBatch(...args);
 let batch1 = await getPageBatch.containingPage(1);
 batch1 = await getPageBatch.byForce_containingPage(1); // force-reloads the batch.
```


## Constructor
<details>
<summary>view constructor</summary>

```ts
constructor(
    dataSource: {

        getBatch: (
            batchNumber: number, itemsPerBatch: number, isLastBatch: boolean
        ) => Promise<any[]>;
            // The number of items `getBatch()` returns must match `itemsPerBatch`.
            // If `isLastBatch` is true, it must only return the remaining items 
            // in the dataset and ignore itemsPerBatch.
    },

    batchInfo: {
        currentBatchNumber: number, itemsPerBatch: number, 
        currentBatchNumberIsLast: boolean
    },

    bch2pgTranslator: BatchToPageTranslator
        // Automatically installed with this package.
        // https://www.npmjs.com/package/@writetome51/batch-to-page-translator
) 
```
</details>


## Methods
<details>
<summary>view methods</summary>

```ts
async containingPage(pageNumber): Promise<any[]>
    // loads and returns batch containing `pageNumber`.
    // If the currently loaded batch already contains that page, it skips the 
    // loading and simply returns the batch.

async byForce_containingPage(pageNumber): Promise<any[]> 
    // loads and returns batch containing `pageNumber` even if it is already 
    // loaded.
```
</details>  


## Installation

`npm i  @writetome51/get-page-batch`

## Loading
```ts
// if using TypeScript:
import { GetPageBatch } from '@writetome51/get-page-batch';
// if using ES5 JavaScript:
var GetPageBatch = require('@writetome51/get-page-batch').GetPageBatch;
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
