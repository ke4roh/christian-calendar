/// <reference types="node" />
import DateWithoutTime from "./dateWithoutTime";

// Library for computing the Christian calendar seasons and colors
namespace ChristianCalendar {
  const earlyEasters = "BVG8RJ4OFSKCVG8SC4O9SK5PG8LDWO9TK5PH1LDXH9TE5PAULDQI9ME6PAUM6QI3MEYJAUF7QB3NERJBUF7RBVN8RJ4OF0KCVG8SK5PH1LDXH9TE5PAUL6QI9ME6PAUM6QI3MEYJAUF7QB3NERJBNF7KBVN8RJ4OF0KCVG8SC4O9SKCPG8SD4O9TK5PH1LDXH9TE5PH2MERJANF7QBVN7RJ4NF0KBVG8RC4OFSKCVG8SC4O9SK5PG1LDWH9TK5PH1LDXH9TE5PAUL6QI9ME6"
  export function computeEaster(year: number): DateWithoutTime {
    if (year < 1600) {
      throw new Error("Invalid before 1600")
    }
    if (year < 1876) {
      const offsetCode = earlyEasters.charCodeAt(year - 1600);
      let offset = offsetCode - ((offsetCode < 65) ? 48 : 55);
      return new DateWithoutTime(year, 2, 22).addDays(offset);
    }
  
    let a = year % 19;
    let b = Math.floor(year / 100);
    let c = year % 100;
    let d = Math.floor(b / 4);
    let e = b % 4;
    let f = Math.floor((b + 8) / 25);
    let g = Math.floor((b - f + 1) / 3);
    let h = (19 * a + b - d - g + 15) % 30;
    let i = Math.floor(c / 4);
    let k = c % 4;
    let l = (32 + 2 * e + 2 * i - h - k) % 7;
    let m = Math.floor((a + 11 * h + 22 * l) / 451);
    let n = Math.floor((h + l - 7 * m + 114) / 31);
    let p = (h + l - 7 * m + 114) % 31;
  
    let month = n;
    let day = p + 1;
  
    return new DateWithoutTime(year, month-1, day);
  }
  
  export function computeAdvent(year: number): DateWithoutTime {
    const dec1st = new DateWithoutTime(year, 11, 1);
    const dayOfWeek = dec1st.getDay(); // get the day of the week for December 1st
    const daysUntilThursday = (4 - dayOfWeek + 7) % 7; // calculate the number of days until Thursday (4)
    const firstThursday = new DateWithoutTime(year, 11, 1 + daysUntilThursday);
    return firstThursday.addDays(-4);
  }
  
  
  export function rclYear(year: number): string {
      const rclStartYear = 2020;
      const rclYears = ["A", "B", "C"];
      const diff = year - rclStartYear;
      const index = diff >= 0 ? diff % 3 : ((diff % 3) + 3) % 3;
      return rclYears[index];
  }
  
  export class Color {
    name: string;
    rgb: string;
    constructor(name: string, rgb: string) {
      this.name = name;
      this.rgb = rgb;
    }
  }

  export const palette: Map<string, Color>= new Map<string, Color>();
 
  function _addColor(name: string, rgb: string): void {
     const cleanName = _cleanColorName(name);
     palette.set(cleanName, new Color(cleanName, rgb))
  }

  function _cleanColorName(name: string): string {
     return name.trim().toLowerCase();
  } 

  _addColor('black', '#000000');
  _addColor('dark blue', '#0000A0');
  _addColor('blue', '#0000FF');
  _addColor('green', '#008000');
  _addColor('aqua', '#008080');
  _addColor('light green', '#00BF00');
  _addColor('blue violet', '#772E9E');
  _addColor('purple', '#800080');
  _addColor('olive', '#807600');
  _addColor('red violet', '#993177');
  _addColor('gray', '#C0C0C0');
  _addColor('bronze', '#EF7510');
  _addColor('gold', '#F0A300');
  _addColor('red', '#FF0000');
  _addColor('rose', '#FF0080');
  _addColor('pink', '#FF80C0');
  _addColor('yellow', '#FFFF00');
  _addColor('white', '#FFFFFF');
  palette.set("grey", colorize("gray"));
  
  export function colorize(name: string): Color {
    const color = palette.get(_cleanColorName(name));
    if (!color) 
    throw new Error(`Invalid color: "${name}" - valid ones are "${Array.from(ChristianCalendar.palette.keys()).join('", "')}"`);
    return color;

  }

  export class Season {
    name: string;
    startDate: DateWithoutTime;
    endDate: DateWithoutTime;
    colors: Color[];
    alternateColors: Color[];
    year: Year;
    id: number;
  	
    constructor(name: string, startDate: DateWithoutTime, endDate: DateWithoutTime, colors: Color[], alternateColors: Color[], year: Year) {
      this.name = name;
      this.startDate = startDate;
      this.endDate = endDate;
      this.colors = colors;
      this.alternateColors = alternateColors;
      this.year = year;
      this.id = year.year * 400 + startDate.dayOfYear;
    }
  }
  
