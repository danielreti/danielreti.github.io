export const OrdinalBottomAxis = ({ xScale, innerHeight, tickOffset = 3 }) =>
    xScale.domain().map((tickValue) => (
        <g className="tick" key={tickValue}>
            <line y2={innerHeight} />
            <text
                className="axis-ticks"
                style={{ textAnchor: "middle", fontSize: 20 }}
                dy=".71em"
                y={innerHeight + tickOffset}
                x={xScale(tickValue) + xScale.bandwidth() / 2}
            >
                {tickValue.replace(
                    /(^\w|\s\w)(\S*)/g,
                    (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
                )}
            </text>
        </g>
    ));
