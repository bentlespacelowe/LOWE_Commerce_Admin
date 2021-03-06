import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './user.css';
import Header from '../Header';
import Userroute from './userroute';

class user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      alldata: '',
      search: '',
      open: false,
      detail: [],
      payment: [],
    };
  }

  componentDidMount = () => {
    axios
      .post('http://15.165.44.114:5000/getAllUser', {})
      .then((res) => {
        this.setState({ data: res.data, alldata: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onclickEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleInputSearch();
    }
  };

  handleInputSearch = () => {
    let keyword = this.state.search;
    let data = this.state.alldata;
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].login_id.indexOf(keyword) !== -1 || data[i].name.indexOf(keyword) !== -1 || data[i].phone.indexOf(keyword) !== -1) {
        arr.push(data[i]);
      }
    }

    this.setState({ data: arr });
  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  openModalDetail = (e) => () => {
    axios
      .post('http://15.165.44.114:5000/getClick', {
        UserId: e.id,
      })
      .then((res) => {
        this.setState({ detail: res.data });
        axios
          .post('http://15.165.44.114:5000/getPayment', {
            UserId: e.id,
          })
          .then((res) => {
            this.setState({ open: true, payment: res.data });
          });
      });
  };

  closeModaldetail = () => {
    this.setState({ open: false });
  };

  render() {
    console.log(this.state.data);
    return (
      <>
        <section id='user'>
          <Header list={4} />
          <div style={{ width: '100%', justifyContent: 'space-between', height: '60px', paddingTop: '90px' }}>
            <span className='table_title'>?????? ?????????</span>
            <span>
              <img
                onClick={this.handleInputSearch}
                className='goods_search'
                src={process.env.PUBLIC_URL + '/image/nav/header_search.svg'}
                alt='?????? ??????'
              />

              <input onChange={this.handleInputValue('search')} onKeyPress={this.onclickEnter} placeholder='??????????????????' type='text'></input>
            </span>
          </div>
          {this.state.data ? (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>??????</th>
                  <th>????????????</th>
                  <th>????????????</th>
                  <th>?????????</th>
                  <th>??????</th>
                  <th>???????????????</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((e, i) => (
                  <tr key={e.id}>
                    <td>{i + 1}</td>
                    <td style={{ width: '116px' }}>{e.name}</td>
                    <td>{e.phone}</td>
                    <td>{e.birthday.slice(0, 10)}</td>
                    <td>{e.login_id}</td>
                    <td>{e.gender === 1 ? '??????' : '??????'}</td>
                    <td>{e.createdAt.slice(0, 16)}</td>
                    <td>
                      <Link
                        to={{
                          pathname: `/user/coupon/${e.login_id}`,
                          state: {
                            coupon: e.Coupons,
                            id: e.login_id,
                            userid: e.id,
                          },
                        }}
                      >
                        ????????????
                      </Link>
                    </td>
                    <td>
                      <div onClick={this.openModalDetail(e)}>????????????</div>
                    </td>
                    {/* <td><a href={`{/user/review/${e.login_id}`}>????????????</a></td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>????????? ????????????</div>
          )}
          <Userroute open={this.state.open} close={this.closeModaldetail} data={this.state.detail} payment={this.state.payment} />
        </section>
      </>
    );
  }
}

export default user;
