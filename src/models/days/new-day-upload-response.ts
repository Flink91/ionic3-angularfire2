import { Day } from '../../models/days/day';

export interface NewDayUploadResponse {
  result?:any;

  error?:{
    code?: string;
    message?: string;
  }
}
