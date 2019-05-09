import { BatchToPageTranslator } from '@writetome51/batch-to-page-translator';
import { setArray } from '@writetome51/set-array';


export class BatchLoader {


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

		private __batchContainer: { data: any[] },

		// `__batchInfo` tells this.__dataSource what batch to fetch.

		private __batchInfo: {
			itemsPerBatch: number, currentBatchNumber: number,
			currentBatchNumberIsLast: boolean, pagesPerBatch: number
		},

		private __bch2pgTranslator: BatchToPageTranslator
	) {
	}


	loadBatch(batchNumber): void {
		let firstPageInBatch = (
			(this.__batchInfo.pagesPerBatch * batchNumber)
			- (this.__batchInfo.pagesPerBatch - 1)
		);
		this.loadBatchContainingPage(firstPageInBatch);
	}


	loadBatchContainingPage(pageNumber): void {
		let batch = this.__getBatchContainingPage(pageNumber);
		setArray(this.__batchContainer.data, batch);
	}


	private __getBatchContainingPage(pageNumber): any[] {
		this.__bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(pageNumber);

		return this.__dataSource.getBatch(
			this.__batchInfo.currentBatchNumber,
			this.__batchInfo.itemsPerBatch,
			this.__batchInfo.currentBatchNumberIsLast
		);
	}


}
