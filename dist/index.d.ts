import { BaseClass } from '@writetome51/base-class';
import { BatchCalculator } from '@writetome51/batch-calculator';


export declare class BatchLoader extends BaseClass {

	itemsPerBatch: number;

	private __dataSource;
	private __batchContainer;
	private __batchCalculator;


	constructor(
		__dataSource: {
			getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
			dataTotal: number;
		},
		__batchContainer: {
			data: any[];
		},
		__batchCalculator: BatchCalculator
	);


	loadBatch(batchNumber: number): void;


	loadBatchContainingPage(pageNumber: number): void;


	private __getBatchContainingPage;
}
