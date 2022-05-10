import { Component } from 'react';
import axios from 'axios';

class Linkpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      number: 0,
      showdata: '',
      startdate: '',
      enddate: '',
      datedata: [],
      obj: {},
    };
  }

  componentDidMount = () => {
    axios.post('http://15.165.44.114:5000/getClick', {}).then((res) => {
      if (res.data) {
        let obj = this.state.obj;
        for (let i = 0; i < res.data.length; i++) {
          let url = String(res.data[i].createdAt.slice(0, 10));

          let funnels = '';
          if (res.data[i].funnel) {
            if (res.data[i].funnel.indexOf('instagram') !== -1) {
              funnels = 'instagram';
            } else if (res.data[i].funnel.indexOf('facebook') !== -1) {
              funnels = 'facebook';
            } else if (res.data[i].funnel.indexOf('kakao') !== -1) {
              funnels = 'kakao';
            } else if (res.data[i].funnel.indexOf('naver') !== -1) {
              funnels = 'naver';
            } else if (res.data[i].funnel.indexOf('daum') !== -1) {
              funnels = 'daum';
            } else if (res.data[i].funnel.indexOf('google') !== -1) {
              funnels = 'google';
            } else if (res.data[i].funnel.indexOf('youtube') !== -1) {
              funnels = 'youtube';
            } else {
              funnels = 'organic';
            }
          }
          if (obj[url]) {
            if (obj[url].funnel[funnels]) {
              obj[url].funnel[funnels]++;
              obj[url].num++;
            } else {
              obj[url].funnel[funnels] = 1;
              obj[url].num++;
            }
          } else {
            obj[url] = { num: 1, funnel: {} };
            obj[url].funnel[funnels] = 1;
          }
        }
        this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
      } else {
        this.setState({ data: [], number: 0, showdata: '' });
      }
    });
  };
  onClickgetClick = () => {
    axios
      .post('http://15.165.44.114:5000/getClick', {
        startDate: this.state.startdate + ' 00:00:00',
        endDate: this.state.enddate + ' 23:59:59',
      })
      .then((res) => {
        if (res.data) {
          let obj = {};
          for (let i = 0; i < res.data.length; i++) {
            let url = String(res.data[i].createdAt.slice(0, 10));

            let funnels = '';
            if (res.data[i].funnel) {
              if (res.data[i].funnel.indexOf('instagram') !== -1) {
                funnels = 'instagram';
              } else if (res.data[i].funnel.indexOf('facebook') !== -1) {
                funnels = 'facebook';
              } else if (res.data[i].funnel.indexOf('kakao') !== -1) {
                funnels = 'kakao';
              } else if (res.data[i].funnel.indexOf('naver') !== -1) {
                funnels = 'naver';
              } else if (res.data[i].funnel.indexOf('daum') !== -1) {
                funnels = 'daum';
              } else if (res.data[i].funnel.indexOf('google') !== -1) {
                funnels = 'google';
              } else if (res.data[i].funnel.indexOf('youtube') !== -1) {
                funnels = 'youtube';
              } else {
                funnels = 'organic';
              }
            }
            if (obj[url]) {
              if (obj[url].funnel[funnels]) {
                obj[url].funnel[funnels]++;
                obj[url].num++;
              } else {
                obj[url].funnel[funnels] = 1;
                obj[url].num++;
              }
            } else {
              obj[url] = { num: 1, funnel: {} };
              obj[url].funnel[funnels] = 1;
            }
          }
          this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
        } else {
          this.setState({ data: [], number: 0, showdata: '' });
        }
      });
  };
  handleInputValue = (key) => (e) => {
    if (key === 'startdate') {
      this.setState({ [key]: e.target.value });
    } else {
      this.setState({ [key]: e.target.value });
    }
  };
  render() {
    console.log(this.state);
    return (
      <>
        <div className='table_title'>유입 링크 통계</div>
        <div>
            <input className='Payment_filter_date' type='date' onChange={this.handleInputValue('startdate')} />
            {' ~ '}
            <input className='Payment_filter_date' type='date' onChange={this.handleInputValue('enddate')} />
            <button className='payment_filter_search_btn' onClick={this.onClickgetClick} type='submit'>
                검색하기
            </button>
        </div>
        {this.state.showdata ? (
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>총 유입수</th>
                <th>organic</th>
                <th>인스타</th>
                <th>네이버</th>
                <th>페이스북</th>
                <th>카카오</th>
                <th>구글</th>
                <th>유튜브</th>
                <th>다음</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.state.showdata)
                .sort((a, b) => a - b)
                .map((e, i) => (
                  <tr key={i}>
                    <td>{e}</td>
                    <td>{this.state.showdata[e].num}</td>
                    <td>{this.state.showdata[e].funnel.organic ? this.state.showdata[e].funnel.organic : 0}</td>
                    <td>{this.state.showdata[e].funnel.instagram ? this.state.showdata[e].funnel.instagram : 0}</td>
                    <td>{this.state.showdata[e].funnel.naver ? this.state.showdata[e].funnel.naver : 0}</td>
                    <td>{this.state.showdata[e].funnel.facebook ? this.state.showdata[e].funnel.facebook : 0}</td>
                    <td>{this.state.showdata[e].funnel.kakao ? this.state.showdata[e].funnel.kakao : 0}</td>
                    <td>{this.state.showdata[e].funnel.google ? this.state.showdata[e].funnel.google : 0}</td>
                    <td>{this.state.showdata[e].funnel.youtube ? this.state.showdata[e].funnel.youtube : 0}</td>
                    <td>{this.state.showdata[e].funnel.daum ? this.state.showdata[e].funnel.daum : 0}</td>
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

export default Linkpage;
