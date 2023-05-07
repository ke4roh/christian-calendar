import ChristianCalendar from '../src/libs/christian-calendar';
import DateWithoutTime from '../src/libs/dateWithoutTime';
const computeEaster = ChristianCalendar.computeEaster;


describe('computeEaster', () => {
  it('should return the correct date of Easter for a given year', () => {
    const easterDates = {
      2021: new DateWithoutTime(2021, 4, 4), // April 4, 2021
      2022: new DateWithoutTime(2022, 4, 17), // April 17, 2022
      2023: new DateWithoutTime(2023, 4, 9), // April 16th, 2023
      2024: new DateWithoutTime(2024, 3, 31), // March 31st, 2024
      2025: new DateWithoutTime(2025, 4, 20), // April 20th, 2025
      2026: new DateWithoutTime(2026, 4, 5), // April 5th, 2026
      2027: new DateWithoutTime(2027, 3, 28), // March 28th, 2027
    };

    for (const [year, expectedDate] of Object.entries(easterDates)) {
      const date = computeEaster(Number(year));
      expect(date).toEqual(expectedDate);
    }
  });

  it('should throw an exception for a year less than 1900', () => {
    expect(() => { computeEaster(1800); }).toThrow("Invalid before 1876");
  });
});

