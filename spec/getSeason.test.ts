import ChristianCalendar from '../src/libs/christian-calendar';
import DateWithoutTime from '../src/libs/dateWithoutTime';

describe("getSeason", () => {
  test.each([
	  [new DateWithoutTime("2021-01-01"), "Christmas"],
	  [new DateWithoutTime("2020-12-25"), "Christmas"],
	  [new DateWithoutTime("2020-12-01"), "Advent 1-2"],
	  [new DateWithoutTime("2020-04-01"), "Lent"],
	  [new DateWithoutTime("2020-11-28"), "Christ the King"]
  ])("The season for %p should be %s", (date, expectedSeason) => {
    expect(ChristianCalendar.getSeason(date).name).toEqual(expectedSeason);
  });
});
