import { Day } from '../../models/days/day';

const daysList: Day[] = [
  {
    date: new Date(),
    img: "http://lorempixel.com/200/200/",
    desc: "Great day today!"
  },
  {
    date: new Date(),
    img: "http://lorempixel.com/199/199/",
    desc: "Meh day today."
  },
  {
    date: new Date(),
    img: "http://lorempixel.com/201/201/",
    desc: "Bad day today..."
  }
]

export const DAYS_LIST = daysList;
