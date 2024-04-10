import React from "react";
import Scatterplot from "./Scatterplot";
import SeasonalPlot from "./SeasonalPlot/SeasonalPlot";
import MapPlot from "./MapPlot/MapPlot";
import ControlsAndInfo from "./controlsAndInfo";
import { Dropdown } from "semantic-ui-react";

const cities = [
    "ALBANY AIRPORT",
    "ROBE",
    "CAMOOWEAL TOWNSHIP",
    "SCONE AIRPORT AWS",
    "KARIJINI NORTH",
    "COFFS HARBOUR AIRPORT",
    "WOOMERA AERODROME",
    "BUNDABERG AERO",
    "POINT PERPENDICULAR AWS",
    "LEARMONTH AIRPORT",
    "RICHMOND RAAF",
    "DALWALLINU",
    "LONGREACH AERO",
    "RABBIT FLAT",
    "COBAR MO",
    "OODNADATTA AIRPORT",
    "EAST SALE",
    "TARCOOLA AERO",
    "TENNANT CREEK AIRPORT",
    "PERTH AIRPORT",
    "BRISBANE AERO",
    "ALICE SPRINGS AIRPORT",
    "MILDURA AIRPORT",
    "NOWRA RAN AIR STATION AWS",
    "GERALDTON AIRPORT",
    "ORBOST",
    "PORT HEDLAND AIRPORT",
    "WEIPA AERO",
    "AMBERLEY AMO",
    "BUTLERS GORGE",
    "CAPE LEEUWIN",
    "MOREE AERO",
    "WALGETT AIRPORT AWS",
    "ESPERANCE",
    "LARAPUNA (EDDYSTONE POINT)",
    "NURIOOTPA PIRSA",
    "PORT LINCOLN AWS",
    "CHARLEVILLE AERO",
    "CARNARVON AIRPORT",
    "ST GEORGE AIRPORT",
    "BIRDSVILLE AIRPORT",
    "DENILIQUIN AIRPORT AWS",
    "MORAWA AIRPORT",
    "TIBOOBURRA AIRPORT",
    "CABRAMURRA SMHEA AWS",
    "MOUNT GAMBIER AERO",
    "CAIRNS AERO",
    "LAUNCESTON AIRPORT",
    "BATHURST AGRICULTURAL STATION",
    "PALMERVILLE",
    "MERREDIN",
    "NHILL AERODROME",
    "GABO ISLAND LIGHTHOUSE",
    "GUNNEDAH RESOURCE CENTRE",
    "GILES METEOROLOGICAL OFFICE",
    "MELBOURNE (OLYMPIC PARK)",
    "LOW HEAD",
    "WILSONS PROMONTORY LIGHTHOUSE",
    "KALGOORLIE-BOULDER AIRPORT",
    "INVERELL (RAGLAN ST)",
    "ADELAIDE (WEST TERRACE / NGAYIRDAPIRA)",
    "CAPE BORDA",
    "RICHMOND AIRPORT",
    "RUTHERGLEN RESEARCH",
    "HORN ISLAND",
    "BROOME AIRPORT",
    "CAPE OTWAY LIGHTHOUSE",
    "GROVE (RESEARCH STATION)",
    "EUCLA",
    "WILCANNIA AERODROME AWS",
    "LAVERTON RAAF",
    "MORUYA HEADS PILOT STATION",
    "BRIDGETOWN",
    "WANDERING",
    "MARREE AERO",
    "CANBERRA AIRPORT",
    "SYDNEY (OBSERVATORY HILL)",
    "KALUMBURU",
    "KERANG",
    "CUNDERDIN AIRFIELD",
    "BOURKE AIRPORT AWS",
    "VICTORIA RIVER DOWNS",
    "HALLS CREEK AIRPORT",
    "WEST WYALONG AIRPORT AWS",
    "MACKAY M.O",
    "WAGGA WAGGA AMO",
    "CAPE MORETON LIGHTHOUSE",
    "YAMBA PILOT STATION",
    "MARBLE BAR",
    "CEDUNA AMO",
    "PORT MACQUARIE AIRPORT AWS",
    "THARGOMINDAH AIRPORT",
    "KYANCUTTA",
    "TOWNSVILLE AERO",
    "DUBBO AIRPORT AWS",
    "CAPE BRUNY (CAPE BRUNY)",
    "KATANNING",
    "GAYNDAH AIRPORT",
    "WILLIAMTOWN RAAF",
    "BARCALDINE POST OFFICE",
    "MEEKATHARRA AIRPORT",
    "MILES CONSTANCE STREET",
    "BURKETOWN AIRPORT",
    "FORREST",
    "NORMANTON AIRPORT",
    "CHARTERS TOWERS AIRPORT",
    "HOBART (ELLERSLIE ROAD)",
    "DARWIN AIRPORT",
    "GEORGETOWN AIRPORT",
    "BOULIA AIRPORT",
    "ROCKHAMPTON AERO",
    "RAYVILLE PARK",
];

function App() {
    const [city, setCity] = React.useState("ORBOST");
    const [season, setSeason] = React.useState("Winter");
    return (
        <div className="parent">
            <div className="svg-container map">
                <MapPlot city={city} setCity={setCity} />
            </div>
            <div className="svg-container season">
                <SeasonalPlot
                    city={city}
                    setCity={setCity}
                    setSeason={setSeason}
                />
            </div>
            <div className="svg-container years">
                <Scatterplot city={city} season={season} />
            </div>
            <div className="svg-container info">
                <ControlsAndInfo
                    city={city}
                    season={season}
                    setCity={setCity}
                    setSeason={setSeason}
                />
            </div>
            <div className="controls">
                <div className="ui form small">
                    <span>
                        Location: {"  "}
                        <Dropdown
                            selection
                            options={cities
                                .sort()
                                .map((l) => ({ key: l, text: l, value: l }))}
                            value={city}
                            onChange={(e, d) => {
                                setCity(d.value);
                            }}
                        />
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span>
                        Season: {"  "}
                        <Dropdown
                            selection
                            options={[
                                "Summer",
                                "Autumn",
                                "Winter",
                                "Spring",
                            ].map((l) => ({
                                key: l,
                                text: l,
                                value: l,
                            }))}
                            value={season}
                            onChange={(e, d) => {
                                setSeason(d.value);
                            }}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default App;
