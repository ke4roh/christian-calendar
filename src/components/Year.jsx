import React from 'react';
import Season from './Season';

function Year({ year }) {
  return (
    <div>
      <h2>{year.year - 1}—{year.year}</h2>
      <table border="1px black">
        <thead>
        <tr>
          <th>primary colors</th>
          <th>dates</th>
          <th>season</th>
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

