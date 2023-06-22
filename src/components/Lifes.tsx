import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCount } from "../redux/slices/lifesCountSlice";
import { useSelectorDirection, useSelectorLifes } from "../redux/store";
import Input from "./common/Input";
import { InputResult } from "./common/types";
import LifeMatrix from "./LifeMatrix";
import lifesConfig from "../config/life-game-config.json";

const { minLifes, maxLifes } = lifesConfig;

const Lifes: React.FC = () => {
  const flexDirection = useSelectorDirection();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const count = useSelectorLifes();
  const dispatch = useDispatch();

  function inputSubmitFn(inputString: string): InputResult {
    const result: InputResult = {
      status: "error",
      message: `You should enter number in range ${minLifes} - ${maxLifes}`,
    };
    const number = parseInt(inputString);
    if (number >= minLifes && number <= maxLifes) {
      dispatch(setCount(number));
      setIsStarted(true);
      result.status = "success";
      result.message = "";
    }
    return result;
  }

  return (
    <section
      style={{
        display: "flex",
        flexDirection,
        alignItems: "center",
        justifyContent: "space-around",
        height: "100%",
        width: "100%",
      }}
    >
      {isStarted ? (
        Array.from({ length: count }).map(() => <LifeMatrix />)
      ) : (
        <Input
          placeholder={"Enter number of lifes"}
          type="number"
          submitFn={inputSubmitFn}
        />
      )}
    </section>
  );
};

export default Lifes;
