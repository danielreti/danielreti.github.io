import React from "react";
import { csv, scaleLinear, extent, timeParse } from "d3";
import { linearRegression, linearRegressionLine } from "simple-statistics";
import "./App.css";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

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

const seasonalMeanUrl =
    "https://gist.githubusercontent.com/danielreti/ae9e9942a40fda9cc5fd82c8033e266a/raw/8b1ce73b2315cbd9d6d1f265cffb15a169ccb55c/seasonalMean.csv";
const monthFromSeason = {
    Summer: "December",
    Autumn: "March",
    Winter: "June",
    Spring: "September",
};

const parseDate = timeParse("%d %B %Y");

const Scatterplot = ({ city, season }) => {
    const [fullData, setFullData] = React.useState(null);
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        const row = (d) => {
            const dateInfo = d.Date.split("-");
            const createDate = `1 ${monthFromSeason[dateInfo[1]]} ${
                dateInfo[0]
            }`;
            d.time = parseDate(createDate);
            d.season = dateInfo[1];
            d.year = +dateInfo[0];
            return d;
        };
        csv(seasonalMeanUrl, row).then((data) => setFullData(data));
    }, []);

    React.useEffect(() => {
        if (!fullData) return;
        setData(fullData.filter((v) => v.season === season && v[city]));
    }, [fullData, season, city]);

    if (!fullData || !data) {
        return <pre>Loading...</pre>;
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xAxisLabel = "Year";
    const yAxisLabel = "Mean Temperature (°C)";

    const yValue = (d) => +d[city];
    const xValue = (d) => d["year"];

    const xScale = scaleLinear()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    const line = linearRegression(data.map((d) => [+d["year"], +d[city]]));
    const regressionLine = linearRegressionLine(line);

    return (
        <div className="svg-container">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid"
                className="svg-content"
            >
                <text className="title" x={10} y={40}>
                    {`Average yearly ${season.toLowerCase()} temperature at `}
                    <tspan fontWeight="bold">
                        {city.replace(
                            /(^\w|\s\w)(\S*)/g,
                            (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
                        )}
                    </tspan>
                </text>
                <text className="subtitle" x={10} y={70}>
                    {
                        "Measured daily and averaged over the 3 months of the season"
                    }
                </text>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <AxisBottom
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
                    <line
                        x1={xScale(xValue(data[0]))}
                        x2={xScale(xValue(data.slice(-1)[0]))}
                        y1={yScale(regressionLine(xValue(data[0])))}
                        y2={yScale(regressionLine(xValue(data.slice(-1)[0])))}
                        stroke="red"
                        strokeWidth={3}
                    />
                    <Marks
                        data={data.filter((v) => v.season === season)}
                        xScale={xScale}
                        yScale={yScale}
                        xValue={xValue}
                        yValue={yValue}
                        circleRadius={7}
                    />
                    <foreignObject
                        x="10"
                        y="10"
                        width="210"
                        height="20"
                        style={{ fontFamily: "Roboto", fontSize: 16 }}
                    >
                        <div style={{ backgroundColor: "lightgrey" }}>
                            <b>Rate:</b> {line.m > 0 ? "+" : ""}
                            {Math.round(line.m * 10000) / 100}°C per 100 years{" "}
                        </div>
                    </foreignObject>
                </g>
            </svg>
        </div>
    );
};

export default Scatterplot;
