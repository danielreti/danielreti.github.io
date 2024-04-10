export const Boxplot = ({ data, xScale, yScale, xValue, yValue }) =>
    data.map((item) => (
        <g>
            <line
                x1={xScale(item.season) + xScale.bandwidth() / 2}
                x2={xScale(item.season) + xScale.bandwidth() / 2}
                y1={yScale(item.minimum)}
                y2={yScale(item.maximum)}
                stroke="black"
                strokeWidth={3}
            />
            <rect
                x={xScale(item.season) + (xScale.bandwidth() * 7) / 16}
                y={yScale(item.q3)}
                height={yScale(item.q1) - yScale(item.q3)}
                width={xScale.bandwidth() / 8}
                style={{ stroke: "black", fill: "white" }}
                strokeWidth={3}
            />
            <line
                x1={xScale(item.season) + (xScale.bandwidth() * 7) / 16}
                x2={xScale(item.season) + (xScale.bandwidth() * 9) / 16}
                y1={yScale(item.median)}
                y2={yScale(item.median)}
                stroke="black"
                strokeWidth={3}
            />
            <line
                x1={xScale(item.season) + (xScale.bandwidth() * 7) / 16}
                x2={xScale(item.season) + (xScale.bandwidth() * 9) / 16}
                y1={yScale(item.q1)}
                y2={yScale(item.q1)}
                stroke="black"
                strokeWidth={3}
            />
            <line
                x1={xScale(item.season) + (xScale.bandwidth() * 7) / 16}
                x2={xScale(item.season) + (xScale.bandwidth() * 9) / 16}
                y1={yScale(item.q3)}
                y2={yScale(item.q3)}
                stroke="black"
                strokeWidth={3}
            />
        </g>
    ));
