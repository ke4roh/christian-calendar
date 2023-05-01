const cal = require('../libs/christian-calendar');

describe("computeAdvent", () => {
  test.each([
	  [new Date("2021-01-01"), 2020],
	  [new Date("2020-12-25"), 2020],
	  [new Date("2020-12-01"), 2020],
	  [new Date("2020-11-29"), 2020],
	  [new Date("2020-11-28"), 2019]
  ])("First Sunday in Advent %i should be %p", (date, expectedYear) => {
    expect(cal.yearFor(date)).toEqual(expectedYear);
  });
});
