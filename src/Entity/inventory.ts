import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class invertorysEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  PO: string;

  @Column()
  invoice: string;

  @Column()
  DeviceSerial_Number: string;

  @Column()
  sim_number: string;

  @Column()
  DeviceIMEI_Number: string;

  @Column()
  BLEMac_Addr: string;

  @Column()
  Bettery: string;

  @Column()
  GPS_Antenna: string;

  @Column()
  LTE_Antenna: string;

  @Column()
  Enclosure_Type: string;

  @Column()
  Sim_Type: string;

  @Column()
  Testing_Comments: string;

  @Column()
  Place: string;

  @Column()
  imgurl: string;
}
