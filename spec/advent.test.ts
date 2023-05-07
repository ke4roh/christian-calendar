import ChristianCalendar from '../src/libs/christian-calendar';
import DateWithoutTime from '../src/libs/dateWithoutTime';
const cal = ChristianCalendar;

describe("computeAdvent", () => {
  test.each([
    [2021, new DateWithoutTime("2021-11-28")],
    [2022, new DateWithoutTime("2022-11-27")],
    [2023, new DateWithoutTime("2023-12-03")],
    [2024, new DateWithoutTime("2024-12-01")],
    [2025, new DateWithoutTime("2025-11-30")],
  ])("First Sunday in Advent %i should be %p", (year, expected) => {
    expect(cal.computeAdvent(Number(year))).toEqual(expected);
  });
});