  export class Year {
    public year: number;
    public rclYear: string;
    public dailyOfficeYear: string;
    public advent: DateWithoutTime;
    public easter: DateWithoutTime;
    public seasons: Season[];
  
    constructor(year: number) {
      // The year runs from Advent to Christ the King (week).  
      // This number corresponds to the year in which the Christian year begins.
      this.year = year;
      this.rclYear = rclYear(year);
      this.dailyOfficeYear = (2 - (year % 2)).toString();
      const advent = this.advent = computeAdvent(year-1);
      const easter = this.easter = computeEaster(year);
  	  
      // Following dates are necessary to complete calculation, and it's easier to
      // read with the names than the dates, but they are not worthy of 
      // inclusion in exported values.
      const christmas = new DateWithoutTime(year-1, 11, 25);
      const allSaints = new DateWithoutTime(year, 10, 1);
      const nextAdvent = computeAdvent(year);
  
      // adding seasons backward to get the end dates automatically
      this.seasons = [];
      this._addSeason("Christ the King",nextAdvent.addDays(-7), ["white","gold"],["white","yellow"], nextAdvent.addDays(-1));
      this._addSeason("ordinary time",  allSaints.addDays(1), ["green"],["light green","bronze","aqua","olive"]);
      this._addSeason("All Saints Day", allSaints,            ["red"],["white","gold"]);
      this._addSeason("ordinary time",  easter.addDays(9*7),  ["green"],["light green","bronze","aqua","olive"]);
      this._addSeason("Trinity Sunday", easter.addDays(8*7),  ["white","gold"],["red"]);
      this._addSeason("Pentecost",      easter.addDays(7*7),  ["red"],["red","gold"]);
      this._addSeason("Eastertide",     easter.addDays(40),   ["white","gold"],["red"]);
      this._addSeason("Ascension Day",  easter.addDays(39),   ["white","gold"],["white","yellow"]);
      this._addSeason("Eastertide",     easter.addDays(7),    ["white","gold"],["red"]);
      this._addSeason("Easter",         easter,               ["white","gold"],["white","yellow"]);
      this._addSeason("Holy Saturday",  easter.addDays(-1) ,  [],[]);
      this._addSeason("Good Friday",    easter.addDays(-2) ,  ["purple","black"],[]);
      this._addSeason("Maundy Thursday",easter.addDays(-3) ,  ["purple"],["red"]);
      this._addSeason("Palm Sunday",    easter.addDays(-7) ,  ["purple"],["red"]);
      this._addSeason("Lent",           easter.addDays(-14),  ["purple"],["red violet"]);
      this._addSeason("Laetare Sunday", easter.addDays(-21),  ["rose"], ["rose"]);
      this._addSeason("Lent",           easter.addDays(-45),  ["purple"],["red violet"]);
      this._addSeason("Ash Wednesday",  easter.addDays(-46),  ["purple"],["grey"]);
      this._addSeason("Transfiguration",easter.addDays(-49),  ["white","gold"],["white","yellow"]);
      this._addSeason("ordinary time"  ,christmas.addDays(13),["green"],["light green"]);
      this._addSeason("Epiphany"       ,christmas.addDays(12),["white","gold"],["white","yellow"]);
      this._addSeason("Christmas"      ,christmas,            ["white","gold"],["white","yellow"]);
      this._addSeason("Advent 4"       ,advent.addDays(3*7),  ["dark blue","blue"],["blue violet","purple"], christmas.addDays(-1));
      this._addSeason("Advent 3",       advent.addDays(2*7),  ["pink"],["rose"]);
      this._addSeason("Advent 1-2",     advent,               ["dark blue","blue"],["blue violet","purple"]);
      this.seasons.reverse();
    }
   
  
    private _addSeason(name: string, startDate: DateWithoutTime, colors: string[], alternateColors: string[], endDate: DateWithoutTime|null = null) {
      let realEndDate = endDate;
      if (!realEndDate) {
        const tentativeEndDate = this.seasons!.at(-1)!.startDate.addDays(-1);
        if (tentativeEndDate.getTime() < startDate.getTime()) {
          realEndDate = startDate;
        } else {
          realEndDate = tentativeEndDate;
        }
      }
      const season = new Season(
        name, startDate, realEndDate, 
  	    colors.map(function(color) { return colorize(color) }),
  	    alternateColors.map(function(color) { return colorize(color) }), this)
      this.seasons.push(season);
    }
  }

  // This is a convenience function to get the season for a given date.
  // Some dates include multiple seasons.  This function returns the
  // first season that includes the date.
  export function getSeason(date: Date | DateWithoutTime): Season {
    const seasons: Season[] = (new Year(yearFor(date))).seasons
    let index = -1;

    // linear search for the first season that includes the date
    while (index < seasons.length - 1 && seasons[index + 1].startDate.getTime() <= date.getTime()) {
      index++;
    }

    return seasons[index];
  }
  
  export function yearFor(date: Date | DateWithoutTime): number {
     let _date = date instanceof Date ? new DateWithoutTime((date as Date)) : date;
     let advent = computeAdvent(_date.year);
     return (advent.getTime() <= _date.getTime() ? 1 : 0) + _date.year;
  }
}

export default ChristianCalendar;
