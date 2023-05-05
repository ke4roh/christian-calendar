import ChristianCalendar from '../src/libs/christian-calendar';

function idate(dateString: string): Date {
   const [year, month, day] = dateString.split("-");
   return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
}

type SeasonTestCase = {
  name: string;
  startDate: Date;
  endDate: Date;
  colors: ChristianCalendar.Color[];
  alternateColors: ChristianCalendar.Color[];
}

function stc(name: string, startDate: string, endDate: string, colors: string[], alternateColors: string[]): SeasonTestCase {
	return {
		name: name,
		startDate: idate(startDate),
		endDate: idate(endDate),
		colors: colors.map(ChristianCalendar.colorize),
		alternateColors: alternateColors.map(ChristianCalendar.colorize)
	};
}

   const cases = [
          stc("Advent 1-2",    "2020-11-29", "2020-12-12", ["dark blue", "blue"], ["blue violet", "purple"]),
          stc("Advent 3",      "2020-12-13", "2020-12-19", ["pink"], ["rose" ]),
          stc("Advent 4",      "2020-12-20", "2020-12-23", ["dark blue", "blue"], ["blue violet", "purple"]),
          stc("Christmas Eve", "2020-12-24", "2020-12-24", ["dark blue", "blue"], ["blue violet", "purple"]),
          stc("Christmas",     "2020-12-25", "2021-01-05", ["white", "gold"], ["white", "yellow" ]),
          stc("Epiphany"     , "2021-01-06", "2021-01-06", ["white", "gold"], ["white", "yellow" ]),
          stc("ordinary time", "2021-01-07", "2021-02-13", ["green"], ["light green"]),
          stc("Transfiguration", "2021-02-14", "2021-02-16", ["white", "gold"], ["white", "yellow" ]),
          stc("Ash Wednesday", "2021-02-17", "2021-02-17", ["purple"],["gray"]),
          stc("Lent",          "2021-02-18", "2021-03-13", ["purple"],["red violet"]),
          stc("Laetare Sunday","2021-03-14", "2021-03-20", ["rose"],["rose"]),
          stc("Lent",          "2021-03-21", "2021-03-27", ["purple"],["red violet"]),
          stc("Palm Sunday"   ,"2021-03-28", "2021-03-31", ["purple"],["red"]),
          stc("Maundy Thursday","2021-04-01","2021-04-01", ["purple"],["red"]),
          stc("Good Friday"    ,"2021-04-02","2021-04-02", ["purple","black"],[]),
          stc("Holy Saturday"  ,"2021-04-03","2021-04-03", [], []),
          stc("Easter"         ,"2021-04-04","2021-04-10", ["white", "gold"], ["white", "yellow"]),
          stc("Eastertide"     ,"2021-04-11","2021-05-12", ["white", "gold"], ["red"]),
          stc("Ascension Day"  ,"2021-05-13","2021-05-13", ["white", "gold"], ["white", "yellow"]),
          stc("Eastertide"     ,"2021-05-14","2021-05-22", ["white", "gold"], ["red"]),
          stc("Pentecost"      ,"2021-05-23","2021-05-29", ["red"],["red","gold"]),
          stc("Trinity Sunday" ,"2021-05-30","2021-06-05", ["white", "gold"], ["red"]),
          stc("ordinary time"  ,"2021-06-06","2021-10-31", ["green"],["light green","bronze","aqua","olive"]),
          stc("All Saints Day" ,"2021-11-01","2021-11-01", ["red"],["white","gold"]),
          stc("ordinary time"  ,"2021-11-02","2021-11-20", ["green"],["light green","bronze","aqua","olive"]),
          stc("Christ the King","2021-11-21","2021-11-27", ["white", "gold"], ["white", "yellow"])
    ];

describe('Year class', () => {
  it ("Should know its year number and RCL year", () => {
     const year = new ChristianCalendar.Year(2021);
     expect(year.year).toBe(2021);
     expect(year.rclYear).toBe('B');
  });    

  it ("Should return the correct number of seasons for a given year.", () => { 
    const year = new ChristianCalendar.Year(2021);
    const seasons = year.seasons;
    expect(year.seasons).toHaveLength(cases.length);
  });

  
  test.each(cases)("The season $name for $startDate should be correctly initialized", (expected) => {
      const season = ChristianCalendar.getSeason(expected.startDate);
      expect(season.name).toEqual(expected.name);
      expect(season.startDate).toEqual(expected.startDate);
      expect(season.endDate).toEqual(expected.endDate);
      expect(season.colors).toEqual(expected.colors);
      expect(season.alternateColors).toEqual(expected.alternateColors);
  }); // each seasaon
}); // year
