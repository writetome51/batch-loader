# BatchLoader

A TypeScript/Javascript class that loads a batch (array) of data from a larger set  
that is too big to be loaded all at once.  This batch can then be used by a  
paginator or any other kind of manipulation tool.


## Constructor
<details>
<summary>view constructor</summary>

```ts
constructor(
    // These objects are injected because most likely they'll have to be used
    // outside this class as well.

    dataSource: {
    
        getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
            // `getBatch()` is called whenever a new batch must be loaded.  The number of items it 
            // returns matches `itemsPerBatch`.  If `isLastBatch` is true, it only returns the 
            // remaining items in the dataset, and ignores itemsPerBatch.

        dataTotal: number;
            // Number of items in entire dataset, not the batch.
            // This must stay accurate after actions that change the total, such as searches.
    },

    batchContainer: { data: any[] },
        
    batchInfo: {
        // This provides `dataSource` with info on what batch to get, how many items, etc.
        
        itemsPerBatch: number;
        currentBatchNumber: number;
        currentBatchNumberIsLast: boolean;
        pagesPerBatch: number;
    },

    bch2pgTranslator: BatchToPageTranslator
        // Included as a dependency.
        // https://www.npmjs.com/package/@writetome51/batch-to-page-translator
) 
```
</details>


## Methods
<details>
<summary>view methods</summary>

```ts
loadBatch(batchNumber): void
    // Gets the batch and stores it in `batchContainer.data` (from the 
    // constructor).

loadBatchContainingPage(pageNumber): void
    // Useful if you intend to use the batch for pagination.
    // Gets the batch containing `pageNumber` and stores it in `batchContainer.data`
```


## Installation

`npm i  @writetome51/batch-loader`

## Loading
```ts
// if using TypeScript:
import { BatchLoader } from '@writetome51/batch-loader';
// if using ES5 JavaScript:
var BatchLoader = require('@writetome51/batch-loader').BatchLoader;
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
