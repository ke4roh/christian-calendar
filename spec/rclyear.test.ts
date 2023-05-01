/// <reference types="node" />

const cal = require('../libs/christian-calendar');

describe('RCLYear', () => {
  test.each([
	  [2017,'B'],
	  [2018,'C'],
	  [2019,'A'],
	  [2020,'B'],
	  [2021,'C'],
	  [2022,'A'],
	  [2023,'B']
      ])('RCL year for %d should be %s', (year, expected) => {
    expect(cal.rclYear(year)).toBe(expected);
  });
});

