import React, {useState, useEffect} from 'react'
import logo from '../../assets/images/logo.png';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import './Payroll-form.scss'
import { Link, withRouter, useParams } from 'react-router-dom';
import EmployeeService from '../../services/employee-service';


const PayrollForm = (props) =>{
    let initialValue = {
        name: '',
        id:'',
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
        month: '01',
        year: '2021',
        startDate: '',
        notes: '',
        profileUrl: '',
        isUpdate: false,
        errors: {
            departments: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: ''
        }
    }
    const [formValue, setForm] = useState(initialValue);
    const setData = (obj) => {
        console.log("object");
        console.log(obj);
        let array = obj.startDate.split("-");
        console.log(array);
        setForm({
            ...formValue,
            ...obj,
            profileUrl: obj.profileUrl,
            departmentValue: obj.departmentValue,
            isUpdate: true,
            day: array[2],
            month: array[1],
            year: array[0],
        });
    };

    const {id} = useParams();

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value})
    }

    const onCheckChange = (name) => {
        let index = formValue.departmentValue.indexOf(name);
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
        if(await validDate()){
            console.log('error', formValue);
            return;
        }
        let object = {
            name: formValue.name,
            departmentValue: formValue.departmentValue,
            gender: formValue.gender,
            salary: formValue.salary,
            startDate: `2018-01-11T04:25:26.293Z`,
            notes: formValue.notes,
            profileUrl: formValue.profileUrl,
         }
         if(id){
             EmployeeService.updateEmployee(id, object).then((employee)=>{
                 props.history.push('/')
             }).catch(err=>{
                 console.log("err in update save block")
             })

         }else{
            EmployeeService.addEmployee(object).then(employee =>{
                console.log("data added successfully");
                props.history.push('/')
            }).catch(err =>{
                console.log("err while Add");
            })
        }
    }

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((response) => {
            console.log("in useeffect of payroll",response.data.data)
            let obj=response.data.data;
            setData(obj);
        }).catch(err =>{
            console.log(err)
        })
    }, [])

    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate});

        console.log(formValue);
    }

    return(
        <div className= "payroll-main">
            <header className=" header">
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
                        <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Your name.." />
                    </div>
                    <div className="error">{formValue.errors.name}</div>

                    <div className="row">
                        <label className="label text" htmlFor="profileUrl">Profile image</label>
                        <div className="profile-radio-button">
                            <label>
                                <input type="radio" checked={formValue.profileUrl==='../../assets/profile-images/Ellipse -3.png'} name="profileUrl"
                                value="../../assets/profile-images/Ellipse -3.png" onChange={changeValue} />
                                <img className="profile1" src={profile1} alt=""/>
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profileUrl==='../../assets/profile-images/Ellipse 1.png'} name="profileUrl"
                                value="../../assets/profile-images/Ellipse 1.png" onChange={changeValue} />
                                <img className="profile2" src={profile2} alt="" />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profileUrl==='../../assets/profile-images/Ellipse -8.png'} name="profileUrl"
                                value="../../assets/profile-images/Ellipse -8.png" onChange={changeValue} />
                                <img className="profile3" src={profile3} alt="" />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profileUrl==='../../assets/profile-images/Ellipse -7.png'} name="profileUrl"
                                value="../../assets/profile-images/Ellipse -7.png" onChange={changeValue} />
                                <img className="profile4" src={profile4} alt="" />
                            </label>
                        </div>
                    </div>    
                    <div className="error">{formValue.errors.profileUrl}</div>
                    <div className="row">
                        <label className="label text" htmlFor="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" checked={formValue.gender=="male"} onChange={changeValue} name="gender" value="male" />
                            <label className="text" htmlFor="male">Male</label>
                            <input type="radio" id="female" checked={formValue.gender=="female"} onChange={changeValue} name="gender" value="female" />
                            <label className="text" htmlFor="female">female</label>
                        </div>
                    </div>
                    <div className="error">{formValue.errors.gender}</div>

                    <div className="row">
                        <label className="label text" htmlFor="department">Department</label>
                        <div>
                            {formValue.allDepartment.map(item => (
                                <span key ={item}>
                                    <input className="checkbox" type="checkbox"  onChange={() => onCheckChange(item)} name={item}
                                        checked={getChecked(item)} value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="error" >{formValue.errors.departmentValue}</div>

                    <div className="row">
                        <label className="label text" htmlFor="salary">Salary</label>
                        <input className="input" type="number" onChange={changeValue} id="salary" value={formValue.salary} name="salary" placeholder="Salary" />
                    </div>
                    <div className="error">{formValue.errors.salary}</div>

                    <div className="row"><label className="label text" htmlFor="startdate">Start Date</label></div>
                                <div>
                                <select onChange={changeValue} id="day" name="day"
                                value={formValue.day}> 
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                    <option value="03">3</option>
                                    <option value="04">4</option>
                                    <option value="05">5</option>
                                    <option value="06">6</option>
                                    <option value="07">7</option>
                                    <option value="08">8</option>
                                    <option value="09">9</option>
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
                                <select onChange={changeValue} id="month" name="month"
                                value={formValue.month}> 
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <select onChange={changeValue} id="Year" name="year"
                                value={formValue.year}> 
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                </select>
                            </div>
                    <div className="error">{formValue.errors.startDate}</div>

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
export default withRouter(PayrollForm);