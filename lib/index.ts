import { BatchToPageTranslator } from '@writetome51/batch-to-page-translator';
import { not } from '@writetome51/not';
import { setArray } from '@writetome51/set-array';


export class BatchLoader {


	constructor(

		private __dataSource: {

			// The number of items `getBatch()` returns must match `itemsPerBatch`.  If `isLastBatch`
			// is true, it must only return the remaining items in the dataset and ignore itemsPerBatch.

			getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];

			// `dataTotal`: number of items in entire dataset, not the batch.
			// This must stay accurate after actions that change the total, such as searches.

			dataTotal: number;
		},

		private __batchContainer: { data: any[] },

		private __batchInfo: {
			itemsPerBatch: number, currentBatchNumber: number,
			currentBatchNumberIsLast: boolean, pagesPerBatch: number
		},

		private __bch2pgTranslator: BatchToPageTranslator
	) {
	}


	loadBatchContainingPage(pageNumber): void {
		if (not(this.__bch2pgTranslator.currentBatchContainsPage(pageNumber))) {

			this.forceLoadBatchContainingPage(pageNumber);
		}
	}


	forceLoadBatchContainingPage(pageNumber): void {
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


	/////////////////////////

	private __getFirstPageInBatch(batchNumber): number {
		return (
			(this.__batchInfo.pagesPerBatch * batchNumber)
			- (this.__batchInfo.pagesPerBatch - 1)
		);
	}


}
