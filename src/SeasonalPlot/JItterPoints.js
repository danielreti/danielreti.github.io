import { Popup } from "semantic-ui-react";

const fill = {
    Summer: "#e1b0c6",
    Autumn: "#36450e",
    Winter: "#005e72",
    Spring: "#ffb713",
};

export const JitterPoints = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    tooltipFormat,
    circleRadius,
    jitterWidth,
    city,
    setCity,
    setSeason,
}) =>
    data.map((d, i) => (
        <Popup
            key={i}
            trigger={
                <circle
                    className="mark"
                    cx={
                        xScale(xValue(d)) +
                        xScale.bandwidth() / 2 +
                        d.jitter * jitterWidth
                    }
                    cy={yScale(yValue(d))}
                    r={circleRadius}
                    fillOpacity={0.5}
                    fill={fill[xValue(d)]}
                    stroke={d.city === city ? "red" : null}
                    strokeWidth={3}
                    onClick={() => {
                        setCity(d.city);
                        setSeason(d.season);
                    }}
                    cursor="pointer"
                />
            }
            content={d.city}
            size="small"
            position="top center"
            style={{ whiteSpace: "break-spaces" }}
        />
    ));
