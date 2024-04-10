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
                            This dashboard allows you to explore for yourself
                            how temperatures are rising across Australia as a
                            result of climate change. <br />
                            <br />
                            Use the map to examine how much the average
                            temperature has increased at 112 research cites
                            across the nation. Hover for info and click to drill
                            down further into that location by discovering which
                            seasons contribute the most to the change, and which
                            years or periods have seen the largest or smallest
                            changes. <br />
                            <br />
                            Data was collected from the Australia Bureau of
                            Meteorology's{" "}
                            <em>
                                Australia Climate Observations Reference Network
                                - Surface Air Temperature (ACORN-SAT)
                            </em>{" "}
                            network, which has over 100 years of temperature
                            records. Data is available for download via{" "}
                            <a href="ftp://ftp.bom.gov.au/anon/home/ncc/www/change/ACORN_SAT_daily/ ">
                                FTP
                            </a>
                            . Python was used for data wrangling and quality
                            assurance, React and D3JS were used in dashboard
                            creation.
                        </div>
                    </foreignObject>
                </g>
            </svg>
        </div>
    </div>
);

export default ControlsAndInfo;
