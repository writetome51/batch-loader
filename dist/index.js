"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var not_1 = require("@writetome51/not");
var PageBatchGetter = /** @class */ (function () {
    function PageBatchGetter(__dataSource, __batchInfo, __bch2pgTranslator) {
        this.__dataSource = __dataSource;
        this.__batchInfo = __batchInfo;
        this.__bch2pgTranslator = __bch2pgTranslator;
    }
    PageBatchGetter.prototype.getBatchContainingPage = function (pageNumber) {
        if (not_1.not(this.__bch2pgTranslator.currentBatchContainsPage(pageNumber))) {
            return this.forceGetBatchContainingPage(pageNumber);
        }
        else
            return this.__currentBatch;
    };
    PageBatchGetter.prototype.forceGetBatchContainingPage = function (pageNumber) {
        this.__bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(pageNumber);
        this.__currentBatch = this.__dataSource.getBatch(this.__batchInfo.currentBatchNumber, this.__batchInfo.itemsPerBatch, this.__batchInfo.currentBatchNumberIsLast);
        return this.__currentBatch;
    };
    return PageBatchGetter;
}());
exports.PageBatchGetter = PageBatchGetter;
