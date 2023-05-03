import ChristianCalendar from '../src/libs/christian-calendar';
const cal = ChristianCalendar;

describe("computeAdvent", () => {
  test.each([
    [2021, new Date("2021-11-28")],
    [2022, new Date("2022-11-27")],
    [2023, new Date("2023-12-03")],
    [2024, new Date("2024-12-01")],
    [2025, new Date("2025-11-30")],
  ])("First Sunday in Advent %i should be %p", (year, expected) => {
    expect(cal.computeAdvent(Number(year))).toEqual(expected);
  });
});
