import React from 'react';
import Season from './Season';

function Year({ year }) {
  return (
    <div>
      <h1>Colors of the Church Year</h1>
      <h2>and Seasonal Dates, {year.year}</h2>
      <p>The Dates below are for the Church Year {year.year},
        Year {year.rclYear} of the Revised Common Lectionary and
        Year {year.dailyOfficeYear} of the Daily Office of the Book of
        Common Prayer, beginning with
        the First Sunday of Advent, {year.year - 1}.</p>
      <table border="1px black">
        <thead>
        <tr>
          <th>primary colors</th>
          <th>season</th>
          <th>dates</th>
          <th>alternate colors</th>
        </tr>
        </thead>
        <tbody>
      {year.seasons.map((season, index) => (
        <Season key={`${season.name}-${index}`} season={season} />
      ))}
        </tbody>
      </table>
      Many thanks to Dennis Bratcher for his <a href="http://www.crivoice.org/colorsof.html">Colors of the Church Year</a> page
      which served as one of several inputs to this effort.
    </div>
  );
}

export default Year;

