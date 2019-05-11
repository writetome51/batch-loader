"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var not_1 = require("@writetome51/not");
/******************************
 This is intended to be used by a paginator.
 Loads a batch (array) of data from a larger set that is too big to be loaded all at once.
 It figures out what batch to load based on a requested page number.

 The class is named unusually because it will read better when calling its methods.
 Example:

 let getPageBatch = new GetPageBatch();
 let batch1 = getPageBatch.containingPage(1);
 batch1 = getPageBatch.byForce_containingPage(1);
 ******************************/
var GetPageBatch = /** @class */ (function () {
    function GetPageBatch(__dataSource, __batchInfo, __bch2pgTranslator) {
        this.__dataSource = __dataSource;
        this.__batchInfo = __batchInfo;
        this.__bch2pgTranslator = __bch2pgTranslator;
    }
    GetPageBatch.prototype.containingPage = function (pageNumber) {
        if (not_1.not(this.__bch2pgTranslator.currentBatchContainsPage(pageNumber))) {
            return this.byForce_containingPage(pageNumber);
        }
        else
            return this.__currentBatch;
    };
    GetPageBatch.prototype.byForce_containingPage = function (pageNumber) {
        this.__bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(pageNumber);
        this.__currentBatch = this.__dataSource.getBatch(this.__batchInfo.currentBatchNumber, this.__batchInfo.itemsPerBatch, this.__batchInfo.currentBatchNumberIsLast);
        return this.__currentBatch;
    };
    return GetPageBatch;
}());
exports.GetPageBatch = GetPageBatch;
