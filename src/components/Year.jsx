import React from 'react';
import Season from './Season';

function Year({ year }) {
  return (
    <div className={"year-container"}>
      <div className={"year-metadata"}>
        <div className={"year-title-container"}>
          <h1>Colors of the Church Year</h1>
          <h2>and Seasonal Dates, {year.year}</h2>
        </div>
        <p>The Dates below are for the Church Year {year.year},
          Year {year.rclYear} of the <a href="https://lectionary.library.vanderbilt.edu/">Revised Common Lectionary</a> and
          Year {year.dailyOfficeYear} of the <a href="https://www.bcponline.org/DailyOffice/">Daily Office of the Book of
            Common Prayer</a>, beginning with
          the First Sunday of Advent, {year.year - 1}.</p>
        <table border="1px black" className={"seasons-table"}>
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
        <p>Many thanks to Dennis Bratcher for his <a href="http://www.crivoice.org/colorsof.html">Colors of the Church Year</a> page
          which served as one of several inputs to this effort.</p>
        <p>For more information about the Christian Calendar, see Wikipedia's
          <a href="https://en.wikipedia.org/wiki/Christian_calendar">Christian Calendar</a> page.</p>
        <p>The source code for this perpetual calendar can be found on
          <a href="https://github.com/ke4roh/christian-calendar">Github</a>.</p>
      </div>
    </div>
  );
}

export default Year;

