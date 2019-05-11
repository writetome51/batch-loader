import { BatchToPageTranslator } from '@writetome51/batch-to-page-translator';


/******************************
 Loads a batch (array) of data from a larger set that is too big to be loaded all at once.

 ******************************/

export declare class PageBatchGetter {

	private __dataSource;
	private __batchInfo;
	private __bch2pgTranslator;
	private __currentBatch;


	constructor(
		__dataSource: {
			getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
		},
		__batchInfo: {
			currentBatchNumber: number;
			itemsPerBatch: number;
			currentBatchNumberIsLast: boolean;
		},
		__bch2pgTranslator: BatchToPageTranslator
	);


	getBatchContainingPage(pageNumber: any): any[];


	forceGetBatchContainingPage(pageNumber: any): any[];
}
