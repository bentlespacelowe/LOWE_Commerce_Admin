import { Component } from 'react';
import axios from 'axios';

class Designertotal extends Component {
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
      .post('https://server.lowehair.kr/getClick', {
        type: 4,
      })
      .then((res) => {
        if (res.data) {
          let obj = this.state.obj;
          for (let i = 0; i < res.data.length; i++) {
            let url = res.data[i].ManagerId;
            if (obj[url]) {
              obj[url].num++;
            } else {
              obj[url] = { num: 1, name: '', id: res.data[i].ManagerId, click: 0, paymentdata: [], paytotal: 0, tab: {} };
            }
          }
          this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
        } else {
          this.setState({ data: [], number: 0, showdata: '' });
        }
      })
      .then(() => {
        axios
          .post('https://server.lowehair.kr/getClick', {
            type: 6,
          })
          .then((res) => {
            if (res.data) {
              let obj = this.state.obj;
              for (let i = 0; i < res.data.length; i++) {
                let url = res.data[i].ManagerId;
                if (obj[url]) {
                  obj[url].click++;
                }
              }
              this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
            }
          });
      })
      .then(() => {
        axios.post('https://server.lowehair.kr/getDesignerList', {}).then((res) => {
          if (res.data) {
            console.log(res.data);
            let obj = this.state.obj;
            for (let i = 0; i < res.data.length; i++) {
              let url = res.data[i].id;
              if (obj[url]) {
                obj[url].name = res.data[i].name;
              }
            }
            this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
          }
        });
      })
      .then(() => {
        axios.post('https://server.lowehair.kr/getPayment', {}).then((res) => {
          if (res.data) {
            let obj = this.state.obj;
            for (let i = 0; i < res.data.length; i++) {
              let url = res.data[i].ManagerId;
              if (obj[url] && res.data[i].BoardId === 122) {
                let data = obj[url].paymentdata;
                data.push(res.data[i]);
                obj[url].paymentdata = data;
                obj[url].paytotal = obj[url].paytotal + Number(res.data[i].pay_amount);
              }
            }
            this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
          }
        });
      })
      .then(() => {
        axios
          .post('https://server.lowehair.kr/getClick', {
            type: 5,
          })
          .then((res) => {
            if (res.data) {
              let obj = this.state.obj;
              for (let i = 0; i < res.data.length; i++) {
                let url = res.data[i].ManagerId;
                let tab = res.data[i].tab_num;
                if (obj[url]) {
                  if (obj[url].tab[tab]) {
                    obj[url].tab[tab]++;
                  } else {
                    obj[url].tab[tab] = 1;
                  }
                }
              }
              this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
            }
          });
      });
  };

  onClickgetClick = () => {
    axios
      .post('https://server.lowehair.kr/getClick', {
        type: 4,
        startDate: this.state.startdate + ' 00:00:00',
        endDate: this.state.enddate + ' 23:59:59',
      })
      .then((res) => {
        if (res.data) {
          let obj = {};
          for (let i = 0; i < res.data.length; i++) {
            let url = res.data[i].ManagerId;
            if (obj[url]) {
              obj[url].num++;
            } else {
              obj[url] = { num: 1, name: '', id: res.data[i].ManagerId, click: 0, paymentdata: [], paytotal: 0, tab: {} };
            }
          }
          this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
        } else {
          this.setState({ data: [], number: 0, showdata: '' });
        }
      })
      .then(() => {
        axios
          .post('https://server.lowehair.kr/getClick', {
            type: 6,
            startDate: this.state.startdate + ' 00:00:00',
            endDate: this.state.enddate + ' 23:59:59',
          })
          .then((res) => {
            if (res.data) {
              let obj = this.state.obj;
              for (let i = 0; i < res.data.length; i++) {
                let url = res.data[i].ManagerId;
                if (obj[url]) {
                  obj[url].click++;
                }
              }
              this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
            }
          });
      })
      .then(() => {
        axios.post('https://server.lowehair.kr/getDesignerList', {}).then((res) => {
          if (res.data) {
            console.log(res.data);
            let obj = this.state.obj;
            for (let i = 0; i < res.data.length; i++) {
              let url = res.data[i].id;
              if (obj[url]) {
                obj[url].name = res.data[i].name;
              }
            }
            this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
          }
        });
      })
      .then(() => {
        axios
          .post('https://server.lowehair.kr/getPayment', {
            startDate: this.state.startdate + ' 00:00:00',
            endDate: this.state.enddate + ' 23:59:59',
          })
          .then((res) => {
            if (res.data) {
              let obj = this.state.obj;
              for (let i = 0; i < res.data.length; i++) {
                let url = res.data[i].ManagerId;
                if (obj[url] && res.data[i].BoardId === 122) {
                  let data = obj[url].paymentdata;
                  data.push(res.data[i]);
                  obj[url].paymentdata = data;
                  obj[url].paytotal = obj[url].paytotal + Number(res.data[i].pay_amount);
                }
              }
              this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
            }
          });
      })
      .then(() => {
        axios
          .post('https://server.lowehair.kr/getClick', {
            type: 5,
            startDate: this.state.startdate + ' 00:00:00',
            endDate: this.state.enddate + ' 23:59:59',
          })
          .then((res) => {
            if (res.data) {
              let obj = this.state.obj;
              for (let i = 0; i < res.data.length; i++) {
                let url = res.data[i].ManagerId;
                let tab = res.data[i].tab_num;
                if (obj[url]) {
                  if (obj[url].tab[tab]) {
                    obj[url].tab[tab]++;
                  } else {
                    obj[url].tab[tab] = 1;
                  }
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
        <div className='table_title'>프로필 전체 통계</div>
        <div>
          <input type='date' onChange={this.handleInputValue('startdate')} />~
          <input type='date' onChange={this.handleInputValue('enddate')} />
          <span>
            <button onClick={this.onClickgetClick} style={{ marginLeft: '10px', width: '50px' }} type='submit'>
              검색
            </button>
          </span>
        </div>
        {this.state.showdata ? (
          <table>
            <thead>
              <tr>
                <th>보드 넘버</th>
                <th style={{ width: '100px' }}>디자이너명</th>
                <th style={{ width: '100px' }}>유입수</th>
                <th>메뉴 클릭수</th>
                <th>클릭율</th>
                <th>메뉴 결제건수</th>
                <th>결제금액</th>
                <th>전환율</th>
                <th>탭 클릭</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.state.showdata)
                .sort((a, b) => a - b)
                .map((e, i) => (
                  <tr key={i}>
                    <td>{e}</td>
                    <td style={{ maxWidth: '100px', overflow: 'scroll' }}>
                      <a href={'https://lowehair.kr/designer/' + e}>{this.state.showdata[e].name}</a>
                    </td>
                    <td>{this.state.showdata[e].num}</td>
                    <td>{this.state.showdata[e].click}</td>
                    <td>{Math.round((this.state.showdata[e].click / this.state.showdata[e].num) * 100000) / 1000}%</td>
                    <td>{this.state.showdata[e].paymentdata.length}</td>
                    <td>{this.state.showdata[e].paytotal}</td>
                    <td>{Math.round((this.state.showdata[e].paymentdata.length / this.state.showdata[e].num) * 100000) / 1000}%</td>
                    <td>
                      {this.state.showdata[e].tab
                        ? Object.keys(this.state.showdata[e].tab)
                            .sort((a, b) => a - b)
                            .map((v) => (
                              <div>
                                {v === '1'
                                  ? '상품탭: ' + this.state.showdata[e].tab[v]
                                  : v === '2'
                                  ? '메뉴탭: ' + this.state.showdata[e].tab[v]
                                  : v === '3'
                                  ? '리뷰탭: ' + this.state.showdata[e].tab[v]
                                  : '정보탭: ' + this.state.showdata[e].tab[v]}
                              </div>
                            ))
                        : '정보없음'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div>결과값 없음</div>
        )}
      </>
    );
  }
}

export default Designertotal;
