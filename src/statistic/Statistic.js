import { Component } from "react";
import Board from "./Board";
import Sboardlist from "./Sboardlist";
import Header from '../Header'


class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: 1,
    };
  }
  onClicklist = (e)=>()=>{
    this.setState({list: e})
  }

  render() {
    return (
      <section id="Sboard">
          <Header list={7} />
          <div onClick={this.onClicklist(2)}>페이지 유입</div>
          <div onClick={this.onClicklist(1)}>예약하기 클릭 수</div>
          { this.state.list === 1 ?
          <Board /> :
          <Sboardlist />}
      </section>
    )
  }
}

export default Statistics;





