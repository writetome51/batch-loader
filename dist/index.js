"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var set_array_1 = require("@writetome51/set-array");
var BatchLoader = /** @class */ (function () {
    function BatchLoader(__dataSource, __batchContainer, 
    // `__batchInfo` tells this.__dataSource what batch to fetch.
    __batchInfo, __bch2pgTranslator) {
        this.__dataSource = __dataSource;
        this.__batchContainer = __batchContainer;
        this.__batchInfo = __batchInfo;
        this.__bch2pgTranslator = __bch2pgTranslator;
    }
    BatchLoader.prototype.loadBatch = function (batchNumber) {
        var firstPageInBatch = ((this.__batchInfo.pagesPerBatch * batchNumber)
            - (this.__batchInfo.pagesPerBatch - 1));
        this.loadBatchContainingPage(firstPageInBatch);
    };
    BatchLoader.prototype.loadBatchContainingPage = function (pageNumber) {
        var batch = this.__getBatchContainingPage(pageNumber);
        set_array_1.setArray(this.__batchContainer.data, batch);
    };
    BatchLoader.prototype.__getBatchContainingPage = function (pageNumber) {
        this.__bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(pageNumber);
        return this.__dataSource.getBatch(this.__batchInfo.currentBatchNumber, this.__batchInfo.itemsPerBatch, this.__batchInfo.currentBatchNumberIsLast);
    };
    return BatchLoader;
}());
exports.BatchLoader = BatchLoader;
