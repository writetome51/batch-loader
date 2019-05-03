import { BaseClass } from '@writetome51/base-class';
import { setArray } from '@writetome51/set-array';


export class BatchLoader extends BaseClass {


	constructor(

		private __dataSource: {

			// `getBatch()` is called whenever a new batch is loaded.  The number of items it returns
			// matches `itemsPerBatch`.  If `isLastBatch` is true, it only returns the remaining items
			// in the dataset, and ignores itemsPerBatch.

			getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];

			// `dataTotal`: number of items in entire dataset, not the batch.
			// This must stay accurate after actions that change the total, such as searches.

			dataTotal: number;
		},

		// `__batchCalculator` tells this.__dataSource what batch to fetch.

		private __batchCalculator: {
			itemsPerPage: number; // set_currentBatchNumber_basedOnPage() needs this to work correctly.
			itemsPerBatch: number;
			readonly currentBatchNumber: number;
			readonly currentBatchNumberIsLast: boolean;
			set_currentBatchNumber_basedOnPage: (pageNumber: number) => void;
		},

		// `__batchContainer` is injected so it can also be manipulated outside of this class.

		private __batchContainer: { data: any[] }
	) {
		super();
	}


	set itemsPerBatch(value) {
		this.__batchCalculator.itemsPerBatch = value;  // __batchCalculator validates value.
	}


	get itemsPerBatch(): number {
		return this.__batchCalculator.itemsPerBatch;
	}


	loadBatchContainingPage(pageNumber): void {
		let batch = this.__getBatchContainingPage(pageNumber);
		setArray(this.__batchContainer.data, batch);
	}


	private __getBatchContainingPage(pageNumber): any[] {
		this.__batchCalculator.set_currentBatchNumber_basedOnPage(pageNumber);

		return this.__dataSource.getBatch(

			this.__batchCalculator.currentBatchNumber,
			this.itemsPerBatch,
			this.__batchCalculator.currentBatchNumberIsLast
		);
	}


}
