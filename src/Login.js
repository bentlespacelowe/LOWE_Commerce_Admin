import { Component } from "react";
import "./App.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pw: "",
      error: ""
    };
  }

  componentDidMount = () => {

  }


  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handlesubmit = () => {
    if (this.state.id === "admin" && this.state.pw === "1234") {
        window.localStorage.setItem("login", "admin");
      this.props.handlelogin();
    }  else if (this.state.id === "store" && this.state.pw === "1234") {
      window.localStorage.setItem("login", "store");
    this.props.handlelogin();
  } else {
      this.setState({ error: "다시확인해주세요" })
    }

  }


  render() {
    return (
      <div style={{marginTop: "100px"}}>
        <input type="text" placeholder="아이디" onChange={this.handleInputValue("id")} />
        <input type="password" placeholder="비밀번호" onChange={this.handleInputValue("pw")} />
        <button onClick={this.handlesubmit}>로그인</button>
        <div>{this.state.error}</div>
      </div>
    );
  }
}

export default Login;


