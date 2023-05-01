// Library for computing the Christian calendar seasons and colors
// 
// Notes:
// - All the dates are worked in GMT.
// - Season end dates are a convenience, at the start of the (GMT) day 
//   ending the season

function addDays(date, days) {
  const oneDayMs = 24 * 60 * 60 * 1000; // milliseconds in one day
  const targetTimeMs = date.getTime() + days * oneDayMs; // target time in milliseconds
  const targetDate = new Date(targetTimeMs); // create a new Date object using the target time
  return targetDate;
}

function computeEaster(year) {
  if (year < 1900) {
    return null; // Invalid input, return null
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

  // Month is zero-indexed in JavaScript Date object, so subtract 1
  let month = n - 1;
  let day = p + 1;

  return new Date(Date.UTC(year, month, day));
}

function computeAdvent(year) {
  const dec1st = new Date(year, 11, 1);
  const dayOfWeek = dec1st.getDay(); // get the day of the week for December 1st
  const daysUntilThursday = (4 - dayOfWeek + 7) % 7; // calculate the number of days until Thursday (4)
  const firstThursday = new Date(Date.UTC(year, 11, 1 + daysUntilThursday));
  return addDays(firstThursday,-4);
}


function rclYear(year) {
    const rclStartYear = 2019;
    const rclYears = ["A", "B", "C"];
    const diff = year - rclStartYear;
    const index = diff >= 0 ? diff % 3 : ((diff % 3) + 3) % 3;
    return rclYears[index];
}

class Color {
  constructor(name, rgb) {
    this.name = name;
    this.rgb = rgb;
  }
}

const raw_palette = [
  ['black', '#000000'],
  ['dark blue', '#0000A0'],
  ['blue', '#0000FF'],
  ['green', '#008000'],
  ['aqua', '#008080'],
  ['light green', '#00BF00'],
  ['blue violet', '#772E9E'],
  ['purple', '#800080'],
  ['olive', '#807600'],
  ['red violet', '#993177'],
  ['gray', '#C0C0C0'],
  ['bronze', '#EF7510'],
  ['gold', '#F0A300'],
  ['red', '#FF0000'],
  ['rose', '#FF0080'],
  ['pink', '#FF80C0'],
  ['yellow', '#FFFF00'],
  ['white', '#FFFFFF']
];

const palette= new Map();

for (const colorDef in raw_palette) {
  palette.set(colorDef[0], new Color(colorDef[0], colorDef[1]));
}

class Season {
  constructor(name, startDate, endDate, colors, alternateColors) {
    if (startDate.getUTCHours()!=0) throw `Start date ${startDate} for ${name} has hours`;
    if (startDate.getUTCMinutes()!=0) throw "Start date has minutes";
    if (startDate.getUTCSeconds()!=0) throw "Start date has seconds";
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.colors = colors;
    this.alternateColors = alternateColors;
  }
}

class Year {
  constructor(year) {
    // The year runs from Advent to Christ the King (week).  
    // This number corresponds to the year in which the Christian year begins.
    this.year = year;
    this.rclYear = rclYear(year);
    const advent = this.advent = computeAdvent(year);
    const easter = this.easter = computeEaster(year + 1);
	  
    // Following dates are necessary to complete calculation, and it's easier to
    // read with the names than the dates, but they are not worthy of 
    // inclusion in exported values.
    const christmas = new Date(Date.UTC(year, 11, 25));
    const allSaints = new Date(Date.UTC(year + 1, 10, 1));
    const nextAdvent = computeAdvent(year + 1)


    // adding seasons backward to get the end dates automatically
    this.seasons = []
    this._addSeason("Christ the King",addDays(nextAdvent,-7),    ["white","gold"],["white","yellow"], addDays(nextAdvent,-1))
    this._addSeason("ordinary time",  addDays(allSaints,1),      ["green"],["light green","bronze"])
    this._addSeason("All Saints Day", allSaints,                 ["red"],["white","gold"])
    this._addSeason("ordinary time",  addDays(easter, 9*7),  ["green"],["light green","bronze"])
    this._addSeason("Trinity Sunday", addDays(easter, 8*7),  ["white","gold"],["red"])
    this._addSeason("Pentecost",      addDays(easter, 7*7),  ["red"],["red","gold"])
    this._addSeason("Eastertide",     addDays(easter, 40),    ["white","gold"],["red"])
    this._addSeason("Ascension Day",  addDays(easter, 39),   ["white","gold"],["white","yellow"])
    this._addSeason("Eastertide",     addDays(easter, 7),    ["white","gold"],["red"])
    this._addSeason("Easter",         easter,                ["white","gold"],["white","yellow"])
    this._addSeason("Holy Saturday",  addDays(easter, -1) ,  [],[])
    this._addSeason("Good Friday",    addDays(easter, -2) ,  ["purple","black"],[])
    this._addSeason("Maundy Thursday",addDays(easter, -3) ,  ["purple"],["red"])
    this._addSeason("Palm Sunday",    addDays(easter, -7) ,  ["purple"],["red"])
    this._addSeason("Lent",           addDays(easter, -14),  ["purple"],["red violet"])
    this._addSeason("Laetare Sunday", addDays(easter, -21),  ["rose"], ["rose"])
    this._addSeason("Lent",           addDays(easter, -45),  ["purple"],["red violet"])
    this._addSeason("Ash Wednesday",  addDays(easter, -46),  ["purple"],["grey"])
    this._addSeason("Transfiguration",addDays(easter, -49),  ["white","gold"],["white","yellow"])
    this._addSeason("ordinary time"  ,addDays(christmas, 13),["green"],["light green","bronze"])
    this._addSeason("Epiphany"       ,addDays(christmas, 12),["white","gold"],["white","yellow"])
    this._addSeason("Christmas"      ,christmas,             ["white","gold"],["white","yellow"])
    this._addSeason("Christmas Eve"  ,addDays(christmas, -1),["dark blue","blue"],["blue violet","purple"])
    this._addSeason("Advent 4"       ,addDays(advent, 3*7),  ["dark blue","blue"],["blue violet","purple"])
    this._addSeason("Advent 3",       addDays(advent, 2*7),  ["pink"],["rose"])
    this._addSeason("Advent 1-2",     advent,               ["dark blue","blue"],["blue violet","purple"])
    this.seasons.reverse()
  }
 

  _addSeason(name, startDate, colors, alternateColors, endDate = null) {
    const realEndDate = endDate ? endDate : addDays(this.seasons.at(-1).startDate,-1);
    const season = new Season(
      name, startDate, realEndDate, 
	    colors.map(function(color) { return palette.get(color) }),
	    alternateColors.map(function(color) { return palette.get(color) }))
    this.seasons.push(season);
  }
}

function yearFor(date) {
   currentYear = date.getFullYear();
   advent = computeAdvent(currentYear);
   return (advent.getTime() <= date.getTime() ? 0 : -1) + currentYear;
	
}

module.exports = {
	computeEaster: computeEaster,
	computeAdvent: computeAdvent,
	rclYear: rclYear,
	palette: palette,
	Year: Year,
	Season: Season,
	Color: Color,
	addDays: addDays,
	yearFor: yearFor
};
