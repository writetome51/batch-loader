"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_class_1 = require("@writetome51/base-class");
var set_array_1 = require("@writetome51/set-array");
var BatchLoader = /** @class */ (function (_super) {
    __extends(BatchLoader, _super);
    function BatchLoader(__dataSource, 
    // `__batchCalculator` tells this.__dataSource what batch to fetch.
    __batchCalculator, 
    // `__batchContainer` is injected so it can also be manipulated outside of this class.
    __batchContainer) {
        var _this = _super.call(this) || this;
        _this.__dataSource = __dataSource;
        _this.__batchCalculator = __batchCalculator;
        _this.__batchContainer = __batchContainer;
        return _this;
    }
    Object.defineProperty(BatchLoader.prototype, "itemsPerBatch", {
        get: function () {
            return this.__batchCalculator.itemsPerBatch;
        },
        set: function (value) {
            this.__batchCalculator.itemsPerBatch = value; // __batchCalculator validates value.
        },
        enumerable: true,
        configurable: true
    });
    BatchLoader.prototype.loadBatchContainingPage = function (pageNumber) {
        var batch = this.__getBatchContainingPage(pageNumber);
        set_array_1.setArray(this.__batchContainer.data, batch);
    };
    BatchLoader.prototype.__getBatchContainingPage = function (pageNumber) {
        this.__batchCalculator.set_currentBatchNumber_basedOnPage(pageNumber);
        return this.__dataSource.getBatch(this.__batchCalculator.currentBatchNumber, this.itemsPerBatch, this.__batchCalculator.currentBatchNumberIsLast);
    };
    return BatchLoader;
}(base_class_1.BaseClass));
exports.BatchLoader = BatchLoader;
