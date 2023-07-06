import { Observable, Subscriber } from "rxjs";
import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJWT";
import EmployeesService from "./EmployeesService";
import { HttpRequest } from "./types";

const pollingInterval = 2000;

class Cache {
  cacheString: string = "";

  set(employees: Employee[]): void {
    this.cacheString = JSON.stringify(employees);
  }
  get(): Employee[] {
    const employees = this.isEmpty() ? [] : JSON.parse(this.cacheString);
    return (
      employees &&
      employees.map((empl: any) => ({
        ...empl,
        birthDate: new Date(empl.birthDate),
      }))
    );
  }
  reset(): void {
    this.cacheString = "";
  }
  isEqual(employees: Employee[]): boolean {
    return this.cacheString === JSON.stringify(employees);
  }
  isEmpty(): boolean {
    return this.cacheString.length === 0;
  }
}

export default class EmployeesServiceRest implements EmployeesService {
  private observable: Observable<Employee[] | string> | null = null;
  private cache: Cache = new Cache();
  constructor(private url: string) {};


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

  async updateEmployee(updatedEmployee: Employee): Promise<Employee> {
    await this.sendRequest("GET", `/${updatedEmployee.id}`);
    return this.sendRequest(
      "PUT",
      `/${updatedEmployee.id}`,
      JSON.stringify(updatedEmployee)
    );
  }

  async deleteEmployee(employeeId: any): Promise<void> {
    await this.sendRequest("GET", `/${employeeId}`);
    this.sendRequest("DELETE", `/${employeeId}`);
  }

  getEmployees(): Observable<Employee[] | string> {
    if (this.observable === null) {
      this.observable = new Observable((subscriber) => {
        if (this.cache.isEmpty()) {
          this.fetchEmployeesToSubscriber(subscriber);
        } else {
          const cachedEmployees = this.cache.get();
          subscriber.next(cachedEmployees);
          console.log(
            `Restored from cache ${cachedEmployees.length} employees`
          );
        }
        const intervalId = setInterval(
          () => this.fetchEmployeesToSubscriber(subscriber),
          pollingInterval
        );
        return () => clearInterval(intervalId);
      });
    }
    return this.observable;
  }

  private async fetchEmployeesToSubscriber(
    subscriber: Subscriber<Employee[] | string>
  ): Promise<void> {
    try {
      const employees: Employee[] = await this.fetchEmployees();
      if (!this.cache.isEqual(employees)) {
        subscriber.next(employees);
        this.cache.set(employees);
        console.log(`Fetched new data with ${employees.length} employees`);
      } else {
        console.log(`Data has not been changed`);
      }
    } catch (err) {
      subscriber.next(err as string);
    }
  }

  private async fetchEmployees(): Promise<Employee[]> {
    const employees = await this.sendRequest("GET", "");
    return employees.map((empl: Employee) => ({
      ...empl,
      birthDate: new Date(empl.birthDate),
    }));
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
    try {
      const response = await fetch(this.url + path, {
        method,
        headers,
        body,
      });
      console.log(response);
      if (!response.ok) {
        const { status, statusText } = response;
        throw this.getErrorMsg(status, statusText);
      }
      return response.json();
    } catch (e) {
      if (e instanceof Error) {
        throw "Server is unavailable, repeat later";
      } else {
        throw e;
      }
    }
  }

  private getErrorMsg(status: number, statusText: string): string {
    let errMsg = statusText;
    switch (status) {
      case 401:
      case 403: {
        errMsg = "Authentication";
        break;
      }
      case 404: {
        errMsg = "Not found";
        break;
      }
    }
    return errMsg;
  }
}
