import { BatchToPageTranslator } from '@writetome51/batch-to-page-translator';


/******************************
 This is intended to be used by a paginator.
 Loads a batch (array) of data from a larger set that is too big to be loaded all at once.
 It figures out what batch to load based on a requested page number.

 Usage Example:

 let getPageBatch = new GetPageBatch();
 let batch1 = getPageBatch.containingPage(1);
 batch1 = getPageBatch.byForce_containingPage(1); // force-reloads the batch.
 ******************************/

export declare class GetPageBatch {

	private __dataSource;
	private __batchInfo;
	private __bch2pgTranslator;
	private __currentBatch;


	constructor(
		__dataSource: {
			getBatch: (
				batchNumber: number, itemsPerBatch: number, isLastBatch: boolean
			) => Promise<any[]>;
		},
		__batchInfo: {
			currentBatchNumber: number;
			itemsPerBatch: number;
			currentBatchNumberIsLast: boolean;
		},
		__bch2pgTranslator: BatchToPageTranslator
	);


	containingPage(pageNumber: number): Promise<any[]>;


	byForce_containingPage(pageNumber: number): Promise<any[]>;

}
