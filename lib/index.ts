import { BatchToPageTranslator } from '@writetome51/batch-to-page-translator';
import { not } from '@writetome51/not';


export class PageBatchGetter {


	private __currentBatch: any[];


	constructor(
		private __dataSource: {

			// The number of items `getBatch()` returns must match `itemsPerBatch`.  If `isLastBatch`
			// is true, it must only return the remaining items in the dataset and ignore itemsPerBatch.

			getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
		},
		private __batchInfo: {
			itemsPerBatch: number, currentBatchNumber: number,
			currentBatchNumberIsLast: boolean
		},
		private __bch2pgTranslator: BatchToPageTranslator
	) {
	}


	getBatchContainingPage(pageNumber): any[] {
		if (not(this.__bch2pgTranslator.currentBatchContainsPage(pageNumber))) {

			return this.forceGetBatchContainingPage(pageNumber);
		}
		else return this.__currentBatch;
	}


	forceGetBatchContainingPage(pageNumber): any[] {
		this.__bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(pageNumber);

		this.__currentBatch = this.__dataSource.getBatch(
			this.__batchInfo.currentBatchNumber,
			this.__batchInfo.itemsPerBatch,
			this.__batchInfo.currentBatchNumberIsLast
		);
		return this.__currentBatch;
	}


}
