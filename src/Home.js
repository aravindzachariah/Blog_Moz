import React, { Component } from 'react';
import NavBar from './components_home/navbar';
import CardI from './components_home/card'
import { Container, Row, Col ,Button} from 'reactstrap';
class Home extends Component {
    state = {
        data: null,
        dataU: [],
        id: 0,
        user:null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null
      };
    
      componentDidMount() {
        this.getDataFromDb();
        //if (!this.state.intervalIsSet) {
        //  let interval = setInterval(this.getDataFromDb, 10000);
        //  this.setState({ intervalIsSet: interval });
        //}
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
        const data=this.state.data;
        const email=this.props.email;
        if(data !==null)
        {
          let dataU=data.filter(d => d.email===email);
          dataU=dataU[0];
          console.log(dataU);
          this.setState({dataU:dataU});   
        }
      };
      
    render() { 
      //const { dataU } = this.state;
      const { data } = this.state;
        return ( <React.Fragment>
                    <NavBar/>
                      <img src='head.png' alt='Head' width="100%"/>
                      <Container style={{'margin-left':'20px','margin-top':'20px'}}>
               
                        <Row>
                          <Col xs="3">
                            <Button type="button" className="btn btn-light m-2">
                              South America
                            </Button>
                            <Button type="button" className="btn btn-light">
                              Africa
                            </Button>{" "}
                            <br />
                            <Button type="button" className="btn btn-light ">
                              India
                            </Button>{" "}
                            <Button type="button" className="btn btn-light m-2">
                              Europe
                            </Button>{" "}
                            <Button type="button" className="btn btn-light">
                              South East
                            </Button>
                            <br />
                            <Button type="button" className="btn btn-light" >
                              Polynesia
                            </Button>
                          </Col>     
                          <Col>
                            <Row>
                              {data ? ( 
                                data[0].posts.map( (post) => {
                                return  <Col  xs="4">
                                          <CardI post={post}/>
                                        </Col> 
                                    })
                              ) : ( "" )}
                            </Row>
                          </Col>
                        </Row>
                </Container>
      </React.Fragment> );
    }
}
 
export default Home;