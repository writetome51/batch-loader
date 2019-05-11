"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var not_1 = require("@writetome51/not");
var set_array_1 = require("@writetome51/set-array");
var BatchLoader = /** @class */ (function () {
    function BatchLoader(__dataSource, __batchContainer, __batchInfo, __bch2pgTranslator) {
        this.__dataSource = __dataSource;
        this.__batchContainer = __batchContainer;
        this.__batchInfo = __batchInfo;
        this.__bch2pgTranslator = __bch2pgTranslator;
    }
    BatchLoader.prototype.loadBatchContainingPage = function (pageNumber) {
        if (not_1.not(this.__bch2pgTranslator.currentBatchContainsPage(pageNumber))) {
            this.forceLoadBatchContainingPage(pageNumber);
        }
    };
    BatchLoader.prototype.forceLoadBatchContainingPage = function (pageNumber) {
        var batch = this.__getBatchContainingPage(pageNumber);
        set_array_1.setArray(this.__batchContainer.data, batch);
    };
    BatchLoader.prototype.__getBatchContainingPage = function (pageNumber) {
        this.__bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(pageNumber);
        return this.__dataSource.getBatch(this.__batchInfo.currentBatchNumber, this.__batchInfo.itemsPerBatch, this.__batchInfo.currentBatchNumberIsLast);
    };
    /////////////////////////
    BatchLoader.prototype.__getFirstPageInBatch = function (batchNumber) {
        return ((this.__batchInfo.pagesPerBatch * batchNumber)
            - (this.__batchInfo.pagesPerBatch - 1));
    };
    return BatchLoader;
}());
exports.BatchLoader = BatchLoader;
