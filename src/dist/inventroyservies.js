"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.__esModule = true;
exports.Inventoryservice = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var invertoryschema_1 = require("./invertoryschema");
var ExcelJS = require("exceljs");
var fs = require('fs');
var path = require('path');
var os = require('os');
var xlsx = require('xlsx');
var Inventoryservice = /** @class */ (function () {
    function Inventoryservice(inventoryModel) {
        this.inventoryModel = inventoryModel;
    }
    Inventoryservice.prototype.createInventory = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var myy, data1, inventory, savedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(data);
                        myy = data.DeviceSerial_Number;
                        console.log(myy, "oo");
                        return [4 /*yield*/, this.inventoryModel.find({ DeviceSerial_Number: myy })];
                    case 1:
                        data1 = _a.sent();
                        console.log(data1, "data");
                        if (!(data1.length === 0)) return [3 /*break*/, 3];
                        inventory = new this.inventoryModel(data);
                        return [4 /*yield*/, inventory.save()];
                    case 2:
                        savedData = _a.sent();
                        console.log("save");
                        return [2 /*return*/, savedData];
                    case 3:
                        console.log("err");
                        throw new Error("DeviceSerial_Number already exists");
                }
            });
        });
    };
    Inventoryservice.prototype.getDataById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, formattedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inventoryModel.findById(id).exec()];
                    case 1:
                        data = _a.sent();
                        formattedData = [
                            ['id', 'invoice', 'DeviceSerial_Number', 'sim_number', 'DeviceIMEI_Number', 'BLEMac_Addr', 'GPS_Antenna', 'LTE_Antenna', 'Enclosure_Type', 'Sim_Type', 'Testing_Comments', 'Place', 'imgurl'],
                            [data.id, data.invoice, data.DeviceSerial_Number, data.sim_number, data.DeviceIMEI_Number, data.BLEMac_Addr, data.GPS_Antenna, data.LTE_Antenna, data.Enclosure_Type, data.Sim_Type, data.Testing_Comments, data.Place, data.imgurl],
                        ];
                        return [2 /*return*/, this.saveExcelFile(formattedData)];
                }
            });
        });
    };
    Inventoryservice.prototype.saveExcelFile = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var workbook, worksheet, i, i, imgUrl, extension, imageId, buffer, desktopPath, fileName, filePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workbook = new ExcelJS.Workbook();
                        worksheet = workbook.addWorksheet('Inventory Data');
                        // Add data to worksheet
                        for (i = 0; i < data.length; i++) {
                            worksheet.addRow(data[i]);
                        }
                        worksheet.autoFilter = {
                            from: 'A1',
                            to: "Z" + worksheet.lastRow.number
                        };
                        worksheet.eachRow(function (row, rowNumber) {
                            row.eachCell(function (cell, colNumber) {
                                cell.alignment = { vertical: 'middle', horizontal: 'center' };
                                cell.border = {
                                    top: { style: 'thin' },
                                    left: { style: 'thin' },
                                    bottom: { style: 'thin' },
                                    right: { style: 'thin' }
                                };
                            });
                        });
                        // Add images to the workbook
                        //const extension = path.extname(imgUrl).toLowerCase().substr(1);
                        for (i = 1; i < data.length; i++) {
                            imgUrl = data[i][data[i].length - 1];
                            console.log(imgUrl, "fff");
                            extension = path.extname(imgUrl).toLowerCase().substr(1);
                            imageId = workbook.addImage({
                                filename: "/home/smartaxiom/Documents/Invertoryproject/src/uploads/" + imgUrl,
                                extension: extension
                            });
                            console.log(imageId, "aaaaa");
                            worksheet.addImage(imageId, {
                                tl: { col: 0, row: 0 },
                                ext: { width: 500, height: 200 },
                                editAs: data.imgUrl
                            });
                        }
                        return [4 /*yield*/, workbook.xlsx.writeBuffer()];
                    case 1:
                        buffer = _a.sent();
                        desktopPath = path.join(os.homedir(), 'Desktop');
                        fileName = "inventory_" + Date.now() + ".xlsx";
                        filePath = path.join(desktopPath, fileName);
                        fs.writeFileSync(filePath, buffer);
                        console.log("Excel file saved: " + filePath);
                        return [2 /*return*/, filePath]; //this.convertExcelToJson(filePath)
                }
            });
        });
    };
    Inventoryservice.prototype.convertExcelToJson = function (filePath) {
        console.log(filePath, "dd");
        var workbook = xlsx.readFile(filePath);
        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var jsonData = xlsx.utils.sheet_to_json(worksheet);
        console.log(jsonData, "json");
        return jsonData;
    };
    /*async  saveExcelFile(data)
    {
      console.log(data, "ddddd");
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Inventory Data');
      console.log(worksheet, "worksheet");
    
      // Add headers
      const headers = Object.keys(data);
      worksheet.addRow(headers);
    
      // Add data
      const values = Object.values(data);
      worksheet.addRow(values);
    
      worksheet.autoFilter = {
        from: 'A1',
        to: `Z${worksheet.lastRow.number}`
      };
    
      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });
      });
    
      const buffer = await workbook.xlsx.writeBuffer();
      const desktopPath = path.join(os.homedir(), 'Desktop');
      const fileName = `inventory_${Date.now()}.xlsx`;
      const filePath = path.join(desktopPath, fileName);
      console.log(filePath, "filepath");
    
      fs.writeFileSync(filePath, buffer);
      console.log(`Excel file saved: ${filePath}`);
    return data
    }*/
    Inventoryservice.prototype.getallData = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = '/home/smartaxiom/Desktop/inventory_1688562251545.xlsx';
                        console.log(filePath);
                        return [4 /*yield*/, this.convertExcelToJson(filePath)];
                    case 1:
                        data = _a.sent();
                        console.log(data, "kkk");
                        return [2 /*return*/];
                }
            });
        });
    };
    Inventoryservice = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(invertoryschema_1.Inventory.name))
    ], Inventoryservice);
    return Inventoryservice;
}());
exports.Inventoryservice = Inventoryservice;
