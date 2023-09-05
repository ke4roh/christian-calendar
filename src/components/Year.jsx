import React from 'react';
import Season from './Season';

function Year({ year }) {
  return (
    <div>
      <h2>Colors of the Church Year<br/>
      and Seasonal Dates, {year.year}</h2>
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
    </div>
  );
}

export default Year;

