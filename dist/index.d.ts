import { BatchToPageTranslator } from '@writetome51/batch-to-page-translator';


export declare class BatchLoader {

	private __dataSource;
	private __batchContainer;
	private __batchInfo;
	private __bch2pgTranslator;


	constructor(
		__dataSource: {
			getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
			dataTotal: number;
		},
		__batchContainer: {
			data: any[];
		},
		__batchInfo: {
			itemsPerBatch: number;
			currentBatchNumber: number;
			currentBatchNumberIsLast: boolean;
			pagesPerBatch: number;
		},
		__bch2pgTranslator: BatchToPageTranslator
	);


	loadBatch(batchNumber: number): void;


	loadBatchContainingPage(pageNumber: number): void;


	private __getBatchContainingPage;

}
