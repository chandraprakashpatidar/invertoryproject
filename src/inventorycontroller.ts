import { Controller, Post, UploadedFile, UseInterceptors, Body, Get, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { InvertoryDTO } from './DTO/inventory';
import { diskStorage } from 'multer';
import { Inventoryservice } from './inventroyservies';
import * as xlsx from 'xlsx';

@Controller('inventory')
@ApiTags('inv')
export class Inventorycontroller {
  constructor(private readonly invertoryservies: Inventoryservice) { }
  @Post('file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: '/home/smartaxiom/Documents/Invertoryproject/src/uploads',
      filename: (req, file, cb) => {
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = file.originalname;
        console.log(extension, "kkkkk")
        cb(null, extension);
      },
    }),
  }))
  async createInventory(@UploadedFile() file, @Body() createInventoryDto: InvertoryDTO) {

    console.log(file, 'jjj');
    const fileN = file.originalname
    console.log(fileN)
    console.log(createInventoryDto)
    const data = { ...createInventoryDto, "imgurl": fileN }
    console.log(data)
    const savedata = await this.invertoryservies.createInventory(data)
    return { message: 'File uploaded successfully', data1: savedata };
  }

  @Get(':id')
  async getData(@Param('id') id: string) {
    const data = await this.invertoryservies.getDataById(id);
    console.log(data, "jjj")
    return data
    /*const processedData = await this.secondApi(data);

    return {
      firstApiData: data,
      secondApiData: processedData
    };*/
  }
  /* @Get('all/:id')
   async secondApi(@Param('id') id: string) {
     //const data = await this.invertoryservies.getallData(id);
     const processedData = await this.invertoryservies.getallData(id)
     console.log(processedData,"jjj")
     
     return processedData;
   }*/

  @Post('excel')
  @UseInterceptors(FileInterceptor('excel', {
    storage: diskStorage({
      destination: '/home/smartaxiom/Documents/Invertoryproject/src/uploads',
      filename: (req, file, cb) => {
        const extension = file.originalname;
        console.log(extension, 'kkkkk');
        cb(null, extension);
      },
    }),
  }))
  async uploadExcelFile(@UploadedFile() file) {
    // Convert file path to string
    try {
      const datafile = await this.invertoryservies.filedata(file);
      return { success: true, data: datafile, message: 'Data uploaded successfully' };
    } catch (error) {
      return { success: false, data: null, message: 'Error uploading data' };
    }
  }

  @Get('alldata/:id')
  async getAllData(@Param('id') id: string) {

    console.log("kk")

    const data = await this.invertoryservies.getAllData(id);
    return data;
  }

  @Delete(':id')
  async deletedata(@Param('id') id: string): Promise<any> {
    const data = await this.invertoryservies.deletedata(id);
    return { message: 'Inventory deleted successfully', data };
  }


}



