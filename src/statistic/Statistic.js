import { Component } from "react";
import Board from "./Board";
import Sboardlist from "./Sboardlist";
import Header from '../Header'
import Search from "./Search";
import Boardtotal from "./Boardtotal";
import Datetodal from "./Datetotal";
import Designertotal from "./Designertotal";


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
          <div style={{cursor: "pointer"}} onClick={this.onClicklist(6)}>프로필 전체 통계</div>
          <div style={{cursor: "pointer"}} onClick={this.onClicklist(5)}>날짜별 전체 통계</div>
          <div style={{cursor: "pointer"}} onClick={this.onClicklist(4)}>상품 전체 통계</div>
          <div style={{cursor: "pointer"}} onClick={this.onClicklist(3)}>검색어 통계</div>
          <div style={{cursor: "pointer"}} onClick={this.onClicklist(2)}>페이지 유입</div>
          <div style={{cursor: "pointer"}} onClick={this.onClicklist(1)}>예약하기 클릭 수</div>
          { this.state.list === 1 ?
          <Board /> :
          this.state.list === 2 ?
          <Sboardlist />:
          this.state.list === 3 ?
          <Search />:
          this.state.list === 4 ?
          <Boardtotal />:
          this.state.list === 5 ?
          <Datetodal />:
          <Designertotal />}
      </section>
    )
  }
}

export default Statistics;





