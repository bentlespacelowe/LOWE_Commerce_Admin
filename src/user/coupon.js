import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header';

class coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      text: '',
    };
  }

  componentDidMount = () => {
    this.setState({ data: this.props.location.state.coupon, userid: this.props.location.state.userid });
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

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    console.log(this.state);
    return (
      <section id='coupon'>
        <Header list={4} />
        <div>
          <a href={`/coupon/create/${this.state.userid}`}>쿠폰생성</a>
        </div>
        {this.state.data ? (
          <table>
            <thead>
              <tr>
                <th></th>
                <th>금액</th>
                <th>용도</th>
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
                  <td>{e.used === 1 ? '미사용' : '사용'}</td>
                  <td>{e.createdAt.slice(0, 16)}</td>
                  <td>{e.expired.slice(0, 16)}</td>
                  <td>{e.minimum}</td>
                  <td>
                    <input type='text' onChange={this.handleInputValue('text')}></input>
                  </td>
                  <td>{e.text ? e.text : null}</td>
                  <td>
                    <p onClick={this.onClickUse(e)}>수정</p>
                  </td>
                  <td>
                    <p onClick={this.onClickDelete(e)}>삭제</p>
                  </td>
                  <td>{e.text ? e.text : null}</td>
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
