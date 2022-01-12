import './App.css';
import PayrollForm from './component/Payroll-form/Payroll-form';
import{
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import Home from './component/display/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
         <Route exact path="/" component={Home}>
          </Route> 
          <Route exact path="/employees" component={Home}>
          </Route> 
          <Route exact path="/add" component={PayrollForm}>
          </Route>
          <Route path = "/add/:id" component={PayrollForm}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
