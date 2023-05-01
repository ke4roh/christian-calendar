const computeEaster = require('../libs/christian-calendar').computeEaster;

describe('computeEasterDate', () => {
  it('should return the correct date of Easter for a given year', () => {
    const easterDates = {
      2021: new Date(2021, 3, 4), // April 4, 2021
      2022: new Date(2022, 3, 17), // April 17, 2022
      2023: new Date(2023, 3, 9), // April 16th, 2023
      2024: new Date(2024, 2, 31), // March 31st, 2024
      2025: new Date(2025, 3, 20), // April 20th, 2025
      2026: new Date(2026, 3, 5), // April 5th, 2026
      2027: new Date(2027, 2, 28), // March 28th, 2027
    };

    for (const [year, expectedDate] of Object.entries(easterDates)) {
      const date = computeEaster(year);
      expectedDate.setUTCHours(0, 0, 0, 0);
      expect(date).toEqual(expectedDate);
    }
  });

  it('should return null for a year less than 1900', () => {
    const date = computeEaster(1800);
    expect(date).toBeNull();
  });
});

