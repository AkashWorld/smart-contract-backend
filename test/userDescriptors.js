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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * User descriptors contract reference
 */
var UserDescriptors = artifacts.require('UserDescriptors');
contract('UserDescriptors test', function (accounts) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        /**
         * The unit test is in the form of:
         * it("what is this unit-testing for", function() that is performing the test)
         * The functions are asynchronous because it needs to connect to the local blockchain
         * the function() is in the form of an arrow function: async function() {} is the same as async () => {}
         */
        it('should return 0 when unit value does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var contractInstance, returnedValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserDescriptors.new()];
                    case 1:
                        contractInstance = _a.sent();
                        return [4 /*yield*/, contractInstance.getLatestUnitValue('lb', {
                                from: accounts[0]
                            })];
                    case 2:
                        returnedValue = _a.sent();
                        assert.equal(returnedValue.toNumber(), 0, 'did not return 0 when units did not exist');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a value when inserted a value', function () { return __awaiter(void 0, void 0, void 0, function () {
            var contractInstance, expectedVal, returnedValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserDescriptors.new()];
                    case 1:
                        contractInstance = _a.sent();
                        expectedVal = 150;
                        return [4 /*yield*/, contractInstance.insertValue('lb', expectedVal, {
                                from: accounts[0]
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractInstance.getLatestUnitValue('lb', {
                                from: accounts[0]
                            })];
                    case 3:
                        returnedValue = _a.sent();
                        assert.equal(returnedValue.toNumber(), expectedVal, 'did not return the latest recorded value from unit lb');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return the correct pair of values per unit', function () { return __awaiter(void 0, void 0, void 0, function () {
            var contractInstance, expectedVal1, expectedVal2, expectedVal3, returnedVal1, returnedVal2, returnedVal3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserDescriptors.new()];
                    case 1:
                        contractInstance = _a.sent();
                        expectedVal1 = { unit: 'lb', val: 150 };
                        expectedVal2 = { unit: 'inch', val: 12 };
                        expectedVal3 = { unit: 'g', val: 30 };
                        return [4 /*yield*/, contractInstance.insertValue(expectedVal1.unit, expectedVal1.val, {
                                from: accounts[0]
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractInstance.insertValue(expectedVal2.unit, expectedVal2.val, {
                                from: accounts[0]
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, contractInstance.insertValue(expectedVal3.unit, expectedVal3.val, {
                                from: accounts[0]
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, contractInstance.getLatestUnitValue('lb', {
                                from: accounts[0]
                            })];
                    case 5:
                        returnedVal1 = _a.sent();
                        return [4 /*yield*/, contractInstance.getLatestUnitValue('inch', {
                                from: accounts[0]
                            })];
                    case 6:
                        returnedVal2 = _a.sent();
                        return [4 /*yield*/, contractInstance.getLatestUnitValue('g', {
                                from: accounts[0]
                            })];
                    case 7:
                        returnedVal3 = _a.sent();
                        assert.equal(returnedVal1.toNumber(), expectedVal1.val, 'returned value is not the same as the input value, 150');
                        assert.equal(returnedVal2.toNumber(), expectedVal2.val, 'returned value is not the same as the input value, 12');
                        assert.equal(returnedVal3.toNumber(), expectedVal3.val, 'returned value is not the same as the input value, 30');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return most recent values of multiple inserted values', function () { return __awaiter(void 0, void 0, void 0, function () {
            var contractInstance, expectedVal, key, returnedValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserDescriptors.new()];
                    case 1:
                        contractInstance = _a.sent();
                        expectedVal = 150;
                        key = 'lb';
                        return [4 /*yield*/, contractInstance.insertValue(key, 50, { from: accounts[0] })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractInstance.insertValue(key, 140, { from: accounts[0] })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, contractInstance.insertValue(key, 500, { from: accounts[0] })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, contractInstance.insertValue(key, 150, { from: accounts[0] })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, contractInstance.getLatestUnitValue(key, {
                                from: accounts[0]
                            })];
                    case 6:
                        returnedValue = _a.sent();
                        assert.equal(returnedValue.toNumber(), expectedVal, 'last inserted value is not returned value');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not return values that the account did not post', function () { return __awaiter(void 0, void 0, void 0, function () {
            var contractInstance, expectedVal, returnedValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserDescriptors.new()];
                    case 1:
                        contractInstance = _a.sent();
                        expectedVal = 0;
                        return [4 /*yield*/, contractInstance.insertValue('lb', 150, { from: accounts[0] })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractInstance.getLatestUnitValue('lb', {
                                from: accounts[1]
                            })];
                    case 3:
                        returnedValue = _a.sent();
                        assert.equal(returnedValue.toNumber(), expectedVal, 'incorrect return value, should be 0 as the inesrted value was from a different user address');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return an empty list if the unit does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var contractInstance, returnedArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserDescriptors.new()];
                    case 1:
                        contractInstance = _a.sent();
                        return [4 /*yield*/, contractInstance.getAllUnitValues('lb', {
                                from: accounts[0]
                            })];
                    case 2:
                        returnedArray = _a.sent();
                        assert.equal(returnedArray.length, 0, 'array length is not 0, expected empty');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a list full of values if values were inserted', function () { return __awaiter(void 0, void 0, void 0, function () {
            var contractInstance, expectedList, key, _i, expectedList_1, val, returnedArray, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserDescriptors.new()];
                    case 1:
                        contractInstance = _a.sent();
                        expectedList = [23, 435, 22, 150, 700, 20, 13];
                        key = 'lb';
                        _i = 0, expectedList_1 = expectedList;
                        _a.label = 2;
                    case 2:
                        if (!(_i < expectedList_1.length)) return [3 /*break*/, 5];
                        val = expectedList_1[_i];
                        return [4 /*yield*/, contractInstance.insertValue(key, val, {
                                from: accounts[0]
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, contractInstance.getAllUnitValues('lb', {
                            from: accounts[0]
                        })];
                    case 6:
                        returnedArray = _a.sent();
                        assert.equal(returnedArray.length, expectedList.length, 'array length does not match expected length');
                        for (i = 0; i < returnedArray.length; ++i) {
                            assert.equal(returnedArray[i].toNumber(), expectedList[i], "values in returned list and expected list don't match");
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return an empty list of units if units were not inserted', function () { return __awaiter(void 0, void 0, void 0, function () {
            var contractInstance, returnedArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserDescriptors.new()];
                    case 1:
                        contractInstance = _a.sent();
                        return [4 /*yield*/, contractInstance.getAllAvailableUnits()];
                    case 2:
                        returnedArray = _a.sent();
                        assert.equal(returnedArray.length, 0, 'did not return empty array');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a list of units if units were inserted', function () { return __awaiter(void 0, void 0, void 0, function () {
            var contractInstance, returnedArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserDescriptors.new()];
                    case 1:
                        contractInstance = _a.sent();
                        return [4 /*yield*/, contractInstance.insertValue('lb', 150, { from: accounts[0] })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractInstance.insertValue('cm', 150, { from: accounts[0] })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, contractInstance.insertValue('miles', 150, { from: accounts[0] })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, contractInstance.getAllAvailableUnits()];
                    case 5:
                        returnedArray = _a.sent();
                        assert.equal(returnedArray.length, 3, 'did not returned 3 unit array');
                        assert.equal(returnedArray[0], 'lb', 'incorrect unit');
                        assert.equal(returnedArray[1], 'cm', 'incorrect unit');
                        assert.equal(returnedArray[2], 'miles', 'incorrect unit');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return empty list if called from another account', function () { return __awaiter(void 0, void 0, void 0, function () {
            var contractInstance, returnedArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserDescriptors.new()];
                    case 1:
                        contractInstance = _a.sent();
                        return [4 /*yield*/, contractInstance.insertValue('lb', 150, { from: accounts[0] })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractInstance.insertValue('cm', 150, { from: accounts[0] })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, contractInstance.insertValue('miles', 150, { from: accounts[0] })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, contractInstance.getAllAvailableUnits({
                                from: accounts[1]
                            })];
                    case 5:
                        returnedArray = _a.sent();
                        assert.equal(returnedArray.length, 0, 'did not returned 3 unit array');
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
