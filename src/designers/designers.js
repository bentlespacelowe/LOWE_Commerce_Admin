import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './designers.css';
import Header from '../Header';

class designers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      alldata: '',
      search: '',
    };
  }

  componentDidMount = () => {
    axios
      .post('https://server.lowehair.kr/getDesignerList', {})
      .then((res) => {
        this.setState({ data: res.data, alldata: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleInputSearch = () => {
    let keyword = this.state.search;
    let data = this.state.alldata;
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].name.indexOf(keyword) !== -1) {
        arr.push(data[i]);
      }
    }

    this.setState({ data: arr });
  };

  onclickEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleInputSearch();
    }
  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    return (
      <section id='designer'>
        <Header list={3} />
        <div style={{ fontWeight: '700', fontSize: '15px', margin: '10px' }}>
          <a href='/designer/create'>디자이너 추가</a>
        </div>

        <div style={{ width: '100%', justifyContent: 'space-between', height: '60px', paddingTop: '90px' }}>
          <span className='table_title'>디자이너 목록</span>
          <span>
            <input
              onChange={this.handleInputValue('search')}
              onKeyPress={this.onclickEnter}
              className='goods_input'
              placeholder='이름을 입력해주세요'
              type='text'
            ></input>

            <img
              onClick={this.handleInputSearch}
              className='goods_search'
              src={process.env.PUBLIC_URL + '/image/nav/header_search.svg'}
              alt='로위 서치'
            />
          </span>
        </div>
        {this.state.data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>이름</th>
                <th>지점</th>
                <th>해쉬태그</th>
                <th>쿠폰유무</th>
                <th>즐겨찾기</th>
                <th>예약</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.store}</td>
                  <td>{e.Hashtags.length ? <>{e.Hashtags[0].content}</> : '없음'}</td>
                  <td>{JSON.parse(e.coupons) ? '있음' : '없음'}</td>
                  <td>{e.Favorites.length}개</td>
                  <td>{e.reserve_url}</td>
                  <td>
                    <Link
                      to={{
                        pathname: '/designer/edit/' + e.id,
                        state: {
                          e,
                        },
                      }}
                    >
                      수정
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>디자이너가 없습니다</div>
        )}
      </section>
    );
  }
}

export default designers;
