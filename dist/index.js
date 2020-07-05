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
/******************************
 This is intended to be used by a paginator.
 Its methods return a load (array) of data from a larger set that is too big to be
 loaded all at once.  Each load can contain multiple pages of data.
 ******************************/
class PageLoadAccess {
    constructor(__dataSource, __loadInfo, __load2pgTranslator) {
        this.__dataSource = __dataSource;
        this.__loadInfo = __loadInfo;
        this.__load2pgTranslator = __load2pgTranslator;
    }
    getLoadContainingPage(pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.__load2pgTranslator.loadContainsPage(pageNumber, this.__loadInfo.getCurrentLoadNumber())) {
                return this.__currentLoad;
            }
            else
                return yield this.getRefreshedLoadContainingPage(pageNumber);
        });
    }
    getRefreshedLoadContainingPage(pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            this.__loadInfo.setCurrentLoadNumber(this.__load2pgTranslator.getLoadNumberContainingPage(pageNumber));
            this.__currentLoad = yield this.__dataSource.getLoad(this.__loadInfo.getCurrentLoadNumber(), this.__loadInfo.getItemsPerLoad(), this.__loadInfo.currentLoadIsLast());
            return this.__currentLoad;
        });
    }
}
exports.PageLoadAccess = PageLoadAccess;
