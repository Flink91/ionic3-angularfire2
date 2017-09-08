import { Day } from '../../models/days/day';

const daysList: Day[] = [
  {
    $key : 'fdgdsfgsdrg4545',
    date: new Date(),
    img: "http://lorempixel.com/200/200/",
    desc: "Great day today!",
    rating: 5
  },
  {
    $key : 'fdgdsfgsdrg454d5',
    date: new Date(),
    img: "http://lorempixel.com/199/199/",
    desc: "Meh day today.",
    rating: 3
  },
  {
    $key : 'sdgdsfgsdrg454s5',
    date: new Date(),
    img: "http://lorempixel.com/201/201/",
    desc: "Bad day today...",
    rating: 2
  }
]

export const DAYS_LIST = daysList;
