import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header';

class coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      text: '',
      number: 0,
      exp: [],
      use: [],
      all: [],
      notuse: [],
      filter: 0,
      startdate: '',
      enddate: '',
      nextdate: '',
    };
  }

  componentDidMount = () => {
    axios.post('http://15.165.44.114:5000/getAllCoupon', {}).then((res) => {
      let data = res.data;
      let exp = [];
      let all = [];
      let use = [];
      let notuse = [];
      this.setState({ number: data.length });
      for (let i = 0; i < data.length; i++) {
        if (data[i].used === 0) {
          if (data[i].deletedAt) {
            exp.unshift(data[i]);
            all.unshift(data[i]);
          } else {
            use.unshift(data[i]);
            all.unshift(data[i]);
          }
        } else {
          if (data[i].deletedAt) {
            exp.unshift(data[i]);
            all.unshift(data[i]);
          } else {
            notuse.unshift(data[i]);
            all.unshift(data[i]);
          }
        }
      }
      this.setState({
        exp: exp,
        use: use,
        all: all,
        notuse: notuse,
        data: all,
      });
    });
  };
  onClickUse = (e) => () => {
    axios
      .post('http://15.165.44.114:5000/updateCoupon', {
        id: e.id,
        text: this.state.text,
      })
      .then((res) => {
        window.history.go(-1);
      });
  };

  onClickDelete = (e) => () => {
    console.log(e.id);
    axios
      .post('http://15.165.44.114:5000/removeCoupon', {
        id: e.id,
      })
      .then((res) => {
        window.history.go(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onClickkakao = () => {
    axios
      .post('http://15.165.44.114:5000/alert', {
        type: 1,
      })
      .then((res) => {
        window.alert('카톡을 보내셨습니다.');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  selectFilter = (v) => (e) => {
    this.setState({ filter: e.target.value });
    if (Number(e.target.value) === 0) {
      this.setState({ data: this.state.all });
    } else if (Number(e.target.value) === 1) {
      this.setState({ data: this.state.exp });
    } else if (Number(e.target.value) === 2) {
      this.setState({ data: this.state.use });
    } else if (Number(e.target.value) === 3) {
      this.setState({ data: this.state.notuse });
    }
  };

  render() {
    console.log(this.state.data);
    return (
      <section id='coupon'>
        <Header list={5} />
        <button onClick={this.onClickkakao}>만료쿠폰 카톡</button>
        <div style={{ marginTop: '50px' }}>
          <select onChange={this.selectFilter('filter')}>
            <option value={0}>전체보기</option>
            <option value={1}>만료된쿠폰</option>
            <option value={2}>사용한쿠폰</option>
            <option value={3}>사용가능쿠폰</option>
          </select>
        </div>
        <div>
          총 {this.state.number} / 사용 {this.state.use.length} / 만료 {this.state.exp.length}
        </div>

        {this.state.data ? (
          <table>
            <thead>
              <tr>
                <th>{this.state.data.length}개</th>
                <th>금액</th>
                <th>용도</th>
                <th>유저</th>
                <th>사용</th>
                <th>발급날짜</th>
                <th>만료날짜</th>
                <th>최저금액</th>
                <th>사용처</th>
                <th>사용변경</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.price}</td>
                  <td>{e.content}</td>
                  <td>{e.User ? e.User.login_id : '탈퇴회원'}</td>
                  <td>{e.used === 1 ? '미사용' : '사용'}</td>
                  <td>{e.createdAt.slice(0, 16)}</td>
                  <td>{!e.deletedAt ? (e.expired ? e.expired.slice(0, 16) : null) : '만료된 쿠폰'}</td>
                  <td>{e.minimum}</td>
                  <td>
                    <input type='text' onChange={this.handleInputValue('text')}></input>
                  </td>
                  <td>
                    <p onClick={this.onClickUse(e)}>수정</p>
                  </td>
                  <td>
                    <p onClick={this.onClickDelete(e)}>삭제</p>
                  </td>
                  <td>{e.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>쿠폰 없음</div>
        )}
      </section>
    );
  }
}

export default coupon;
