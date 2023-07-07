/*import { Schema ,Prop,SchemaFactory } from '@nestjs/mongoose';


@Schema()

export class user{
    @Prop()
    _id:Number

@Prop()

name:"string"
@Prop()

email:"string"

}
 export const invertoryschema=SchemaFactory.createForClass(user)*/


 import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
 import { Document } from 'mongoose';
 
 export type InventoryDocument = Inventory & Document;
 
 @Schema()
 export class Inventory {
   @Prop({ required: true })
   id: string;
 
   @Prop()
   PO: string;
 
   @Prop()
   invoice: string;
 
   @Prop({ required: true })
   DeviceSerial_Number: string;
 
   @Prop({ required: true })
   sim_number: string;
 
   @Prop({ required: true })
   DeviceIMEI_Number: string;
 
   @Prop({ required: true })
   BLEMac_Addr: string;
 
   @Prop()
   Battery: string;
 
   @Prop({ required: true })
   GPS_Antenna: string;
 
   @Prop({ required: true })
   LTE_Antenna: string;
 
   @Prop({ required: true })
   Enclosure_Type: string;
 
   @Prop({ required: true })
   Sim_Type: string;
 
   @Prop({ required: true })
   Testing_Comments: string;
 
   @Prop({ required: true })
   Place: string;
 
   @Prop({ required: true })
   imgurl: string;
 }
 
 export const InventorySchema = SchemaFactory.createForClass(Inventory);
 