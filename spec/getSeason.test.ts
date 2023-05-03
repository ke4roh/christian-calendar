import ChristianCalendar from '../src/libs/christian-calendar';
const cal = ChristianCalendar;

describe("getSeason", () => {
  test.each([
	  [new Date("2021-01-01"), "Christmas"],
	  [new Date("2020-12-25"), "Christmas"],
	  [new Date("2020-12-01"), "Advent 1-2"],
	  [new Date("2020-04-01"), "Lent"],
	  [new Date("2020-11-28"), "Christ the King"]
  ])("The season for %p should be %s", (date, expectedSeason) => {
    expect(cal.getSeason(date).name).toEqual(expectedSeason);
  });
});
