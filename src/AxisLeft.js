export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) => {
    return yScale.ticks().map((tickValue) => (
        <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
            <line x2={innerWidth} stroke="lightgrey" />
            <text
                className="axis-ticks"
                key={tickValue}
                style={{ textAnchor: "end" }}
                x={-tickOffset}
                dy=".32em"
            >
                {tickValue}
            </text>
        </g>
    ));
};
