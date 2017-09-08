import { Profile } from '../profile/profile';

export interface Day{
  $key: string;
  date: Date;
  rating: number;
  desc: string;
  img: string;
}
