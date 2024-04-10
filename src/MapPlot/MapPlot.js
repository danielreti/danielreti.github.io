import React from "react";
import {
    geoMercator,
    geoPath,
    json,
    csv,
    scaleLog,
    extent,
    scaleLinear,
    max,
} from "d3";
import { Popup } from "semantic-ui-react";
const width = 1000;
const height = 1000;

const australiaMapJSON =
    "https://raw.githubusercontent.com/nikkisharma536/map_visualization_d3js/master/aust.json";
const locationCoordsURL =
    "https://gist.githubusercontent.com/danielreti/92362782f0ed86078f8696a72ba5df5d/raw/f11b35793b1a1df5caf1e0c059e33d804b5c2534/LocationInfo.csv";

const MapPlot = ({ city, setCity }) => {
    const [australiaData, setAustraliaData] = React.useState(null);
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        json(australiaMapJSON).then(setAustraliaData);
        const row = (d) => {
            d.LATITUDE = +d.LATITUDE;
            d.LONGITUDE = +d.LONGITUDE;
            d.AVERAGE = +d.AVERAGE;
            return d;
        };
        csv(locationCoordsURL, row).then(setData);
    }, []);

    if (!australiaData && !data) {
        return <pre>Loading...</pre>;
    }

    const radiusScale = scaleLog()
        .domain(extent(data, (d) => Math.abs(d.AVERAGE)))
        .range([1, 10]);

    const colourScale = scaleLinear()
        .domain([-max(data, (d) => d.AVERAGE), max(data, (d) => d.AVERAGE)])
        .range(["blue", "red"]);

    const projection = geoMercator()
        .center([132, -32])
        .translate([width / 2, height / 2])
        .scale(1000);
    const path = geoPath().projection(projection);

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid"
            className="svg-content"
        >
            <text
                className="title"
                x={30}
                y={40}
            >{`Temperature Change between 1924 and 2024`}</text>
            <text className="subtitle" x={30} y={70}>
                {"A depiction of change in average yearly temperature"}
            </text>
            <path d={path(australiaData)} fill="lightgrey" stroke="black" />
            {data.map((point, i) => {
                const coordinates = projection([
                    point.LONGITUDE,
                    point.LATITUDE,
                ]);
                return (
                    <Popup
                        key={i}
                        trigger={
                            <circle
                                cx={coordinates[0]}
                                cy={coordinates[1]}
                                r={radiusScale(Math.abs(point.AVERAGE))}
                                stroke={
                                    city === point.LOCATION ? "yellow" : "black"
                                }
                                strokeWidth={city === point.LOCATION ? 5 : 1}
                                fill={colourScale(point.AVERAGE)}
                                fillOpacity={0.5}
                                onClick={() => setCity(point.LOCATION)}
                                cursor="pointer"
                            />
                        }
                        content={`${point.LOCATION.replace(
                            /(^\w|\s\w)(\S*)/g,
                            (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
                        )}\n${point.AVERAGE > 0 ? "+" : ""}${
                            Math.round(point.AVERAGE * 100) / 100
                        }°C `}
                        size="small"
                        position="top center"
                        style={{ whiteSpace: "break-spaces" }}
                    />
                );
            })}
        </svg>
    );
};

export default MapPlot;
