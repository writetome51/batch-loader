import { BaseClass } from '@writetome51/base-class';
export declare class BatchLoader extends BaseClass {
    private __dataSource;
    private __batchCalculator;
    private __batchContainer;
    constructor(__dataSource: {
        getData: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
        dataTotal: number;
    }, __batchCalculator: {
        itemsPerBatch: number;
        currentBatchNumber: number;
        currentBatchNumberIsLast: boolean;
        set_currentBatchNumber_basedOnPage: (pageNumber: number) => void;
    }, __batchContainer: {
        data: any[];
    });
    itemsPerBatch: number;
    loadBatchContainingPage(pageNumber: any): void;
    private __getBatchContainingPage;
    private __getBatch;
}
