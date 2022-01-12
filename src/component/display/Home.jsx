 import React, { useState, useEffect } from 'react'
 import logo from '../../assets/images/logo.png'
 import addIcon from '../../assets/icons/add-24px.svg'
 import {Link} from 'react-router-dom';
 import deleteIcon from  '../../assets/icons/delete-black-18dp.svg'
 import editIcon from  '../../assets/icons/create-black-18dp.svg'
 import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
 import EmployeeService from '../../services/employee-service';
 import '../../component/display/Home.scss'

function Home(props){

    const [employeeArray, setEmployees] = useState([]);

    useEffect(() =>{
        getAllEmployees(); 
    }, [])

    const getAllEmployees = () => {
        EmployeeService.getListOfAllEmployees().then(response =>{
            console.log("data after get ", response.data);
            setEmployees( response.data)
        }).catch(err =>{
            console.log("err after");
        })
    }

    const deleteEmployee = (employeeId) => {
        EmployeeService.deleteEmployee(employeeId).then((response)=>{
            getAllEmployees();
        }).catch(error =>{
            console.log(error);
        })
    }

    return (
        <div className= "payroll-main">
            <header className=" header row center">
                <div className="logo">
                    <img src={logo} alt=""/>
                    <div>
                        <span className="emp-text">Employee</span><br />
                        <span className="emp-text emp_payroll">Payroll</span>
                    </div>
                </div>
            </header>
            <div className="column content">
                <div className="emp-detail">
                    <div className="detail-text">
                        Employee Details <div className="count"></div>
                    </div>
                    {/* <div className="row center button-box">
                        <div className="search-box" onClick={this.openSearch}>
                            <input className={"input"+ (this.state.searchExpand && 'input-expand')}
                            onChange={this.search} type="text" placeholder="" />
                            <img className="search-icon" src={searchIcon} alt="" />
                        </div> */}
                        <Link to="/add" className="add-button flex-row-centre">
                            <img src={addIcon} alt=""/>Add User</Link>
                 </div>
             </div>
             <div className="table table-stripped table-bordered"
            style={{ margin: "10px" }}>

             <table id="display" className="display">
                      <tbody>
                        <tr key={-1}>
                        <th></th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Salary</th>  
                        <th>Start Date</th>
                        <th>Notes</th>
                        <th>Action</th>
                        </tr>
                    {
                         employeeArray.map((element, index) => (
                            <tr key={index}>
                                 <td><img className="profileUrl" src={
                                    element.profileUrl ===
                                    "../../assets/profile-images/Ellipse -3.png"
                                    ? profile1
                                    : element.profileUrl ===
                                        "../../assets/profile-images/Ellipse 1.png"
                                        ? profile2
                                        : element.profileUrl ===
                                            "../../assets/profile-images/Ellipse -8.png"
                                            ? profile3
                                            : profile4
                                 } alt="abc" /></td>
                                 <td>{element.id}</td>
                                 <td>{element.name}</td>
                                 <td>{element.gender}</td>
                                 <td>{element.departmentValue && element.departmentValue.map(dept =>  
                                     (<div className="dept-label">{dept}</div>))}</td>
                                 <td>₹{element.salary}</td>
                                 <td>{element.startDate}</td>
                                 <td>{element.notes}</td>
                                 <td>
                                 <Link to={`/add/${element.id}`} >
                                 <img src={editIcon} alt="edit"/>
                                 </Link>
                                 <img  onClick={() => deleteEmployee(element.id)} src={deleteIcon} alt="delete" />
                                 </td>
                             </tr>))
                     }
                 </tbody>
                    </table>

             </div>
        </div>
     )
 }
export default Home