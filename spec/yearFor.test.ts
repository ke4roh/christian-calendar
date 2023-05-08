import ChristianCalendar from '../src/libs/christian-calendar';
import DateWithoutTime from '../src/libs/dateWithoutTime';

describe("yearFor", () => {
  test.each([
	  [new DateWithoutTime("2021-01-01"), 2021],
	  [new DateWithoutTime("2020-12-25"), 2021],
	  [new DateWithoutTime("2020-12-01"), 2021],
	  [new DateWithoutTime("2020-11-29"), 2021],
	  [new DateWithoutTime("2020-11-28"), 2020],
	  [new DateWithoutTime("2023-05-07"), 2023]
  ])("The year number for %p should be %i", (date, expectedYear) => {
    expect(ChristianCalendar.yearFor(date)).toEqual(expectedYear);
  });
});
