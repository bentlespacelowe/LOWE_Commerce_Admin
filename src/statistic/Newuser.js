import { Component } from 'react';
import axios from 'axios';

class Newuser extends Component {
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
      arr: [],
    };
  }

  componentDidMount = () => {
    axios
      .post('http://15.165.44.114:5000/getClick', {})
      .then((res) => {
        if (res.data) {
          let obj = this.state.obj;
          let arr = this.state.arr;
          for (let i = 0; i < res.data.length; i++) {
            let url = String(res.data[i].createdAt.slice(0, 10));
            if (obj[url]) {
              if (res.data[i].UserId && obj[url].user.indexOf(res.data[i].UserId) === -1) {
                if (arr.indexOf(res.data[i].UserId) === -1) {
                  arr.push(res.data[i].UserId);
                  obj[url].user.push(res.data[i].UserId);
                  obj[url].num++;
                  obj[url].new++;
                } else {
                  obj[url].user.push(res.data[i].UserId);
                  obj[url].num++;
                }
              }
            } else {
              if (res.data[i].UserId) {
                if (arr.indexOf(res.data[i].UserId) === -1) {
                  arr.push(res.data[i].UserId);
                  obj[url] = { num: 1, new: 1, user: [res.data[i].UserId] };
                } else {
                  obj[url] = { num: 1, new: 0, user: [res.data[i].UserId] };
                }
              }
            }
          }
          this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj, arr: arr });
        } else {
          this.setState({ data: [], number: 0, showdata: '' });
        }
      })
      .then(() => {
        axios.post('http://15.165.44.114:5000/getAllUser', {}).then((res) => {
          console.log(res.data);
          if (res.data) {
            let obj = this.state.obj;
            let arr = this.state.arr;
            for (let i = 0; i < res.data.length; i++) {
              let url = String(res.data[i].createdAt.slice(0, 10));
              if (obj[url]) {
                if (res.data[i].id && obj[url].user.indexOf(res.data[i].id) === -1) {
                  if (arr.indexOf(res.data[i].id) === -1) {
                    arr.push(res.data[i].id);
                    obj[url].user.push(res.data[i].id);
                    obj[url].num++;
                    obj[url].new++;
                  } else {
                    obj[url].user.push(res.data[i].id);
                    obj[url].num++;
                  }
                }
              }
            }
            this.setState({ data: res.data, number: res.data.length, showdata: obj, obj: obj });
          }
        });
      });
  };

  render() {
    console.log(this.state);
    return (
      <>
        <div className='table_title'>날짜별 유입 통계</div>
        {this.state.showdata ? (
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>신규방문자</th>
                <th style={{ width: '100px' }}>재방문자</th>
                <th>총 유입수</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.state.showdata)
                .sort((a, b) => a - b)
                .map((e, i) => (
                  <tr key={i}>
                    <td>{e}</td>
                    <td>{this.state.showdata[e].new}</td>
                    <td>{this.state.showdata[e].num - this.state.showdata[e].new}</td>
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

export default Newuser;
