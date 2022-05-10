import { Component } from 'react';
import axios from 'axios';
import './Statistic.css';
import moment from 'moment';

class Search extends Component {
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
        type: 3,
      })
      .then((res) => {
        if (res.data) {
          let obj = this.state.obj;
          for (let i = 0; i < res.data.length; i++) {
            let funnel = res.data[i].funnel.split('skeyword=')[1];
            let url = '';
            if (res.data[i].funnel === '/' || !res.data[i].funnel) {
              url = 'search';
            } else {
              url = funnel;
            }
            if (obj[url]) {
              obj[url].num++;
            } else {
              obj[url] = { num: 1, id: res.data[i].BoardId };
            }
          }
          this.setState({ data: res.data, number: res.data.length, showdata: obj });
        } else {
          this.setState({ data: [], number: 0, showdata: '' });
        }
      });
  };

  onClickgetClick = async () => {
    let date = this.state.startdate;
    let enddate = new Date(this.state.enddate);
    let startdate = new Date(date);
    if (enddate - startdate === 0) {
      this.setState({ obj: {}, data: [], datedata: [] });
      axios
        .post('http://15.165.44.114:5000/getClick', {
          type: 3,
          startDate: this.state.startdate + ' 00:00:00',
          endDate: this.state.enddate + ' 23:59:59',
        })
        .then((res) => {
          if (res.data) {
            let obj = {};
            for (let i = 0; i < res.data.length; i++) {
              let funnel = res.data[i].funnel.split('skeyword=')[1];
              let url = '';
              if (res.data[i].funnel === '/' || !res.data[i].funnel) {
                url = 'search';
              } else {
                url = funnel;
              }
              if (obj[url]) {
                obj[url].num++;
              } else {
                obj[url] = { num: 1, id: res.data[i].BoardId };
              }
            }
            this.setState({ data: res.data, number: res.data.length, showdata: obj });
          } else {
            this.setState({ data: [], number: 0, showdata: '' });
          }
        });
    } else {
      this.setState({ obj: {}, data: [], datedata: [] });
      for (let i = 0; i <= (enddate - startdate) / 86400000; i++) {
        await axios
          .post('http://15.165.44.114:5000/getClick', {
            type: 3,
            startDate: date + ' 00:00:00',
            endDate: date + ' 23:59:59',
          })
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              let datedata = this.state.datedata;
              let data = this.state.data;
              let d = {
                create: this.state.nextdate,
                number: res.data.length,
              };
              datedata.push(d);
              data.push(...res.data);
              let obj = this.state.obj;
              for (let i = 0; i < res.data.length; i++) {
                let funnel = res.data[i].funnel.split('skeyword=')[1];
                let url = '';
                if (res.data[i].funnel === '/' || !res.data[i].funnel) {
                  url = 'search';
                } else {
                  url = funnel;
                }
                if (obj[url]) {
                  obj[url].num++;
                } else {
                  obj[url] = { num: 1, id: res.data[i].BoardId };
                }
              }
              this.setState({ data: data, number: res.data.length, showdata: obj, datedata: datedata });
            } else {
              let datedata = this.state.datedata;
              let d = {
                create: this.date,
                number: 0,
              };
              datedata.push(d);
              this.setState({ showdata: '', datedata: datedata });
            }
          });
        date = moment(date).add(1, 'days').format('YYYY-MM-DD');
        this.setState({ nextdate: date });
      }
    }
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
        <div className='table_title'>페이지 유입</div>
        <div>
            <input className='Payment_filter_date' type='date' onChange={this.handleInputValue('startdate')} />
            {' ~ '}
            <input className='Payment_filter_date' type='date' onChange={this.handleInputValue('enddate')} />
            <button className='payment_filter_search_btn' onClick={this.onClickgetClick} type='submit'>
                검색하기
            </button>
        </div>
        {this.state.datedata.length ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>유입수</th>
                </tr>
              </thead>
              <tbody>
                {this.state.datedata.map((e, i) => (
                  <tr key={i}>
                    <td>{e.create}</td>
                    <td>{e.number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {this.state.showdata ? (
          <table>
            <thead>
              <tr>
                <th>총 {this.state.data.length}개</th>
                <th style={{ width: '400px' }}>제목</th>
                <th>클릭수</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.state.showdata)
                .sort()
                .map((e, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td style={{ maxWidth: '400px', overflow: 'scroll' }}>{e}</td>
                    <td>{this.state.showdata[e].num}</td>
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

export default Search;
