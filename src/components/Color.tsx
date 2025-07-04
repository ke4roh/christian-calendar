import React, { useState } from "react";
import { Tooltip } from "react-tooltip"; // Make sure this import is correct.
import { v4 as uuid } from 'uuid';
import type ChristianCalendar from '../libs/christian-calendar';
const AnyTooltip: any = Tooltip;

interface ColorProps {
  color: ChristianCalendar.Color;
}
const Color: React.FC<ColorProps> = ({ color }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipId = React.useMemo(() => `${uuid()}-color-tooltip`, []); // Ensures the ID doesn't change on every render.

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
      <div style={{
        display: 'inline-block',
        marginRight: 5,
        border: "1px solid black"
      }}>
        <div
            role={"img"}
            aria-label={color.name}
            style={{
              backgroundColor: color.rgb,
              width: 20,
              height: 20,
              cursor: "pointer",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-tooltip-id={tooltipId}
            data-tooltip-content={color.name}
        >&nbsp;
        </div>
        <AnyTooltip
            id={tooltipId}
            place="top"
            clickable={false}
            visible={isTooltipVisible}
        />
      </div>
  );
};

export default Color;
