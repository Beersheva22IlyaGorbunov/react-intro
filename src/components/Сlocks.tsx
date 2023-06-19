import React, { CSSProperties, useEffect, useState } from "react";
import { updateCaseBlock } from "typescript";
import timeZonesData, {
  TimeZone,
} from "../mock/time-zones";
import InputResult from "../model/common/InputResultType";
import Clock from "./Clock";
import Input from "./common/Input";

const Сlocks = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [timeZones, setTimeZones] = useState<TimeZone[]>([]);
  const timeZonesRequests = ["Vladivostok", "Israel", "London", "Berlin", "Moscow", "Paris", "Madrid"];

  const style: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    height: "100vh"
  };

  function updateClock(index: number, newZone: TimeZone): void {
    setTimeZones([...timeZones.slice(0, index), newZone, ...timeZones.slice(index + 1)])
  }

  useEffect(() => {
    const timeZonesFound = timeZonesRequests
      .reduce((accum: TimeZone[], timeZoneReq) => {
          const filteredTimeZones = getTimezones(timeZoneReq);
          return filteredTimeZones.length === 0 ? accum : [...accum, filteredTimeZones[0]]
      }, []);
    setTimeZones(timeZonesFound);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={style}>
      {timeZones.map((timeZone, index) => {
        return (
          <div 
            key={index}
            style={{
              width: "50vw",
              boxSizing: "border-box",
              maxHeight: "50vh",
              border: "solid black",
              borderWidth: "0 1px 1px 0",
              padding: ".5rem"
            }}
          >
            <Clock 
              time={time} 
              placeName={timeZone.name} 
            />
            <Input 
              placeholder={'Enter timezone name'} 
              submitFn={(inputText: string): InputResult => {
                let res: InputResult | undefined = undefined
                const foundZones = getTimezones(inputText);
                if (foundZones.length === 1) {
                  res = {
                    status: "success",
                    message: `Found zone ${foundZones[0].name}`
                  };
                  updateClock(index, foundZones[0]);
                } else if (foundZones.length > 1) {
                  res = {
                    status: "warning",
                    message: "Found more than one timezone"
                  }
                  updateClock(index, foundZones[0]);
                } else {
                  res = {
                    status: "error",
                    message: "Can't find such timezone"
                  }
                }
                return res;
              }} 
            />
          </div>
        );
      })}
    </div>
  );
};

export default Сlocks;

function getTimezones(timezoneReq: string): TimeZone[] {
  return timeZonesData.filter((timeZoneData) => 
    JSON.stringify(timeZoneData).toLowerCase().includes(timezoneReq.toLowerCase())
  );
}
