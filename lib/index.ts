import { BatchToPageTranslator } from '@writetome51/batch-to-page-translator';
import { not } from '@writetome51/not';


/******************************
 This is intended to be used by a paginator.
 Its methods load a batch (array) of data from a larger set that is too big to be loaded all at
 once. Each batch contains multiple pages of data. The methods figure out what batch to load based
 on a requested page number.

 Usage Example:

 let getPageBatch = new GetPageBatch(...args);
 let batch1 = getPageBatch.containingPage(1);
 batch1 = getPageBatch.byForce_containingPage(1); // force-reloads the batch.
 ******************************/


export class GetPageBatch {


	private __currentBatch: any[];


	constructor(
		private __dataSource: {

			// The number of items `getBatch()` returns must match `itemsPerBatch`.  If `isLastBatch`
			// is true, it must only return the remaining items in the dataset and ignore itemsPerBatch.

			getBatch: (
				batchNumber: number, itemsPerBatch: number, isLastBatch: boolean
			) => Promise<any[]>;
		},

		private __batchInfo: {
			currentBatchNumber: number, itemsPerBatch: number, currentBatchNumberIsLast: boolean
		},

		// Must contain same instance of this.__batchInfo

		private __bch2pgTranslator: BatchToPageTranslator
	) {
	}


	async containingPage(pageNumber): Promise<any[]> {
		if (not(this.__bch2pgTranslator.currentBatchContainsPage(pageNumber))) {

			return await this.byForce_containingPage(pageNumber);
		}
		else return this.__currentBatch;
	}


	// Does not check if batch containing `pageNumber` is already loaded.

	async byForce_containingPage(pageNumber): Promise<any[]> {
		this.__bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(pageNumber);

		this.__currentBatch = await this.__dataSource.getBatch(
			this.__batchInfo.currentBatchNumber,
			this.__batchInfo.itemsPerBatch,
			this.__batchInfo.currentBatchNumberIsLast
		);
		return this.__currentBatch;
	}


}
