import React from 'react';
import Season from './Season';

function Year({ year }) {
  return (
    <div>
      <h2>{year.year - 1}—{year.year}</h2>
      <table border="1px black">
        <tr>
          <th>primary colors</th>
          <th>dates</th>
          <th>season</th>
          <th>alternate colors</th>
        </tr>
      {year.seasons.map((season) => (
        <Season key={season.name} season={season} />
      ))}
      </table>
    </div>
  );
}

export default Year;

