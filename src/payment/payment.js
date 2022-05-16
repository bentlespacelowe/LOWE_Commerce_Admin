import React, { Component, useState } from 'react';
import axios from 'axios';
import './payment.css';
import ModalPay from './modalPay';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { ko } from 'date-fns/esm/locale';
// import moment from 'moment';
import Header from '../Header';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showdata: [],
      date: [],
      pay: [],
      done: [],
      refund: [],
      waiting: [],
      alldata: [],
      detail: '',
      open: false,
      total_price: 0,
      refund_price: 0,
      startdate: '',
      enddate: '',
      filter: 0,
      search: '',
      hover: false,
      hoverClassName: '',
      isActive: null,
    };
  }

  hoverOn = () => {
    this.setState({ hover: true });
    this.setState({ hoverClassName: 'payment_table_click' });
  };
  hoverOff = () => {
    this.setState({ hover: false });
    this.setState({ hoverClassName: '' });
  };

  toggleActive = (i) => {
    //Remove the if statement if you don't want to unselect an already selected item
    if (i === this.state.isActive) {
      this.setState({
        isActive: null,
      });
    } else {
      this.setState({
        isActive: i,
      });
    }
  };

  // https://reactdatepicker.com/ 참고
  ExampleCustomInput = ({ value, onClick }) => (
    <button class='example-custom-input' onClick={onClick}>
      {' '}
      {value}{' '}
    </button>
  );
  // 월/일
  getFormattedDate = (date) => {
    const month = date.toLocaleDateString('ko-KR', { month: 'long' });
    const day = date.toLocaleDateString('ko-KR', { day: 'numeric' });
    return `${month.substr(0, month.length - 1)}/${day.substr(0, day.length - 1)}`;
  };
  // 요일 반환
  getDayName = (date) => {
    return date.toLocaleDateString('ko-KR', { weekday: 'long' }).substr(0, 1);
  };
  // 날짜 비교시 년 월 일까지만 비교하게끔
  createDate = (date) => {
    return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
  };

  onClickkakao = () => {};
  componentDidMount = () => {
    const btn = document.querySelector('.btn-select');
    const list = document.querySelector('.list-member');
    btn.addEventListener('click', () => {
      list.classList.toggle('on');
      btn.classList.toggle('on');
    });
    list.addEventListener('click', (event) => {
      if (event.target.nodeName === 'BUTTON') {
        btn.innerText = event.target.innerText;
        list.classList.remove('on');
      }
    });

    axios
      .post('http://15.165.44.114:5000/alert', {
        type: 4,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    axios.post('http://15.165.44.114:5000/getPayment', {}).then((res) => {
      let date = [];
      let pay = [];
      let done = [];
      let refund = [];
      let waiting = [];
      let showdata = [];
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].state === '환불완료') {
          refund.unshift(res.data[i]);
        } else if (res.data[i].state === '환불대기') {
          waiting.unshift(res.data[i]);
        } else if (res.data[i].state === '시술완료') {
          done.unshift(res.data[i]);
        } else if (res.data[i].state === '예약확정') {
          date.unshift(res.data[i]);
        } else {
          pay.unshift(res.data[i]);
        }
        showdata.unshift(res.data[i]);
      }
      this.setState({
        date: date,
        pay: pay,
        done: done,
        refund: refund,
        waiting: waiting,
        data: res.data,
        alldata: showdata,
        showdata: showdata,
      });
      let total_price = 0;
      let refund_price = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].state === '환불완료') {
          refund_price = refund_price + Number(res.data[i].pay_total);
        }
        total_price = total_price + Number(res.data[i].pay_total);
      }
      this.setState({ total_price: total_price, refund_price: refund_price });
    });
  };

  openModalDetail = (e) => () => {
    this.setState({ detail: e });
    this.setState({ open: true });
  };

  closeModaldetail = () => {
    this.setState({ open: false });
  };

  handleInputValue = (key) => (e) => {
    if (key === 'startdate') {
      this.setState({ [key]: e.target.value, nextdate: e.target.value });
    } else {
      this.setState({ [key]: e.target.value });
    }
  };

  selectFilter = (v) => (e) => {
    this.setState({ filter: v });
    if (Number(v) === 0) {
      this.setState({ showdata: this.state.alldata });
    } else if (Number(v) === 1) {
      this.setState({ showdata: this.state.pay });
    } else if (Number(v) === 2) {
      this.setState({ showdata: this.state.date });
    } else if (Number(v) === 3) {
      this.setState({ showdata: this.state.done });
    } else if (Number(v) === 4) {
      this.setState({ showdata: this.state.waiting });
    } else if (Number(v) === 5) {
      this.setState({ showdata: this.state.refund });
    }
  };

  onClickgetClick = async () => {
    this.setState({
      exp: [],
      use: [],
      all: [],
      notuse: [],
      data: [],
    });
    axios
      .post('http://15.165.44.114:5000/getPayment', {
        startDate: this.state.startdate + ' 00:00:00',
        endDate: this.state.enddate + ' 23:59:59',
      })
      .then((res) => {
        let date = [];
        let pay = [];
        let done = [];
        let refund = [];
        let waiting = [];
        let showdata = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].state === '환불완료') {
            refund.unshift(res.data[i]);
          } else if (res.data[i].state === '환불대기') {
            waiting.unshift(res.data[i]);
          } else if (res.data[i].state === '시술완료') {
            done.unshift(res.data[i]);
          } else if (res.data[i].state === '예약확정') {
            date.unshift(res.data[i]);
          } else {
            pay.unshift(res.data[i]);
          }
          showdata.unshift(res.data[i]);
        }
        this.setState({
          date: date,
          pay: pay,
          done: done,
          refund: refund,
          waiting: waiting,
          data: res.data,
          alldata: showdata,
          showdata: showdata,
        });
        let total_price = 0;
        let refund_price = 0;
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].state === '환불완료') {
            refund_price = refund_price + Number(res.data[i].pay_total);
          }
          total_price = total_price + Number(res.data[i].pay_total);
        }
        this.setState({ total_price: total_price, refund_price: refund_price });
      });
  };

  handleInputSearch = () => {
    let keyword = this.state.search;
    let data = this.state.showdata;
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].payer_name.indexOf(keyword) !== -1 ||
        data[i].payer_hp.indexOf(keyword) !== -1 ||
        data[i].Board.designer_name.indexOf(keyword) !== -1 ||
        data[i].Board.name.indexOf(keyword) !== -1 ||
        data[i].Board.store.indexOf(keyword) !== -1
      ) {
        arr.push(data[i]);
      }
    }

    this.setState({ showdata: arr });
  };

  onclickEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleInputSearch();
    }
  };

  highlightTR = (target, backColor, textColor) => {
    var orgBColor = '#ffffff';
    var orgTColor = '#000000';
    var tbody = target.parentNode;
    var trs = tbody.getElementsByTagName('tr');
    for (var i = 0; i < trs.length; i++) {
      if (trs[i] !== target) {
        trs[i].style.backgroundColor = orgBColor;
        trs[i].style.color = orgTColor;
      } else {
        trs[i].style.backgroundColor = backColor;
        trs[i].style.color = textColor;
      }
    } // endfor i
  };

  stateFilter = () => {
    const btn = document.querySelector('.btn-select');
    const list = document.querySelector('.list-member');
    btn.addEventListener('click', () => {
      list.classList.toggle('on');
      btn.classList.toggle('on');
    });
    list.addEventListener('click', (event) => {
      if (event.target.nodeName === 'BUTTON') {
        btn.innerText = event.target.innerText;
        list.classList.remove('on');
      }
    });
  };

  render() {
    let login = window.localStorage.getItem('login');
    console.log(this.state);

    return (
      <>
        <Header list={8} />
        <section id='payment'>
          <div id='payment_content'>
            <div className='payment_title_search'>
              <span className='table_title'>결제 내역</span>
              <span className='payment_search'>
                <input
                  className='payment_search_input'
                  onKeyPress={this.onclickEnter}
                  onChange={this.handleInputValue('search')}
                  placeholder='Search'
                  type='text'
                />
                <img
                  onClick={this.handleInputSearch}
                  className='payment_search_btn'
                  src={process.env.PUBLIC_URL + '/image/nav/header_search.svg'}
                  alt='로위 서치'
                />
              </span>
            </div>
            <div className='payment_filter'>
              <div>
                <article class='cont-select'>
                  <button class='btn-select'>전체보기</button>
                  <ul class='list-member'>
                    <li>
                      <button type='button' onClick={this.selectFilter(0)}>
                        전체보기
                      </button>
                    </li>
                    <li>
                      <button type='button' onClick={this.selectFilter(1)}>
                        결제완료
                      </button>
                    </li>
                    <li>
                      <button type='button' onClick={this.selectFilter(2)}>
                        예약확정
                      </button>
                    </li>
                    <li>
                      <button type='button' onClick={this.selectFilter(3)}>
                        시술완료
                      </button>
                    </li>
                    <li>
                      <button type='button' onClick={this.selectFilter(4)}>
                        환불대기
                      </button>
                    </li>
                    <li>
                      <button type='button' onClick={this.selectFilter(5)}>
                        환불완료
                      </button>
                    </li>
                  </ul>
                </article>
              </div>

              <div>
                <input className='Payment_filter_date' type='date' onChange={this.handleInputValue('startdate')} />
                {' ~ '}
                <input className='Payment_filter_date' type='date' onChange={this.handleInputValue('enddate')} />
                <button className='payment_filter_search_btn' onClick={this.onClickgetClick} type='submit'>
                  검색하기
                </button>
                {login === 'admin' ? (
                  <ReactHTMLTableToExcel
                    id='tableToExcelBtn'
                    className='download-table-xls-button'
                    table='paymentdata'
                    filename='결제 내역'
                    sheet='tableSheet'
                    buttonText='결제내역 다운로드'
                  />
                ) : null}
              </div>
            </div>
            {login === 'admin' ? (
              <div className='Payment_data'>
                <div className='Payment_current_data'>
                  <div className='Payment_data_title'>결제현황</div>
                  <div className='Payment_data_content'>
                    <div className='Payment_data_content_data'>
                      {((this.state.total_price - this.state.refund_price) / 10000).comma()}만원
                      <div className='Payment_data_content_type'>총 매출</div>
                    </div>
                    <div className='Payment_data_content_data'>
                      {this.state.data.length.comma()}건<div className='Payment_data_content_type'>총 건수</div>
                    </div>
                    <div className='Payment_data_content_data'>
                      {(this.state.total_price / 10000).comma()}만원<div className='Payment_data_content_type'>결제 금액</div>
                    </div>
                    <div className='Payment_data_content_data'>
                      {(this.state.refund_price / 10000).comma()}만원<div className='Payment_data_content_type'>환불 금액</div>
                    </div>
                  </div>
                </div>

                <div className='Payment_proceeding_data'>
                  <div className='Payment_data_title'>진행현황</div>
                  <div className='Payment_data_content'>
                    <div className='Payment_data_content_data'>
                      {this.state.pay.length}건<div className='Payment_data_content_type'>결제 완료</div>
                    </div>
                    <div className='Payment_data_content_data'>
                      {this.state.date.length}건<div className='Payment_data_content_type'>예약 확정</div>
                    </div>
                    <div className='Payment_data_content_data'>
                      {this.state.done.length}건<div className='Payment_data_content_type'>시술 완료</div>
                    </div>
                    <div className='Payment_data_content_data'>
                      {this.state.waiting.length}건<div className='Payment_data_content_type'>환불 대기</div>
                    </div>
                    <div className='Payment_data_content_data'>
                      {this.state.refund.length}건<div className='Payment_data_content_type'>환불 완료</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {this.state.showdata ? (
              <div class='Payment_table'>
                <table id='paymentdata'>
                  <thead>
                    <tr>
                      <th className='table_th_no'>NO.</th>
                      <th className='table_th_goods'>상품</th>
                      <th className='table_th_store'>지점</th>
                      <th className='table_th_designer'>디자이너</th>
                      <th className='table_th_user_name'>고객명</th>
                      <th className='table_th_user_id'>고객ID</th>
                      <th className='table_th_price'>결제 금액</th>
                      <th className='table_th_discount_price'>할인 금액</th>
                      <th className='table_th_total_price'>총금액</th>
                      <th className='table_th_payment_time'>결제 시간</th>
                      <th className='table_th_reserve_time'>예약 시간</th>
                      <th className='table_th_state'>진행 상황</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.showdata.length ? (
                      this.state.showdata.map((e, i) => (
                        // <tr key={i} className={e.state === '환불완료' ? ' text-deco' : ' none-deco'} onClick={this.highlightTR(e, '#c9cc99', 'cc3333')}>
                        // <tr style={this.state.isActive === i ? style : { background: 'white' }} key={i} onClick={() => this.toggleActive(i)}>
                        <tr
                          className={
                            (e.state === '환불완료' ? ' text-deco' : e.refund_total ? ' partial_refund' : ' none-deco') +
                            (this.state.isActive === i ? ' payment_table_click' : '')
                          }
                          key={i}
                          onClick={() => this.toggleActive(i)}
                        >
                          <td className='table_td_no'>{e.Board.id === 122 || !e.Board.id ? null : e.Board.id}</td>
                          <td className={'table_td_goods'}>
                            <div>
                              <a href={e.BoardId === 122 ? null : 'https://lowehair.kr/board/' + e.BoardId}>{e.pay_goods}</a>
                            </div>
                          </td>
                          <td className='table_td_store'>{e.Manager.store}</td>
                          <td className='table_td_designer'>{e.Manager.name}</td>
                          <td className='table_td_user_name'>{e.User.name}</td>
                          <td className='table_td_user_id'>{e.User.login_id}</td>
                          <td className='table_td_price'>{e.refund_total ? e.pay_total - e.refund_total : e.pay_total.comma()}</td>
                          <td className='table_td_discount_price'>
                            {e.event_price ? (e.event_price - Number(e.pay_amount)).comma() : (e.list_price - Number(e.pay_amount)).comma()}
                          </td>
                          <td className='table_td_total_price'>{e.event_price ? e.event_price.comma() : e.list_price.comma()}</td>
                          <td className='table_td_payment_time'>
                            {e.pay_time.slice(2, 4)}-{e.pay_time.slice(4, 6)}-{e.pay_time.slice(6, 8)} {e.pay_time.slice(8, 10)}:
                            {e.pay_time.slice(10, 12)}
                          </td>
                          <td className='table_td_reserve_time'>{e.surgery_date ? e.surgery_date.slice(2, e.surgery_date.length) : null}</td>
                          <td className='table_td_state'>
                            <div
                              className={
                                'pay_statement ' +
                                (e.state === '결제완료'
                                  ? 'payment_complete'
                                  : e.state === '예약확정'
                                  ? 'reserve_complete'
                                  : e.state === '시술완료'
                                  ? 'surgery_complete'
                                  : e.state === '환불대기'
                                  ? 'refund_request'
                                  : e.state === '환불완료'
                                  ? 'refund_complete'
                                  : null)
                              }
                            >
                              {e.state}{' '}
                            </div>
                          </td>
                          <td>
                            <div className='detail_button' onClick={this.openModalDetail(e)}>
                              상세보기
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className='none-deco'>
                        <td className='table_td_no'>-</td>
                        <td className={'table_td_goods'}></td>
                        <td className='table_td_store'></td>
                        <td className='table_td_designer'></td>
                        <td className='table_td_user_name'></td>
                        <td className='table_td_user_id'></td>
                        <td className='table_td_price'></td>
                        <td className='table_td_discount_price'></td>
                        <td className='table_td_total_price'></td>
                        <td className='table_td_payment_time'></td>
                        <td className='table_td_reserve_time'></td>
                        <td className='table_td_state'></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </section>
        <ModalPay open={this.state.open} close={this.closeModaldetail} data={this.state.detail} />
      </>
    );
  }
}

export default Payment;
