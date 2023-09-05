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

describe('Daily Office year', () => {
	test('Daily Office year for 2021 should be 1', () => {
		let cal = new ChristianCalendar.Year(2021);
		expect(cal.dailyOfficeYear).toBe("1");
	});
	test('Daily Office year for 2022 should be 2', () => {
		let cal = new ChristianCalendar.Year(2022);
		expect(cal.dailyOfficeYear).toBe("2");
	});
});

