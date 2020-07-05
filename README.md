# PageLoadAccess

A TypeScript/Javascript class intended to be used by a paginator. Its methods  
return a load (array) of data from a larger set that is too big to be loaded  
all at once. Each load can contain multiple pages of data.


## Constructor
<details>
<summary>view constructor</summary>

```ts
constructor(
    __dataSource: {

        // The number of items `getLoad()` returns must match `itemsPerLoad`.
        // If `isLastLoad` is true, it must only return the remaining items 
        // in the dataset and ignore itemsPerLoad.

        getLoad: (
            loadNumber: number, itemsPerLoad: number, isLastLoad: boolean
        ) => Promise<any[]>
    },

    __loadInfo: {
        getCurrentLoadNumber: () => number,
        setCurrentLoadNumber: (num: number) => void,
        getItemsPerLoad: () => number,
        currentLoadIsLast: () => boolean
    },

    __load2pgTranslator: LoadToPageTranslator
)
```
</details>


## Methods
<details>
<summary>view methods</summary>

```ts
async getLoadContainingPage(pageNumber): Promise<any[]>

async getRefreshedLoadContainingPage(pageNumber): Promise<any[]> 
    // Even if the current load already contains requested 
    // `pageNumber`, that load is re-retrieved from the data source.
```
</details>  


## Installation

`npm i  @writetome51/page-load-access`

## Loading
```ts
// if using TypeScript:
import { PageLoadAccess } from '@writetome51/page-load-access';
// if using ES5 JavaScript:
var PageLoadAccess = require('@writetome51/page-load-access').PageLoadAccess;
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
