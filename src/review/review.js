import { Component } from 'react';
import axios from 'axios';
import Header from '../Header';

class review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      text: '',
      number: 0,
      used: 0,
    };
  }

  componentDidMount = () => {
    axios.post('http://15.165.44.114:5000/getAllReview', {}).then((res) => {
      this.setState({ data: res.data, number: res.data.length });
    });
  };

  render() {
    console.log(this.state.data);
    return (
      <section id='coupon'>
        <Header list={6} />
        <div>총 {this.state.number}개</div>
        {this.state.data ? (
          <table>
            <thead>
              <tr>
                <th></th>
                <th>탈색</th>
                <th>모량</th>
                <th>모질</th>
                <th>포토리뷰</th>
                <th>링크</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.hair_amout === '1' ? '숱 적음' : e.hair_amout === '2' ? '숱 보통' : '숱 많음'}</td>
                  <td>{e.hair_color === '1' ? '탈색했음' : '탈색안함'}</td>
                  <td>{e.hair_thick === '1' ? '곱슬' : e.hair_thick === '2' ? '반곱슬' : '직모'}</td>
                  <td>{e.Images.length ? '있음' : '없음'}</td>
                  <td>
                    <a href={`https://lowehair.kr/board/${e.BoardId}`}>글 보러가기</a>
                  </td>
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

export default review;
