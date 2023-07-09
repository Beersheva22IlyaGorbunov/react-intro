import { useEffect, useState } from "react";
import { employeesService } from "../config/service-config";
import Employee from "../model/Employee";
import useCodeTypeDispatch from "./useCodeTypeDispatch";

const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const dispatchCode = useCodeTypeDispatch();

  useEffect(() => {
    const subscription = employeesService.getEmployees().subscribe({
      next(res: Employee[] | string) {
        let error = ''
        if (typeof res === "string") {
          error = res;
        } else {
          setEmployees(res);
        }
        dispatchCode("", error);
      },
    });
    return () => subscription.unsubscribe();
  }, []);
  return employees;
};

export default useEmployees;
