import { Popup } from "semantic-ui-react";

export const Marks = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    tooltipFormat,
    circleRadius,
}) =>
    data.map((d, i) => (
        <Popup
            key={i}
            trigger={
                <circle
                    className="mark"
                    cx={xScale(xValue(d))}
                    cy={yScale(yValue(d))}
                    r={circleRadius}
                    fill="grey"
                    stroke="black"
                    strokeWidth={2}
                />
            }
            content={`${xValue(d)}\n${Math.round(yValue(d) * 100) / 100}°C `}
            size="small"
            position="top center"
            style={{ whiteSpace: "break-spaces" }}
        />
    ));
