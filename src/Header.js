import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  componentDidMount = () => {};

  render() {
    let login = window.localStorage.getItem('login');
    return (
      <header className='header'>
        {login === 'admin' ? (
          <>
            <div style={{ marginBottom: '20px', font: '700 20px Montserrat', lineHeight: '80px' }}>
              <img src={'/image/nav/LOWE.svg'} alt='L O W E' />
            </div>
            <div className={this.props.list === 1 ? 'selected' : 'non_selected'}>
              <a href='/banners'>배너</a>
            </div>
            <div className={this.props.list === 2 ? 'selected' : 'non_selected'}>
              <a href='/goods'>상품</a>
            </div>
            <div className={this.props.list === 3 ? 'selected' : 'non_selected'}>
              <a href='/designers'>디자이너</a>
            </div>
            <div className={this.props.list === 4 ? 'selected' : 'non_selected'}>
              <a href='/users'>유저</a>
            </div>
            <div className={this.props.list === 5 ? 'selected' : 'non_selected'}>
              <a href='/coupons'>쿠폰</a>
            </div>
            <div className={this.props.list === 6 ? 'selected' : 'non_selected'}>
              <a href='/reviews'>리뷰</a>
            </div>
            <div className={this.props.list === 7 ? 'selected' : 'non_selected'}>
              <a href='/statistics'>통계</a>
            </div>
            <div className={this.props.list === 8 ? 'selected' : 'non_selected'}>
              <a href='/payments'>결제</a>
            </div>
          </>
        ) : login === 'store' ? (
          <>
            <div className={this.props.list === 4 ? 'selected' : 'non_selected'}>
              <a href='/users'>유저</a>
            </div>
            <div className={this.props.list === 8 ? 'selected' : 'non_selected'}>
              <a href='/payments'>결제</a>
            </div>
          </>
        ) : (
          <>
            <div className={!this.props.list ? 'selected' : 'non_selected'}>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  window.alert('권한이 없습니다');
                }}
              >
                배너
              </span>
            </div>
            <div>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  window.alert('권한이 없습니다');
                }}
              >
                상품
              </span>
            </div>
            <div>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  window.alert('권한이 없습니다');
                }}
              >
                디자이너
              </span>
            </div>
            <div>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  window.alert('권한이 없습니다');
                }}
              >
                유저
              </span>
            </div>
          </>
        )}
      </header>
    );
  }
}

export default Header;
