import { ApiProperty } from '@nestjs/swagger';

export class InvertoryDTO {
  @ApiProperty({ example: '1234', description: 'State of the device' })
  id: string;
  @ApiProperty({ example: 'xxxx', description: 'State of the device' })
  PO: string
  @ApiProperty({ example: 'xxx', description: 'State of the device' })
  invoice: string
  @ApiProperty({ example: 'devicename', description: 'State of the device' })
  DeviceSerial_Number: string
  @ApiProperty({ example: '000000000', description: 'State of the device' })
  sim_number: string
  @ApiProperty({ example: '1234', description: 'State of the device' })
  DeviceIMEI_Number: string
  @ApiProperty({ example: '', description: 'State of the device' })
  BLEMac_Addr: string
  @ApiProperty({ example: '', description: 'State of the device' })
  Bettery: string
  @ApiProperty({ example: '', description: 'State of the device' })
  GPS_Antenna: string
  @ApiProperty({ example: '', description: 'State of the device' })
  LTE_Antenna: string
  @ApiProperty({ example: '', description: 'State of the device' })
  Enclosure_Type: string
  @ApiProperty({ example: '', description: 'State of the device' })
  Sim_Type: string
  @ApiProperty({ example: '', description: 'State of the device' })
  @ApiProperty({ example: '', description: 'State of the device' })
  Testing_Comments: string
  @ApiProperty({ example: '', description: 'State of the device' })
  Place: string
  @ApiProperty({ example: '', description: 'State of the device' })
  imgurl: string

}
