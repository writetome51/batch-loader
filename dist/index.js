"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const not_1 = require("@writetome51/not");
/******************************
 This is intended to be used by a paginator.
 Its methods load a batch (array) of data from a larger set that is too big to be loaded all at
 once. Each batch contains multiple pages of data. The methods figure out what batch to load based
 on a requested page number.

 Usage Example:

 let getPageBatch = new GetPageBatch(...args);
 let batch1 = getPageBatch.containingPage(1);
 batch1 = getPageBatch.byForce_containingPage(1); // force-reloads the batch.
 ******************************/
class GetPageBatch {
    constructor(__dataSource, __batchInfo, 
    // Must contain same instance of this.__batchInfo
    __bch2pgTranslator) {
        this.__dataSource = __dataSource;
        this.__batchInfo = __batchInfo;
        this.__bch2pgTranslator = __bch2pgTranslator;
    }
    containingPage(pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            if (not_1.not(this.__bch2pgTranslator.currentBatchContainsPage(pageNumber))) {
                return yield this.byForce_containingPage(pageNumber);
            }
            else
                return this.__currentBatch;
        });
    }
    // Does not check if batch containing `pageNumber` is already loaded.
    byForce_containingPage(pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            this.__bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(pageNumber);
            this.__currentBatch = yield this.__dataSource.getBatch(this.__batchInfo.currentBatchNumber, this.__batchInfo.itemsPerBatch, this.__batchInfo.currentBatchNumberIsLast);
            return this.__currentBatch;
        });
    }
}
exports.GetPageBatch = GetPageBatch;
