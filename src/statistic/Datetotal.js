import React, { Component } from 'react';
import axios from 'axios';

class Datetodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      number: 0,
      showdata: '',
      startdate: '',
      enddate: '',
      nextdate: '',
      datedata: [],
      obj: {},
    };
  }

  componentDidMount = () => {
    axios
      .post('http://15.165.44.114:5000/getClick', {
        type: 2,
      })
      .then((res) => {
        if (res.data) {
          let obj = this.state.obj;
          for (let i = 0; i < res.data.length; i++) {
            let url = String(res.data[i].createdAt.slice(0, 10));
            if (obj[url]) {
              obj[url].num++;
            } else {
              obj[url] = { num: 1, click: 0, paymentdata: [], paytotal: 0 };
            }
          }
          this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
        } else {
          this.setState({ data: [], number: 0, showdata: '' });
        }
      })
      .then(() => {
        axios
          .post('http://15.165.44.114:5000/getClick', {
            type: 1,
          })
          .then((res) => {
            if (res.data) {
              let obj = this.state.obj;
              for (let i = 0; i < res.data.length; i++) {
                let url = res.data[i].createdAt.slice(0, 10);
                if (obj[url]) {
                  obj[url].click++;
                }
              }
              this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
            }
          });
      })
      .then(() => {
        axios.post('http://15.165.44.114:5000/getPayment', {}).then((res) => {
          if (res.data) {
            let obj = this.state.obj;
            for (let i = 0; i < res.data.length; i++) {
              let url = res.data[i].createdAt.slice(0, 10);
              if (obj[url]) {
                let data = obj[url].paymentdata;
                data.push(res.data[i]);
                obj[url].paymentdata = data;
                obj[url].paytotal = obj[url].paytotal + Number(res.data[i].pay_amount);
              }
            }
            this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
          }
        });
      });
  };

  onClickgetClick = () => {
    axios
      .post('http://15.165.44.114:5000/getClick', {
        type: 2,
        startDate: this.state.startdate + ' 00:00:00',
        endDate: this.state.enddate + ' 23:59:59',
      })
      .then((res) => {
        if (res.data) {
          let obj = {};
          for (let i = 0; i < res.data.length; i++) {
            let url = res.data[i].createdAt.slice(0, 10);
            if (obj[url]) {
              obj[url].num++;
            } else {
              obj[url] = { num: 1, click: 0, paymentdata: [], paytotal: 0 };
            }
          }
          this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
        } else {
          this.setState({ data: [], number: 0, showdata: '' });
        }
      })
      .then(() => {
        axios
          .post('http://15.165.44.114:5000/getClick', {
            type: 1,
            startDate: this.state.startdate + ' 00:00:00',
            endDate: this.state.enddate + ' 23:59:59',
          })
          .then((res) => {
            if (res.data) {
              let obj = this.state.obj;
              for (let i = 0; i < res.data.length; i++) {
                let url = res.data[i].createdAt.slice(0, 10);
                if (obj[url]) {
                  obj[url].click++;
                }
              }
              this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
            }
          });
      })
      .then(() => {
        axios
          .post('http://15.165.44.114:5000/getPayment', {
            startDate: this.state.startdate + ' 00:00:00',
            endDate: this.state.enddate + ' 23:59:59',
          })
          .then((res) => {
            console.log(res.data);
            if (res.data) {
              let obj = this.state.obj;
              for (let i = 0; i < res.data.length; i++) {
                let url = res.data[i].createdAt.slice(0, 10);
                if (obj[url]) {
                  let data = obj[url].paymentdata;
                  data.push(res.data[i]);
                  obj[url].paymentdata = data;
                  obj[url].paytotal = obj[url].paytotal + Number(res.data[i].pay_amount);
                }
              }
              this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
            }
          });
      });
  };

  handleInputValue = (key) => (e) => {
    if (key === 'startdate') {
      this.setState({ [key]: e.target.value, nextdate: e.target.value });
    } else {
      this.setState({ [key]: e.target.value });
    }
  };

  render() {
    console.log(this.state);
    return (
      <>
        <div className='table_title'>????????? ?????? ??????</div>
        <div>
          <input className='Payment_filter_date' type='date' onChange={this.handleInputValue('startdate')} />
          {' ~ '}
          <input className='Payment_filter_date' type='date' onChange={this.handleInputValue('enddate')} />
          <button className='payment_filter_search_btn' onClick={this.onClickgetClick} type='submit'>
            ????????????
          </button>
        </div>
        {this.state.showdata ? (
          <table>
            <thead>
              <tr>
                <th>??????</th>
                <th style={{ width: '100px' }}>?????????</th>
                <th>?????????</th>
                <th>?????????</th>
                <th>????????????</th>
                <th>????????????</th>
                <th>?????????</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.state.showdata)
                .sort((a, b) => a - b)
                .map((e, i) => (
                  <tr key={i}>
                    <td>{e}</td>
                    <td>{this.state.showdata[e].num}</td>
                    <td>{this.state.showdata[e].click}</td>
                    <td>{Math.round((this.state.showdata[e].click / this.state.showdata[e].num) * 100000) / 1000}%</td>
                    <td>{this.state.showdata[e].paymentdata.length}</td>
                    <td>{this.state.showdata[e].paytotal}</td>
                    <td>{Math.round((this.state.showdata[e].paymentdata.length / this.state.showdata[e].num) * 100000) / 1000}%</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div>????????? ??????</div>
        )}
      </>
    );
  }
}

export default Datetodal;
