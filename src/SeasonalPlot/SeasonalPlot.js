import React from "react";
import { csv, scaleLinear, extent, scaleBand, ascending, quantile } from "d3";
import { OrdinalBottomAxis } from "./OrdinalBottomAxis";
import { AxisLeft } from "../AxisLeft";
import { JitterPoints } from "./JItterPoints";
import { Boxplot } from "./Boxplot";

const width = 1500;
const height = 550;
const margin = {
    top: 90,
    right: 30,
    bottom: 65,
    left: 90,
};
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const seasons = ["Summer", "Autumn", "Winter", "Spring"];

const seasonalSteepnessURL =
    "https://gist.githubusercontent.com/danielreti/431875322a98a2f0d2a25e0afdc66faa/raw/550154cf38689288908fb01f84cd3dcb86ddf6ae/citySteepness.txt";

const SeasonalPlot = ({ city, setCity, setSeason }) => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        const row = (d) => {
            d.Summer = +d.Summer;
            d.Autumn = +d.Autumn;
            d.Winter = +d.Winter;
            d.Spring = +d.Spring;
            return d;
        };
        csv(seasonalSteepnessURL, row).then((data) => {
            setData(
                data
                    .map((c) =>
                        seasons.map((season) => ({
                            city: c.CITY,
                            season: season,
                            change: c[season] * 100,
                            jitter: Math.random() * 2 - 1,
                        }))
                    )
                    .flat()
            );
        });
    }, []);

    if (!data) {
        return <pre>Loading...</pre>;
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xAxisLabel = "Season";
    const yAxisLabel = "Temperature Increase (°C)";

    const xValue = (d) => d.season;
    const yValue = (d) => d.change;

    const xScale = scaleBand().domain(seasons).range([0, innerWidth]);
    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    const jitterWidth = xScale.bandwidth() / 2 - 20;

    const boxplotStats = seasons.map((season) => {
        const item = data
            .filter((d) => d.season === season)
            .map((d) => d.change);

        const q1 = quantile(item.sort(ascending), 0.25);
        const median = quantile(item.sort(ascending), 0.5);
        const q3 = quantile(item.sort(ascending), 0.75);
        const interQuantileRange = q3 - q1;
        const minimum = q1 - 1.5 * interQuantileRange;
        const maximum = q3 + 1.5 * interQuantileRange;
        return {
            season,
            q1,
            median,
            q3,
            interQuantileRange,
            minimum,
            maximum,
        };
    });

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid"
            className="svg-content"
        >
            <text
                className="title"
                x={10}
                y={40}
            >{`Change in average seasonal temperatures over 100 years`}</text>
            <text className="subtitle" x={10} y={70}>
                {"Measured at 112 sites across Australia"}
            </text>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <OrdinalBottomAxis
                    xScale={xScale}
                    innerHeight={innerHeight}
                    tickOffset={5}
                />
                <text
                    className="axis-label"
                    textAnchor="middle"
                    transform={`translate(${-yAxisLabelOffset},${
                        innerHeight / 2
                    }) rotate(-90)`}
                >
                    {yAxisLabel}
                </text>
                <AxisLeft
                    yScale={yScale}
                    innerWidth={innerWidth}
                    tickOffset={5}
                />
                <text
                    className="axis-label"
                    x={innerWidth / 2}
                    y={innerHeight + xAxisLabelOffset}
                    textAnchor="middle"
                >
                    {xAxisLabel}
                </text>
                <Boxplot
                    data={boxplotStats}
                    xScale={xScale}
                    yScale={yScale}
                    xValue={xValue}
                    yValue={yValue}
                />
                <JitterPoints
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                    xValue={xValue}
                    yValue={yValue}
                    circleRadius={10}
                    jitterWidth={jitterWidth}
                    city={city}
                    setCity={setCity}
                    setSeason={setSeason}
                />
                <line
                    y1={yScale(0)}
                    y2={yScale(0)}
                    x2={innerWidth}
                    stroke="red"
                    strokeWidth={3}
                />
            </g>
        </svg>
    );
};

export default SeasonalPlot;
