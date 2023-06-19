import { toBePartiallyChecked } from "@testing-library/jest-dom/matchers";
import React, { CSSProperties } from "react";
import css from "./Clock.module.css"

type Props = {
  time: Date;
  placeName: string;
};

const options: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  hour12: false
}

const LIGHT_COLOR = "#FFFFF7"
const DARK_COLOR = "#5A5A5A"

const Clock: React.FC<Props> = ({ time, placeName }) => {
  const hour = Number.parseInt(time.toLocaleTimeString(undefined, 
                                  { ...options, timeZone: placeName }));
  const minute = time.getMinutes();
  const second = time.getSeconds();
  const isNight = hour > 21 || hour < 6;
  const primaryColor = isNight ? LIGHT_COLOR : DARK_COLOR;
  const secondaryColor = isNight ? DARK_COLOR : LIGHT_COLOR;
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>{placeName}</p>
      <div
        style={{
          color: primaryColor,
          position: "relative",
          width: "15vh",
          height: "15vh",
          backgroundColor: secondaryColor,
          border: "1px solid black",
          borderRadius: "50%"
        }}
      >
        <span
          className={css.digit}
          style={{
            position: "absolute",
            transform: "translateX(-50%)",
            top: "0",
            left: "50%"
          }}
        >12</span>
        <span
          className={css.digit}
          style={{
            position: "absolute",
            transform: "translateY(-50%)",
            right: "0",
            top: "50%"
          }}
        >3</span>
        <span
          className={css.digit}
          style={{
            position: "absolute",
            transform: "translateX(-50%)",
            bottom: "0",
            left: "50%"
          }}
        >6</span>
        <span
          className={css.digit}
          style={{
            position: "absolute",
            transform: "translateY(-50%)",
            top: "50%",
            left: "0"
          }}
        >9</span>
        <div
          className={css.arrow}
          style={{
            height: "30%",
            width: "2px",
            position: "absolute",
            transformOrigin: "top",
            transform: `rotate(${(hour * 30 + Math.floor(minute / 2)) - 180}deg)`,
            left: "50%",
            top: "50%",
            backgroundColor: primaryColor
          }}
        ></div>
        <div
          className={css.arrow}
          style={{
            height: "40%",
            width: "2px",
            transform: `rotate(${(time.getMinutes() * 6) - 180}deg)`,
            backgroundColor: primaryColor
          }}
        ></div>
        <div 
          className={css.arrow}
          style={{
            height: "45%",
            width: "1px",
            transform: `rotate(${(second * 6) - 180}deg)`,
            backgroundColor: "red"
          }}
        ></div>
      </div>
    </div>
  );
};

export default Clock;
