import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import {  InventorySchema } from './invertoryschema';
import { Inventorycontroller } from './inventorycontroller';
import { Inventoryservice } from './inventroyservies';
import { TypeOrmModule } from "@nestjs/typeorm";
import { invertorysEntity } from './Entity/inventory';

@Module({
  imports: [ 
    MongooseModule.forRoot('mongodb://localhost:27017/inventory'),
   /* MulterModule.register({
      dest: './uploads',
    }),*/
    //TypeOrmModule.forRoot(), TypeOrmModule.forFeature([invertorysEntity]),
  
    MongooseModule.forFeature([
      { name: 'Inventory', schema: InventorySchema },
    ]),
  ],
  controllers: [Inventorycontroller ],
  providers:[Inventoryservice,invertorysEntity]
})
export class AppModule {}

``
