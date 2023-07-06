import { useDispatch } from "react-redux";
import CodeType from "../model/CodeType";

const useCodeTypeDispatch = () => {
  const dispatch = useDispatch();

  function processResponse(success: boolean, successMsg: string, response?: any) {
    const codeMessage = success ? {
      code: CodeType.OK,
      message: successMsg
    } : {
      code: CodeType.UNKNOWN,
      message: "",
    };
    if (response === "Authentication") {
      
    }
  }

  return processResponse;
}

export default useCodeTypeDispatch;