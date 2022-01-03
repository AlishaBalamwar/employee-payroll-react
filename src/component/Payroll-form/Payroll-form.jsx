import React, { useState, useEffect } from 'react';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import './Payroll-form.scss'
import logo from '../../assets/images/logo.png';
import { useParams, Link, withRouter } from 'react-router-dom';

const Payrollform = (props) => {
    let initialValue = {
        name: '',
        profileArray: [
            {url: '../../../assets/profile-images/Ellipse -3.png'},
            {url: '../../../assets/profile-images/Ellipse 1.png'},
            {url: '../../../assets/profile-images/Ellipse -8.png'},            
            {url: '../../../assets/profile-images/Ellipse -7.png'}
        ],
        allDepartment: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        departmentValue: [],
        gender: '',
        salary: '',
        day: '1',
        month: 'Jan',
        year: '2021',
        startDate: '',
        notes: '',
        id: '',
        profileUrl: '',
        isUpdate: false,
        errors: {
            deprtments: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: ''
        }
    }
    const [formValue, setForm] = useState(initialValue);

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value})
    }

    const onCheckChange = (name) => {
        let index = formValue.departmentValues.indexOf(name);
        let checkArray = [...formValue.departmentValue]
        if ( index > -1 )
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setForm({...formValue, departmentValue: checkArray});
    }
    const getChecked = (name) => {
        return formValue.departmentValue && formValue.departmentValue.includes(name);
    }

    const validDate = async () => {
        let isError = false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: ''
        }
        if(formValue.name.length < 1){
            error.name = 'name is required field'
            isError = true;
        }
        if(formValue.gender.length < 1){
            error.name = 'gender is required field'
            isError = true;
        }
        if(formValue.salary.length < 1){
            error.name = 'salary is required field'
            isError = true;
        }
        if(formValue.profileUrl.length < 1){
            error.name = 'profileUrl is required field'
            isError = true;
        }
        if(formValue.departmentValue.length < 1){
            error.name = 'department is required field'
            isError = true;
        }
        await setForm({ ...formValue, error: error})
        return isError;
    }

    const save = async (event) => {
        event.preventDefault();
    }

    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate});

        console.log(formValue);
    }
    return(
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
            <div className='content'>
                <form className="form" action="#" onSubmit={save}>
                    <div className="form-head">Employee Payroll Form</div>
                    <div className="row">
                        <label className="label text" htmlFor="name">Name</label>
                        <input className="input" type="text" id="name" value={formValue.name} onChange={changeValue} placeholder="Your name.." />
                    </div>
                    <div className="error">{formValue.error.name}</div>
                    
                    <div className="row">
                        <label className="label text" htmlFor="profileUrl">Profile image</label>
                        <div className="profile-radio-button">
                            <label>
                                <input type="radio" checked={formValue.profileUrl=='../../assets/profile-images/Ellipse -3.png'} name="profileUrl"
                                value="../../assets/profile-images/Ellipse -3.png" onChange={changeValue} />
                                <img className="profile1" src={profile1} />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profileUrl=='../../assets/profile-images/Ellipse 1.png'} name="profileUrl"
                                value="../../assets/profile-images/Ellipse 1.png" onChange={changeValue} />
                                <img className="profile2" src={profile2} />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profileUrl=='../../assets/profile-images/Ellipse -8.png'} name="profileUrl"
                                value="../../assets/profile-images/Ellipse -8.png" onChange={changeValue} />
                                <img className="profile3" src={profile3} />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profileUrl=='../../assets/profile-images/Ellipse -7.png'} name="profileUrl"
                                value="../../assets/profile-images/Ellipse -7.png" onChange={changeValue} />
                                <img className="profile4" src={profile4} />
                            </label>
                        </div>
                    </div>
                    <div className="error">{formValue.error.profileUrl}</div>
                    <div className="row">
                        <label className="label text" htmlFor="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" onChange={changeValue} name="gender" value="male" />
                            <label className="text" htmlFor="male">Male</label>
                            <input type="radio" id="female" onChange={changeValue} name="gender" value="female" />
                            <label className="text" htmlFor="female">female</label>
                        </div>
                    </div>
                    <div className="error">{formValue.error.gender}</div>
                    <div className="row">
                        <label className="label text" htmlFor="department">Department</label>
                        <div>
                            {formValue.allDepartment.map(item => (
                                <span key ={item}>
                                    <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                        defaultChecked={() => getChecked(item)} value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="error" >{formValue.error.department}</div>
                    <div className="row">
                        <label className="label text" htmlFor="salary">Salary</label>
                        <input className="input" type="number" onChange={changeValue} id="salary" value={formValue.salary} name="salary" placeholder="Salary" />
                    </div>
                    <div className="error">{formValue.error.salary}</div>
                    <div className="row"><label className="label text" htmlFor="startdate">Start Date</label></div>
                                <div>
                                <select onChange={changeValue} id="day" name="day"> 
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                                <select onChange={changeValue} id="month" name="month"> 
                                    <option value="Jan">January</option>
                                    <option value="Feb">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                                <select onChange={changeValue} id="Year" name="year"> 
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                </select>
                            </div>
                    <div className="error">{formValue.error.startDate}</div>
                    <div className="row">
                        <label className="label text" htmlFor="notes">Notes</label>
                        <textarea onChange={changeValue} id="notes" value={formValue.notes} className="input" name="notes" placeholder=""
                            style={{height: '100%'}}></textarea>
                    </div>
                    <div className="buttonParent">
                        <Link to="" className="resetButton button cancelButton">Cancel</Link>
                        <div className="submit-reset">
                            <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="button" onClick={reset} className="resetButton button">Reset</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default withRouter(Payrollform);