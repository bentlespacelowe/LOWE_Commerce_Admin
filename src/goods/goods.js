import React, { Component } from 'react';
import axios from 'axios';
import './goods.css';
import { Link } from 'react-router-dom';
import Header from '../Header';

class goods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      search: '',
    };
  }

  componentDidMount = () => {
    axios
      .post('http://15.165.44.114:5000/getAllBoard', {})
      .then((res) => {
        this.setState({ data: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handledeleteBoard = (e) => () => {
    axios
      .post('http://15.165.44.114:5000/removeBoard', {
        id: e,
      })
      .then((res) => {
        window.location.replace('/goods');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleInputSearch = () => {
    let keyword = this.state.search;
    console.log(keyword);
    axios
      .post('http://15.165.44.114:5000/search', {
        keyword: keyword,
      })
      .then((res) => {
        this.setState({ data: res.data, result: true });
        console.log(res.data);
      })
      .catch((err) => {
        console.log('에러');
      });
  };

  onclickEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleInputSearch();
    }
  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value, result: false });
    axios
      .post('http://15.165.44.114:5000/search', {
        keyword: e.target.value,
      })
      .then((res) => {
        this.setState({ name: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log('에러');
      });
  };

  render() {
    return (
      <section id='good'>
        <Header list={2} />
        <div style={{ fontWeight: '700', fontSize: '15px', margin: '10px' }}>
          <a href='/board/create'>상품 추가</a>
        </div>
        <div style={{ width: '100%', justifyContent: 'space-between', height: '60px', paddingTop: '90px' }}>
          <span className='table_title'>상품 목록</span>
          <span>
            <input
              onKeyPress={this.onclickEnter}
              onChange={this.handleInputValue('search')}
              className='goods_input'
              placeholder='제목을 입력해주세요'
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
                <th>제목</th>
                <th>장소</th>
                <th>디자이너</th>
                <th>공개여부</th>
                <th>클릭수</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.store}</td>
                  <td>{e.designer_name}</td>
                  <td>{e.open === '1' ? '공개' : '비공개'}</td>
                  <td>{e.visit}</td>
                  <td>
                    <a href={'good/' + e.id}>상품 확인</a>
                  </td>
                  <td>
                    <Link
                      to={{
                        pathname: '/board/edit/' + e.id,
                        state: {
                          data: { board: e },
                        },
                      }}
                    >
                      <div>수정</div>
                    </Link>
                  </td>
                  <td>
                    <div onClick={this.handledeleteBoard(e.id)}>상품 삭제</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>상품이 없습니다</div>
        )}
      </section>
    );
  }
}

export default goods;
