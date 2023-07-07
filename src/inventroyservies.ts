import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { invertorysEntity } from "./Entity/inventory";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory, InventoryDocument } from './invertoryschema';
import * as ExcelJS from 'exceljs';
const fs = require('fs');
const path = require('path');
const os = require('os');
import axios from "axios";
const xlsx = require('xlsx');
@Injectable()
export class Inventoryservice {
  constructor(@InjectModel(Inventory.name) private inventoryModel: Model<InventoryDocument>) {}

  async createInventory(data: any)
  
  {
    console.log(data)
    const myy=data.DeviceSerial_Number
    console.log(myy,"oo")
    const data1 = await this.inventoryModel.find({ DeviceSerial_Number: myy });
    console.log(data1,"data")
    if(data1.length===0)
    {
   const inventory = new this.inventoryModel(data);
    const savedData = await inventory.save();
  console.log("save")
    return savedData 
    }
    else
    {
console.log("err")
throw new Error("DeviceSerial_Number already exists");
    }
  }

  async getDataById(id: string) {
    const data = await this.inventoryModel.findById(id).exec();
    const formattedData = [
      ['id', 'invoice', 'DeviceSerial_Number','sim_number','DeviceIMEI_Number','BLEMac_Addr','GPS_Antenna','LTE_Antenna','Enclosure_Type','Sim_Type','Testing_Comments','Place','imgurl'], // Header row
      [data.id, data.invoice, data.DeviceSerial_Number,data.sim_number,data.DeviceIMEI_Number,data.BLEMac_Addr,data.GPS_Antenna,data.LTE_Antenna,data.Enclosure_Type,data.Sim_Type,data.Testing_Comments,data.Place,data.imgurl], // Data row
    ];
    return this.saveExcelFile(formattedData);
  }

  async saveExcelFile(data:any) {
    const workbook = new ExcelJS.Workbook();
     const worksheet = workbook.addWorksheet('Inventory Data');
     console.log(workbook,"workbook")
     console.log(worksheet,"ssss")
   // Add data to worksheet
    for (let i = 0; i < data.length; i++) {
      worksheet.addRow(data[i]);
    }
  
    worksheet.autoFilter = {
      from: 'A1',
      to: `Z${worksheet.lastRow.number}`
    };
  

    const columnWidths = [10, 15, 20, 15, 20, 15, 15, 15, 15, 15, 20, 15, 50]; 
    worksheet.columns.forEach((column, index) => {
      column.width = columnWidths[index];
    });

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0000FF' } // Change the color as desired
    };

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
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
    for (let i = 1; i < data.length; i++) {
      const imgUrl = data[i][data[i].length-1];
      console.log(imgUrl,"fff")
      const extension = path.extname(imgUrl).toLowerCase().substr(1);
      const imageId = workbook.addImage({
        filename: `/home/smartaxiom/Documents/Invertoryproject/src/uploads/${imgUrl}`,
        extension: extension
      });
    /*  const imagePath = `/home/smartaxiom/Documents/Invertoryproject/src/uploads/${imgUrl}`
      //const myBase64Image = '/home/smartaxiom/Documents/Invertoryproject/src/uploads/${imgUrl}';
      console.log(imagePath,"iii")
      const imageBuffer = fs.readFileSync(imagePath);
      const imageBase64 = imageBuffer.toString('base64');
     console.log(imageBuffer)
      const imageId = workbook.addImage({
        base64: imageBase64,
        extension: extension,
      });*/
      const imgUrlColumnIndex = data[0].indexOf('imgurl') + 1;

      worksheet.addImage(imageId, {
        tl: { col: imgUrlColumnIndex-1, row: i + 1}, // Add the image to the same row as the data
        ext: { width: 470, height: 100 },
        editAs: 'oneCell'
      });
  }
  
    const buffer = await workbook.xlsx.writeBuffer();
    const desktopPath = path.join(os.homedir(), 'Desktop');
    const fileName = `inventory_${Date.now()}.xlsx`;
    const filePath = path.join(desktopPath, fileName);
  console.log(fileName,"kkkkkkk")
   fs.writeFileSync(filePath, buffer);
    console.log(`Excel file saved: ${filePath}`);
  
    return filePath//this.convertExcelToJson(filePath)

  }

  convertExcelToJson(filePath)
   {
    console.log(filePath,"dd")
    const workbook = xlsx.readFile(filePath);
    
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    console.log(jsonData,"json")
    return jsonData;
  }
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


