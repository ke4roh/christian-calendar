import React from 'react';
import Season from './Season';

function Year({ year }) {
  return (
    <div>
      <h2>{year.year - 1}—{year.year}</h2>
      {year.seasons.map((season) => (
        <Season key={season.name} season={season} />
      ))}
    </div>
  );
}

export default Year;

