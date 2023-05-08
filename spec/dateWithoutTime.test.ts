import DateWithoutTime from "../src/libs/dateWithoutTime";
import moment from "moment-timezone";

describe("DateWithoutTime", () => {
  const timeZones = ["America/New_York", "Asia/Tokyo", "Pacific/Honolulu"];

  timeZones.forEach((timeZone) => {
    beforeAll(() => {
      moment.tz.setDefault(timeZone);
    });

    test(`constructor with no parameters creates an instance representing new Date() in the ${timeZone} time zone`, () => {
      const expectedDate = new DateWithoutTime(new Date());
      const date = new DateWithoutTime();
      expect(expectedDate.toISOString()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(date.toISOString()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(date.toISOString().slice(0, 10)).toBe(expectedDate.toISOString().slice(0, 10));
    });
  
    test(`constructor with a string in ISO format creates an instance representing that date in the ${timeZone} time zone`, () => {
      const dateString = "2023-05-05";
      const expectedDate = new DateWithoutTime(dateString);
  
      const date = new DateWithoutTime(dateString);
  
      expect(date.toISOString()).toBe(expectedDate.toISOString());
    });
  
    test(`constructor with a Date object creates an instance representing that date in the ${timeZone} time zone`, () => {
      const dateObject = moment('2023-05-05 12:00:00').toDate();
      const expectedDate = new DateWithoutTime("2023-05-05");
  
      const date = new DateWithoutTime(dateObject);
  
      expect(date.toISOString()).toBe(expectedDate.toISOString());
    });
  
    test(`year method returns the year in the ${timeZone} time zone`, () => {
      const date = new DateWithoutTime("2023-12-31");
  
      expect(date.year).toBe(2023);
    });
  
    test(`month method returns the month in the ${timeZone} time zone`, () => {
      const date = new DateWithoutTime("2023-05-31");
  
      expect(date.month).toBe(5);
    });
  
    test(`day method returns the day in the ${timeZone} time zone`, () => {
      const date = new DateWithoutTime("2023-05-05");
  
      expect(date.day).toBe(5);
    });
  
    test(`dayOfYear method returns the day of the year in the ${timeZone} time zone`, () => {
      const date = new DateWithoutTime("2023-05-05");
  
      expect(date.dayOfYear).toBe(125);
    });
  
    test(`toISOString method returns the date in ISO format in the ${timeZone} time zone`, () => {
      const date = new DateWithoutTime("2023-05-05");
  
      expect(date.toISOString()).toBe("2023-05-05");
    });
  
    test("Adding 0 days should return the same date", () => {
      const date = new DateWithoutTime("2023-05-05");
      const newDate = date.addDays(0);
      expect(newDate.toISOString()).toBe("2023-05-05");
      expect(newDate).toEqual(date);
    });
    
    test("Adding a positive number of days should return the expected date", () => {
      const date = new DateWithoutTime("2023-05-05");
      const newDate = date.addDays(10);
      expect(newDate.toISOString()).toBe("2023-05-15");
    });
    
    test("Adding a negative number of days should return the expected date", () => {
      const date = new DateWithoutTime("2023-05-15");
      const newDate = date.addDays(-10);
      expect(newDate.toISOString()).toBe("2023-05-05");
    });
    
    test("Adding a large number of days should return the expected date", () => {
      const date = new DateWithoutTime("2023-05-05");
      const newDate = date.addDays(100);
      expect(newDate.toISOString()).toBe("2023-08-13");
    });
  
    describe("constructor", () => {
      it("should create a DateWithoutTime object with the given year, month, and day", () => {
        const myDate = new DateWithoutTime(2023, 5, 5);
        expect(myDate.toString()).toBe("2023-05-05");
      });
    });
  
    describe("getDay", () => {
      it("should return 0 for Sunday", () => {
        const myDate = new DateWithoutTime("2023-05-07"); // May 7, 2023 is a Sunday
        expect(myDate.getDay()).toBe(0);
      });
  
      it("should return 3 for Wednesday", () => {
        const myDate = new DateWithoutTime("2023-05-10"); // May 10, 2023 is a Wednesday
        expect(myDate.getDay()).toBe(3);
      });
    });
  });
});