async getallData(id)
{
  const filePath = '/home/smartaxiom/Desktop/inventory_1688562251545.xlsx';
console.log(filePath)
  const data=await this.convertExcelToJson(filePath)
console.log(data,"kkk")
return 

}
async getAllData(id) {
  const data = await this.inventoryModel.find().exec();
  console.log(data);

  const formattedData = [
    ['id', 'invoice', 'DeviceSerial_Number','sim_number','DeviceIMEI_Number','BLEMac_Addr','GPS_Antenna','LTE_Antenna','Enclosure_Type','Sim_Type','Testing_Comments','Place','imgurl'], // Header row
  ];

  for (const item of data) {
    formattedData.push([
      item.id, item.invoice, item.DeviceSerial_Number, item.sim_number, item.DeviceIMEI_Number, item.BLEMac_Addr, item.GPS_Antenna, item.LTE_Antenna, item.Enclosure_Type, item.Sim_Type, item.Testing_Comments, item.Place, item.imgurl
    ]);
  }

  return this.saveExcelFile1(formattedData);
}

async saveExcelFile1(data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Inventory Data');

  for (const row of data) {
    worksheet.addRow(row);
  }

  worksheet.autoFilter = {
    from: 'A1',
    to: `Z${worksheet.lastRow.number}`
  };


  const columnWidths = [10, 15, 20, 15, 20, 15, 15, 15, 15, 15, 20, 15, 50]; 
  worksheet.columns.forEach((column, index) => {
    column.width = columnWidths[index];
  });

  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF0000FF' } // Change the color as desired
  };

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  });
const imgUrlColumnIndex = data[0].indexOf('imgurl') + 1;

for (let i = 1; i < data.length; i++) {
  const imgUrl = data[i][data[i].length - 1];
  const extension = path.extname(imgUrl).toLowerCase().substr(1);
  const imageId = workbook.addImage({
    filename: `/home/smartaxiom/Documents/Invertoryproject/src/uploads/${imgUrl}`,
    extension: extension
  });

  // Add the image to the same row as the data
  const imgRow = worksheet.getRow(i+1 );
  imgRow.height = 100; // Set the height of the row
  const imgCell = imgRow.getCell(imgUrlColumnIndex);
  imgCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFFFFF' }
  };
  imgCell.border = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' }
  };
  imgCell.alignment = { vertical: 'middle', horizontal: 'center' };

  // Add space after the image
  const spaceRow = worksheet.addRow([]);
  spaceRow.height = 20; // Set the height of the empty row

 /* worksheet.addImage(imageId, {
    tl: { col: imgUrlColumnIndex-1, row: i + 1}, // Add the image to the same row as the data
    ext: { width: 470, height: 100 },
    editAs: 'oneCell'
  });*/
 worksheet.addImage(imageId, {
    tl: { col: imgUrlColumnIndex-1, row: i }, // Add the image to the same row as the data
    ext: { width: 470, height: 130 },
    editAs: 'oneCell'
  });
}
worksheet.getRow(1).height = 20; // Set the height of the first row
worksheet.columns.forEach((column, index) => {
  column.width = columnWidths[index];
});
  const buffer = await workbook.xlsx.writeBuffer();
  const desktopPath = path.join(os.homedir(), 'Desktop');
  const fileName = `inventory_${Date.now()}.xlsx`;
  const filePath = path.join(desktopPath, fileName);

  fs.writeFileSync(filePath, buffer);
  console.log(`Excel file saved: ${filePath}`);

  return filePath;
}

async deletedata(id: string) :Promise<any>{
  const result = await this.inventoryModel.deleteOne({ _id: id }).exec();
  return result;
}
}





/*for (let i = 1; i < data.length; i++) {
    const imgUrl = data[i][data[i].length-1];
    console.log(imgUrl,"fff")
    const extension = path.extname(imgUrl).toLowerCase().substr(1);
    const imageId = workbook.addImage({
      filename: `/home/smartaxiom/Documents/Invertoryproject/src/uploads/${imgUrl}`,
      extension: extension
    });*/
  /*  const imagePath = `/home/smartaxiom/Documents/Invertoryproject/src/uploads/${imgUrl}`
    //const myBase64Image = '/home/smartaxiom/Documents/Invertoryproject/src/uploads/${imgUrl}';
    console.log(imagePath,"iii")
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString('base64');
   console.log(imageBuffer)
    const imageId = workbook.addImage({
      base64: imageBase64,
      extension: extension,
    });*/
   /* const imgUrlColumnIndex = data[0].indexOf('imgurl') + 1;

    worksheet.addImage(imageId, {
      tl: { col: imgUrlColumnIndex-1, row: i + 1}, // Add the image to the same row as the data
      ext: { width: 470, height: 100 },
      editAs: 'oneCell'
    });*/
//}

