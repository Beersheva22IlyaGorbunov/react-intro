import { Observable } from "rxjs";
import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJWT";
import EmployeesService from "./EmployeesService";
import { HttpRequest } from "./types";

export default class EmployeesServiceRest implements EmployeesService {
  constructor(private url: string) {}

  getEmployees(): Observable<Employee[] | string> {
    return new Observable((subscriber) => {
      this.sendRequest("GET", "")
        .then((employees: Employee[]) => {
          subscriber.next(employees.map((empl) => ({...empl, birthDate: new Date(empl.birthDate)})));
        })
        .catch((err) => {
          if (err instanceof Error) {
            subscriber.next("Server is unavailable, repeat later");
          } else if (typeof err === "string") {
            subscriber.next(err);
          }
        })
    });
  }

  addEmployee(employee: Employee): Promise<Employee> {
    return this.sendRequest(
      "POST",
      "",
      JSON.stringify({
        ...employee,
        userId: "admin",
      })
    );
  }

  private async sendRequest(
    method: HttpRequest,
    path: string,
    body?: string
  ): Promise<any> {
    const token = window.localStorage.getItem(AUTH_DATA_JWT);
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(this.url + path, {
      method,
      headers,
      body,
    });
    if (!response.ok) {
      const { status, statusText } = response;
      throw status === 401 || status === 403 ? "Authentication" : statusText;
    }
    return response.json();
  }
}
