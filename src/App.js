import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Contacts from './Components/Contacts';
import { Container,Button,Alert } from 'react-bootstrap';
import AddDetails from'./Components/AddDetails';

// function App() {
//   return (
//     <div class="card">
//     <div class="card-body">
//       <h5 class="card-title">Steve Jobs</h5>
//       <h6 class="card-subtitle mb-2 text-muted">steve@apple.com</h6>
//       <p class="card-text">Stay Hungry, Stay Foolish</p>
//     </div>
//   </div>
//   );
// }
// import React, {Component} from 'react';

class App extends Component {


  constructor(props){

    super(props);
    this.state = {
      isAddDetail:false,
      showDetail:false,
      error: null,
      response:{}
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
getDetail()
  {
    this.setState({showDetail:true})
  }
onCreate()
 {
  this.setState({ isAddDetail:true});
 }
onFormSubmit(data)
{
  const apiurl='http://dummy.restapiexample.com/api/v1/create';

  const myHeaders = new Headers();
  myHeaders.append('Content-Type','application/json');

  const options = {
    method :'Post',
    body : JSON.stringify(data),
    myHeaders
  };
  fetch(apiurl,options)
  .then(res => res.json())
  .then(
     (result) => {
       this.setState({
         response: result,
         isAddDetail: false
       })
     },
     (error) =>{
       this.setState({error});
     }
  )
}
    render() {
      return (
        <div className="App">
          <Container>
            
          {!this.state.isAddDetail && !this.state.showDetail &&
          <div>       
                <h1 style={{textAlign:'center'},{color:'antiquewhite'}}>Details of Employees</h1>
                <div class="card">
                   <div class="card-header">
                      Create
                    </div>
                    <div class="card-body">
                       <h5 class="card-title">Create New Employee</h5>
                       < p class="card-text">To Create new employee please click on create button below mentioned.</p>
                       <Button variant="primary" onClick={()=> this.onCreate()}>Create</Button>
                    </div>
                </div>
                <div class="card">
                   <div class="card-header">
                      Details
                    </div>
                    <div class="card-body">
                       <h5 class="card-title">Get Details of all Employees</h5>
                       < p class="card-text">To get the details of employess please click on Details button below mwntioned.</p>
                       <Button variant="primary" onClick={()=> this.getDetail()}> Details</Button>
                    </div>
                </div>
                <div class="card">
                   <div class="card-header">
                      Update
                    </div>
                    <div class="card-body">
                       <h5 class="card-title">Update Details of an Employee</h5>
                       < p class="card-text">TO Update the Details of an employee please click on below mentioned update button.</p>
                       <Button variant="primary" onClick={()=> this.getDetail()}>Update</Button>
                    </div>
                </div>
                <div class="card">
                   <div class="card-header">
                      Delete
                    </div>
                    <div class="card-body">
                       <h5 class="card-title">Delete Details of an Employee</h5>
                       < p class="card-text">TO Delete the Details of an employee please click on below mentioned Delete button.</p>
                       <Button variant="primary" onClick={()=> this.getDetail()}>Delete</Button>
                    </div>
                </div>               
            </div>}
            
           {this.state.showDetail && <Contacts/> }
           {this.state.isAddDetail && <AddDetails onFormSubmit={this.onFormSubmit}/>}
           {this.state.response.status ==='success' && 
           <div>
            <br/>
            <Alert variant ="info">{this.state.response.message}</Alert>
           </div>}
           {this.state.error && <div>Error:{this.state.error.message} </div>}
          </Container>
        </div>
      );
    }
  }

export default App;