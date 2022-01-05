import config from '../config/config';
import Axios from 'axios'

class EmployeeService{
    baseUrl = config.baseUrl;
    addEmployee(data){
        console.log("Employee service add employee called",data);
        return Axios.post(`${this.baseUrl}employee`, data);
    }
}
export default new EmployeeService()