const cal = require('../libs/christian-calendar');

function idate(dateString) {
   const [year, month, day] = dateString.split("-");
   return new Date(Date.UTC(year, month - 1, day));
}

test('Year class', () => {
  const year = new cal.Year(2020);
  expect(year.year).toBe(2020);
  expect(year.rclYear).toBe('B');
  expect(year.seasons).toHaveLength(26);

  const expectedSeasons = [
	  [ "Advent 1-2",    "2020-11-29", "2020-12-12", ["dark blue", "blue"], ["blue violet", "purple"]],
	  [ "Advent 3",      "2020-12-13", "2020-12-19", ["pink"], ["rose" ]],
	  [ "Advent 4",      "2020-12-20", "2020-12-23", ["dark blue", "blue"], ["blue violet", "purple"]],
	  [ "Christmas Eve", "2020-12-24", "2020-12-24", ["dark blue", "blue"], ["blue violet", "purple"]],
	  [ "Christmas",     "2020-12-25", "2021-01-05", ["white", "gold"], ["white", "yellow" ]],
	  [ "Epiphany"     , "2021-01-06", "2021-01-06", ["white", "gold"], ["white", "yellow" ]],
          [ "ordinary time", "2021-01-07", "2021-02-13", ["green"], ["light green" ]],
	  [ "Transfiguration", "2021-02-14", "2021-02-16", ["white", "gold"], ["white", "yellow" ]],
          [ "Ash Wednesday", "2021-02-17", "2021-02-17", ["purple"],["gray"]],
	  [ "Lent",          "2021-02-18", "2021-03-13", ["purple"],["red violet"]],
	  [ "Laetare Sunday","2021-03-14", "2021-03-20", ["rose"],["rose"]],
	  [ "Lent",          "2021-03-21", "2021-03-27", ["purple"],["red violet"]],
	  [ "Palm Sunday"   ,"2021-03-28", "2021-03-31", ["purple"],["red"]],
	  [ "Maundy Thursday","2021-04-01","2021-04-01", ["purple"],["red"]],
	  [ "Good Friday"    ,"2021-04-02","2021-04-02", ["purple","black"],[]],
	  [ "Holy Saturday"  ,"2021-04-03","2021-04-03", [], []],
	  [ "Easter"         ,"2021-04-04","2021-04-10", ["white", "gold"], ["white", "yellow"]],
          [ "Eastertide"     ,"2021-04-11","2021-05-12", ["white", "gold"], ["red"]],
          [ "Ascension Day"  ,"2021-05-13","2021-05-13", ["white", "gold"], ["white", "yellow"]],
          [ "Eastertide"     ,"2021-05-14","2021-05-22", ["white", "gold"], ["red"]],
          [ "Pentecost"      ,"2021-05-23","2021-05-29", ["red"],["red","gold"]],
	  [ "Trinity Sunday" ,"2021-05-30","2021-06-05", ["white", "gold"], ["red"]],
	  [ "ordinary time"  ,"2021-06-06","2021-10-31", ["green"],["light green","bronze","aqua","olive"]],
	  [ "All Saints Day" ,"2021-11-01","2021-11-01", ["red"],["white","gold"]],
          [ "ordinary time"  ,"2021-11-02","2021-11-20", ["green"],["light green","bronze","aqua","olive"]],
          [ "Christ the King","2021-11-21","2021-11-27", ["white", "gold"], ["white", "yellow"]],
  ];

  year.seasons.forEach((season, index) => {
    console.log(index); console.log(season.name);
    const expectedSeason = expectedSeasons[index];

    expect(season.name).toEqual(expectedSeason[0], `${index}: Expected ${season.name} to equal ${expectedSeason[0]}`);
    expect(season.startDate).toEqual(idate(expectedSeason[1]), `${index}: Expected ${season.name} to start on ${idate(expectedSeason[1])}`);
    expect(season.endDate).toEqual(idate(expectedSeason[2]), `${index}: Expected ${season.name} to end on ${idate(expectedSeason[2])}`);
    expect(season.colors).toEqual(expectedSeason[3].map(function(color) { cal.palette.get(color) }));
    expect(season.colors).toEqual(expectedSeason[4].map(function(color) { cal.palette.get(color) }));
  });
});
