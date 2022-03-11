import { Component } from "react";
import "./Login.css";

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
    } else if (this.state.id === "store" && this.state.pw === "1234") {
      window.localStorage.setItem("login", "store");
      this.props.handlelogin();
    } else {
      this.setState({ error: "다시확인해주세요" })
    }

  }


  render() {
    return (
      <div className="login_section">
        <div className="login_title">LOGIN</div>
        <div className="login_sub">아이디</div>
        <input type="text" onChange={this.handleInputValue("id")} />
        <div className="login_sub">비밀번호</div>
        <input type="password" onChange={this.handleInputValue("pw")} />
        <div>
          <button className="login_button" onClick={this.handlesubmit}>로그인</button>
        </div>
        <div>{this.state.error}</div>
      </div>
    );
  }
}

export default Login;


