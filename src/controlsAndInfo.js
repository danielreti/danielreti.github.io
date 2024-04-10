const ControlsAndInfo = ({ season, city, setCity, setSeason }) => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
            <svg
                viewBox={`0 0 ${800} ${800}`}
                preserveAspectRatio="xMidYMid"
                className="svg-content"
            >
                <g transform={`translate(${30},0)`}>
                    <text
                        className="title"
                        x={10}
                        y={40}
                    >{`An Australian Climate Change Study`}</text>
                    <text className="subtitle" x={10} y={70}>
                        {"Exploring nationwide rising temperatures"}
                    </text>
                </g>
                <g transform={`translate(40,100)`}>
                    <foreignObject
                        x="0"
                        y="0"
                        width="720"
                        height="500"
                        style={{ fontFamily: "Roboto", fontSize: 16 }}
                    >
                        <div>
                            This dashboard allows you to explore firsthand how
                            temperatures are rising across Australia due to
                            climate change. <br />
                            <br />
                            You can use the map to investigate the extent of the
                            average temperature increase at 112 research cites
                            across the nation. Simply hover over a location for
                            more information and click to delve deeper into that
                            specific area. Disover which seasons are
                            contributing the most to the temperature change, and
                            explore which years or periods have experienced the
                            greatest or smallest changes.
                            <br />
                            <br />
                            The data was gathered from the Australia Bureau of
                            Meteorology's{" "}
                            <em>
                                Australia Climate Observations Reference Network
                                - Surface Air Temperature (ACORN-SAT)
                            </em>{" "}
                            network, which holds over 100 years of temperature
                            records. This data can be downloaded via{" "}
                            <a href="ftp://ftp.bom.gov.au/anon/home/ncc/www/change/ACORN_SAT_daily/ ">
                                FTP
                            </a>
                            . Python was utilised for data wrangling and quality
                            assurance, while React and D3JS were employed in the
                            creation of the dashboard.
                        </div>
                    </foreignObject>
                </g>
            </svg>
        </div>
    </div>
);

export default ControlsAndInfo;
