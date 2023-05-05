import ChristianCalendar from '../src/libs/christian-calendar';
const cal = ChristianCalendar;


describe("yearFor", () => {
  test.each([
	  [new Date("2021-01-01"), 2021],
	  [new Date("2020-12-25"), 2021],
	  [new Date("2020-12-01"), 2021],
	  [new Date("2020-11-29"), 2021],
	  [new Date("2020-11-28"), 2020]
  ])("The year number for %p should be %i", (date, expectedYear) => {
    expect(cal.yearFor(date)).toEqual(expectedYear);
  });
});
