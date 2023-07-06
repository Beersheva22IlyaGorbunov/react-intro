import { Observable } from "rxjs";
import Employee from "../model/Employee";

export default interface EmployeesService {
  addEmployee(employee: Employee): Promise<Employee>;
  deleteEmployee(employeeId: any): Promise<void>;
  updateEmployee(updatedEmployee: Employee): Promise<Employee>;
  getEmployees(): Observable<Employee[] | string>;
}