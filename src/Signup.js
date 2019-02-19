import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './styleL.css'
import BodyBackgroundColor from 'react-body-backgroundcolor';
import './Style_w3.css'
import {Flex,Box} from 'reflexbox'
import axios from "axios";
import {
  Container, Col, Form,
  FormGroup,  Input,
  Button,
} from 'reactstrap';
class Signup extends Component {
  state = {
    data: [],
    id: 0,
    fname:null,
    lname:null,
    desig:null,
    message: null,
    password:null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }


  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

 

  getDataFromDb = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
   };



  putDataToDB = () => {
    const message=this.state.message;
    const password=this.state.password;
    const desig=this.state.desig;
    const fname=this.state.fname;
    const lname=this.state.lname;
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:3001/api/putData", {
      id: idToBeAdded,
      email: message,
      password:password,
      desig:desig,
      fname:fname,
      lname:lname 
    });
    this.props.history.push('/login');
  };




  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("http://localhost:3001/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };



  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("http://localhost:3001/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };

    render() { 
        return ( 
            <BodyBackgroundColor backgroundColor='Lightblue'>
      <React.Fragment>
      <Container style={{width:"20%"}} className="flex-containerS" >
      <Flex >
        <Box>
      <img className='image' src='login.png' alt='Login'/>
      <Form className="form">
        <Col>
          <FormGroup>
            <Input
              style={{display:'flex','margin-top':30}}
              className="w3-input"   
              onChange={e => this.setState({ fname: e.target.value})}                       
              name="fname"
              id="Email"
              placeholder="First_name"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Input
              style={{display:'flex','margin-top':30}}
              className="w3-input"
              onChange={e => this.setState({ lname: e.target.value})}
              name="lname"
              id="Password"
              placeholder="Last_name"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Input
              style={{display:'flex','margin-top':30}}
              className="w3-input"
              onChange={e => this.setState({ desig: e.target.value})}
              name="designation"
              id="Designation"
              placeholder="Designation"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Input
              style={{display:'flex','margin-top':30}}
              className="w3-input"
              type="email"
              onChange={e => this.setState({ message: e.target.value})}
              name="email"
              id="Email"
              placeholder="Email_Address"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Input
              style={{display:'flex','margin-top':30}}
              className="w3-input"
              onChange={e => this.setState({ password: e.target.value})}
              type="password"
              name="password"
              id="Password"
              placeholder="Password"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Input
              style={{display:'flex','margin-top':30}}
              className="w3-input"
              type="password"
              name="Cpassword"
              id="CPassword"
              placeholder="Confirm_Password"
            />
          </FormGroup>
        </Col>
        <Button className='button-f' 
          onClick={() => this.putDataToDB()} 
            >SIGN UP</Button>
        <h href='#' style={{display:'flex','margin-left':50,'margin-bottom':10}}>Your information is safe with us</h>
      </Form>
      </Box>
      </Flex>
    </Container>
    <a href="/login" onClick={()=>this.props.history.push('/login')}  style={{display:'flex','margin-left':760,'margin-top':20}}>Already have an account? Login.</a>
    </React.Fragment>
    </BodyBackgroundColor>
         );
    }
}
 
export default Signup;