export interface SendMail {
    data: Data;
  }
  
  export interface Data {
    message: string;
  }
  
  export interface ValidateCode {
    data: DataValidateCode;
  }
  
  export interface DataValidateCode {
    status: boolean
  }
  