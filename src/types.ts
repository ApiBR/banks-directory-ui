export interface Bank {
  COMPE: string;
  ISPB: string;
  Document: string;
  LongName: string;
  ShortName: string;
  Network: string;
  Type: string | null;
  PixType: string | null;
  Charge: boolean;
  CreditDocument: boolean;
  LegalCheque: boolean;
  DetectaFlow: boolean;
  PCR: boolean;
  PCRP: boolean;
  SalaryPortability: string | null;
  Products: string[] | null;
  Url: string;
  DateOperationStarted: string;
  DatePixStarted: string | null;
  DateRegistered: string;
  DateUpdated: string;
}