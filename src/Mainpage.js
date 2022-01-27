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
    <div style={{overflow: "scroll"}}>
    {
      window.localStorage.getItem("login") ?
        <div>
            <a href="/banners">배너</a>
            <a href="/goods">상품</a>
            <a href="/designers">디자이너 추가</a>
            <a href="/users">유저</a>
        </div>
        :
        <Login handlelogin={this.handlelogin} />
    }
  </div>
    );
  }
}

export default Mainpage;


