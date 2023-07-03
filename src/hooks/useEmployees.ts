import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { employeesService } from "../config/service-config";
import CodeType from "../model/CodeType";
import Employee from "../model/Employee";
import { codeActions } from "../redux/slices/CodeSlice";

const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = employeesService.getEmployees().subscribe({
      next(res: Employee[] | string) {
        if (typeof res === "string") {
          if (res.includes("Authentication")) {
            dispatch(codeActions.set({codeMsg: {code: CodeType.AUTH_ERROR, message: "Can't recognize you, you need to login"}}))
          } else {
            dispatch(codeActions.set({codeMsg: {code: CodeType.SERVER_ERROR, message: res}}))
          }
        } else {
          setEmployees(res);
        }
      },
    });
    return () => subscription.unsubscribe();
  }, []);
  return employees;
}

export default useEmployees;
