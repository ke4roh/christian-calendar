import React from 'react';
import Color from './Color';

function Season({ season }) {
  const startDate = season.startDate.toString()
  const endDate = season.endDate.toString()
  const date = startDate === endDate ? startDate : `${startDate} - ${endDate}`
  return (
    <tr>
      <td>
        {season.colors.map((color, index) => (
            <Color key={`${startDate}-${color}-${index}`} color={color} />
        ))}
      </td>
      <td>{date}</td>
      <td>{season.name}</td>
      <td>
        {season.alternateColors.map((color, index) => (
            <Color key={`${startDate}-alt-${color}-${index}`} color={color} />
        ))}
      </td>
    </tr>
  );
}

export default Season;

