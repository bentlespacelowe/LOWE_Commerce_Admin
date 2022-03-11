import { Component } from "react";
import Login from "./Login";
import "./Mainpage.css"

class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };
  }

  componentDidMount = () => {
    if(window.localStorage.getItem("login")=== "admin"  ){
      window.location.replace("/banners")
    } else if(window.localStorage.getItem("login") === "store"){
      window.location.replace("/users")
    }
  }
  handlelogin = () => {
    this.setState({login: true})
    window.location.replace("/")
  }

  render() {
    return ( 
    <div style={{width: "100%", height: "100vh", background: "#f5f5f5"}}>
    {
      window.localStorage.getItem("login") ?
      null
        :
        <Login handlelogin={this.handlelogin} />
    }
  </div>
    );
  }
}

export default Mainpage;


