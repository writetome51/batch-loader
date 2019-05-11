import { BatchToPageTranslator } from '@writetome51/batch-to-page-translator';
export declare class PageBatchGetter {
    private __dataSource;
    private __batchInfo;
    private __bch2pgTranslator;
    constructor(__dataSource: {
        getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
        dataTotal: number;
    }, __batchInfo: {
        itemsPerBatch: number;
        currentBatchNumber: number;
        currentBatchNumberIsLast: boolean;
        pagesPerBatch: number;
    }, __bch2pgTranslator: BatchToPageTranslator);
    getBatchContainingPage(pageNumber: any): void;
    forceGetBatchContainingPage(pageNumber: any): any[];
    private __getBatchContainingPage;
}
