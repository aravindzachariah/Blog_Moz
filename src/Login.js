import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './styleL.css'
import BodyBackgroundColor from 'react-body-backgroundcolor';
import './Style_w3.css'
import {Flex,Box} from 'reflexbox'
import {
  Container, Col, Form,
  FormGroup,  Input,
  Button,
} from 'reactstrap';
class Login extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    password:null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  componentDidMount() {
    this.getDataFromDb();
    // if (!this.state.intervalIsSet) {
    //   let interval = setInterval(this.getDataFromDb, 1000);
    //   this.setState({ intervalIsSet: interval });
    // }
  }

  // componentWillUnmount() {
  //   if (this.state.intervalIsSet) {
  //     clearInterval(this.state.intervalIsSet);
  //     this.setState({ intervalIsSet: null });
  //   }
  // }

  getDataFromDb = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
    //console.log(this.state.data);
  };
  validate = () =>
  {
    let data=this.state.data;
    const email=this.state.message;
    let password=this.state.password;
    //this.props.uid(email);
    this.props.set(email);
    data=data.filter(d => d.email===email);
    if(data!==null & data[0].password===password)
    {
      this.props.history.push('/home');
    }
  }
  render() {
    return (
      <BodyBackgroundColor backgroundColor='Lightblue'>
      <React.Fragment>
      <Container style={{width:"20%"}} className="flex-containerL" >
      <Flex >
        <Box>
      <img className='image' src='login.png' alt='Login'/>
      <Form className="form">
        <Col>
          <FormGroup>
            <Input
              style={{display:'flex','margin-top':30 }}
              className="w3-input"   
              onChange={e => this.setState({ message: e.target.value})}                       
              type="email"
              name="email"
              id="Email"
              placeholder="Email_address"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Input
              style={{display:'flex','margin-top':30 }}
              className="w3-input"
              onChange={e => this.setState({ password: e.target.value})}
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
            />
          </FormGroup>
        </Col>
        <Button onClick={()=>this.validate()} className='button-f' >L O G I N</Button>
        <a  href="/submit" style={{display:'flex','margin-left':75,'margin-bottom':10}}>Forgot your password?</a>
      </Form>
      </Box>
      </Flex>
    </Container>
    <a href="/signup" onClick={()=>this.props.history.push('/signup')} style={{display:'flex','margin-left':750,'margin-top':20}}>Dont have an account? Get Started.</a>
    </React.Fragment>
    </BodyBackgroundColor>
    );
  }
}

export default Login;
