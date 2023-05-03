import React from 'react';

function Season({ season }) {
  return (
    <div>
      <h3>{season.name}</h3>
      <p>Start date: {season.startDate.toString()}</p>
      <p>End date: {season.endDate.toString()}</p>
      <div>
        {season.colors.map((color) => (
          <div
            key={color.name}
            style={{ backgroundColor: color.rgb, width: 50, height: 50 }}
          >
            <span>{color.name}</span>
          </div>
        ))}
      </div>
      {season.alternateColors && (
        <div>
          {season.alternateColors.map((color) => (
            <div
              key={color.name}
              style={{ backgroundColor: color.rgb, width: 50, height: 50 }}
            >
              <span>{color.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Season;

