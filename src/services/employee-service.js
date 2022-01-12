import Axios from "axios";

const BASE_URL = "http://localhost:8080";
const EMPLOYEE_URL = "/employee";

class EmployeeService {
  getListOfAllEmployees() {
    return Axios.get(BASE_URL + EMPLOYEE_URL);
  }
  addEmployee(employee) {
    return Axios.post(BASE_URL + EMPLOYEE_URL, employee);
  }
  getEmployeeById(employeeId) {
    return Axios.get(BASE_URL + EMPLOYEE_URL + '/'+ employeeId);
  }
  updateEmployee(employeeId, employee) {
     return Axios.put(BASE_URL + EMPLOYEE_URL +'/'+ employeeId, employee);
   }
   deleteEmployee(employeeId) {
     return Axios.delete(BASE_URL + EMPLOYEE_URL + '/' + employeeId);
   }
}

export default new EmployeeService();