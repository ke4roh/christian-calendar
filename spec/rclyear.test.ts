import ChristianCalendar from '../src/libs/christian-calendar';
const cal = ChristianCalendar;

describe('RCLYear', () => {
  test.each([
	  [2018,'B'],
	  [2019,'C'],
	  [2020,'A'],
	  [2021,'B'],
	  [2022,'C'],
	  [2023,'A'],
	  [2024,'B']
      ])('RCL year for %d should be %s', (year, expected) => {
    expect(cal.rclYear(year)).toBe(expected);
  });
});

