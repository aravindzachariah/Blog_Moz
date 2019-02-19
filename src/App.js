import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
class App extends Component {
   
    state = { email:null }
    set =(email) =>{
        this.setState({email:email});
    }
    render() { 
        return (  <Router>
                    <div>
                        <Route path="/login" render={(props)=><Login {...props} set={this.set}/>} />
                        <Route path="/signup" render={(props)=><Signup {...props}/>} />
                        <Route path="/home" render={(props)=><Home {...props} email={this.state.email}/>}/>
                    </div>
                </Router> );
    }
}
 
export default App;