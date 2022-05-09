import React from 'react';
import './modalPay.css';
import axios from 'axios';
import NumberFormat from 'react-number-format';

class modalPay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refundprice: '',
      surgery_date: '',
      surgery_time: '',
    };
  }

  handleClose = () => {
    this.props.close();
  };

  handleReservation = () => {
    axios
      .post('http://54.180.117.244:5000/updatePayment', {
        id: Number(this.props.mypayment.id), //결제 DB 상의 id 값
        state: '시술', //원하시는 형태로 결제 상태 입력해주세요!
      })
      .then((res) => {
        window.location.replace('/mypayments');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleRefundAll = (value) => (e) => {
    e.preventDefault();
    let price = 0;
    if (value === '100') {
      price = this.props.data.pay_total;
    } else if (value === '90') {
      price = Math.round(Number(this.props.data.pay_total) * 0.9);
    } else {
      price = this.state.refundprice;
      if (this.state.refundprice > Number(this.props.data.pay_total)) {
        window.alert('결제 금액보다 금액이 큽니다');
      }
    }
    console.log(price);
    axios
      .post('http://54.180.117.244:5000/payAuth', {
        PCD_PAYCANCEL_FLAG: 'Y',
      })
      .then((authResult) => {
        axios
          .post('http://54.180.117.244:5000/refund', {
            ...authResult.data,
            payment_id: this.props.data.id, //Payment 아이디!
            PCD_REFUND_TOTAL: price, //결제취소 요청금액 (기존 결제금액보다 적은 금액 입력 시 부분취소로 진행)
            state: '환불완료',
          })
          .then((refundResult) => {
            if (refundResult.data.PCD_PAY_MSG === '승인취소성공') {
              window.alert('환불 성공!!');
            } else {
              window.alert('환불 실패 ');
            }
          });
      })
      .catch((err) => {
        console.error(err);
        window.alert(err);
      });
  };

  onClickkakao = () => {
    axios
      .post('http://54.180.117.244:5000/alert', {
        type: 3,
        PaymentId: this.props.data.id,
      })
      .then((res) => {
        window.alert('예약이 완료되었습니다');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleMakeres = () => {
    let date = this.state.surgery_date;
    let time = this.state.surgery_time;
    let surgery_date = date + ' ' + time;
    console.log(surgery_date);
    if (date && time) {
      axios
        .post('http://54.180.117.244:5000/updatePayment', {
          id: Number(this.props.data.id), //결제 DB 상의 id 값
          state: '예약확정', //원하시는 형태로 결제 상태 입력해주세요!
          surgery_date: surgery_date,
        })
        .then((res) => {
          this.onClickkakao();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert('시간을 설정해주세요');
    }
  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  onClickUse = (e) => () => {
    axios
      .post('http://54.180.117.244:5000/updateCoupon', {
        id: e.id,
      })
      .then((res) => {
        window.location.reload();
      });
  };

  render() {
    let login = window.localStorage.getItem('login');
    const { open, data } = this.props;
    console.log(this.props);
    return (
      <section id='modalPay'>
        {open ? (
          <div className='Signup_modalBody'>
            <div className='modalclick' onClick={this.handleClose}></div>
            <div className='modal_inner_total'>
              <div className='Signup_modalInner'>
                <div className='payment_modal_info'>
                  <div className='payment_modal_title'>상품 정보</div>
                  <table>
                    <thead>
                      <tr>
                        <th>상품</th>
                        <th>지점</th>
                        <th>디자이너</th>
                        <th>할인 금액</th>
                        <th>총 금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a href={data.BoardId ? 'https://lowehair.kr/board/' + data.BoardId : null}>{data.pay_goods}</a>
                        </td>
                        <td>{data.Manager.store}</td>
                        <td>{data.Manager.name}</td>
                        <td>
                          {data.event_price
                            ? (data.event_price - Number(data.pay_amount)).comma()
                            : (data.list_price - Number(data.pay_amount)).comma()}
                          원
                        </td>
                        <td>{data.event_price ? data.event_price.comma() : data.list_price.comma()}원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='payment_modal_reserve'>
                  <div className='payment_modal_title'>예약</div>
                  <div className='payment_modal_reserve_info'>
                    <div className='payment_modal_reserve_setting'>
                      <div className='payment_modal_little_title'>예약 설정</div>
                      <div className='payment_modal_reserve_time'>
                        <input
                          className='payment_modal_reserve_date'
                          type='date'
                          value={data.surgery_date ? data.surgery_date.split(' ')[0] : null}
                          onChange={this.handleInputValue('surgery_date')}
                        />
                        <input
                          className='payment_modal_reserve_hours'
                          type='time'
                          step='900'
                          value={data.surgery_date ? data.surgery_date.split(' ')[1] : null}
                          onChange={this.handleInputValue('surgery_time')}
                        />
                        <button className='payment_modal_reserve_btn' onClick={this.handleMakeres}>
                          예약수정
                        </button>
                      </div>
                    </div>

                    {data.surgery_date ? (
                      <div className='payment_modal_reserve_confirm'>
                        <div className='payment_modal_little_title'>예약설정 확인</div>
                        <div className='payment_modal_date'>
                          <div className='payment_modal_date_type'>일자</div>
                          <div className='payment_modal_date_data'>{data.surgery_date.split(' ')[0]}</div>
                          <div className='payment_modal_date_type'>시간</div>
                          <div className='payment_modal_date_data hour'>{data.surgery_date.split(' ')[1]}</div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='payment_modal_refund'>
                  <div className='payment_modal_title'>환불</div>
                  <div className='payment_modal_refund_request'>
                    <div className='payment_modal_refund_rate'>
                      <div className='payment_modal_little_title'>환불율</div>
                      {data.state === '환불대기' ? (
                        <div className='payment_modal_refund_rate_btn'>
                          <button className='payment_modal_refund_rate_btn' onClick={this.handleRefundAll('100')}>
                            100%
                          </button>
                          <button className='payment_modal_refund_rate_btn' onClick={this.handleRefundAll('90')}>
                            90%
                          </button>
                        </div>
                      ) : (
                        <div className='payment_modal_refund_rate_btn'>
                          <button
                            className='payment_modal_refund_rate_btn'
                            onClick={() => {
                              window.alert('환불대기 중인 결제내역이 아닙니다');
                            }}
                          >
                            100%
                          </button>
                          <button
                            className='payment_modal_refund_rate_btn'
                            onClick={() => {
                              window.alert('환불대기 중인 결제내역이 아닙니다');
                            }}
                          >
                            90%
                          </button>
                        </div>
                      )}
                    </div>
                    <div className='payment_modal_refund_manual'>
                      <div className='payment_modal_little_title'>환불금액</div>
                      <NumberFormat
                        className='payment_modal_refund_manual_input'
                        thousandSeparator={true}
                        suffix={'원'}
                        placeholder='000,000원'
                        onChange={this.handleInputValue('refundprice')}
                      />
                      <button className='payment_modal_refund_manual_btn' onClick={this.handleRefundAll('')}>
                        환불하기
                      </button>
                    </div>
                  </div>
                  {data.cancel_reason || data.request_refund_time ? (
                    <div className='payment_modal_refund_data'>
                      <div className='payment_modal_refund_request_time'>
                        <div className='payment_modal_little_title'>환불 요청시간</div>
                        <div className='payment_modal_date'>
                          <div className='payment_modal_date_type'>일자</div>
                          <div className='payment_modal_date_data'>{data.request_refund_time.split(' ')[0]}</div>
                          <div className='payment_modal_date_type'>시간</div>
                          <div className='payment_modal_date_data'>{data.request_refund_time.split(' ')[1].slice(0, 5)}</div>
                        </div>
                      </div>
                      <div className='payment_modal_refund_reason'>
                        <div className='payment_modal_little_title'>환불사유</div>
                        <div className='payment_modal_text'>{data.cancel_reason}</div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className='payment_modal_coupon'>
                  <div className='payment_modal_title'>사용 쿠폰</div>
                  {data.Coupons.length ? (
                    <table>
                      <thead>
                        <tr>
                          <th className='payment_modal_little_title'>금액</th>
                          <th className='payment_modal_little_title'>쿠폰명</th>
                          <th className='payment_modal_little_title'>쿠폰 사용 여부</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.Coupons.map((e) => (
                          <tr key={e.id}>
                            <td>{e.price}원</td>
                            <td>{e.content}</td>
                            <td>
                              <div className='payment_modal_coupon_state'>
                                <div className={e.used === 1 ? 'payment_modal_coupon_unused' : 'payment_modal_coupon_used'}>
                                  {e.used === 1 ? '미사용' : '사용완료'}
                                </div>
                                <div className={'payment_modal_coupon_state_change_btn'} onClick={this.onClickUse(e)}>
                                  {e.used === 1 ? '사용하기' : '사용취소'}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th className='payment_modal_little_title'>금액</th>
                          <th className='payment_modal_little_title'>쿠폰명</th>
                          <th className='payment_modal_little_title'>쿠폰 사용 여부</th>
                        </tr>
                      </thead>
                      <tbody>
                        <td>-</td>
                        <td></td>
                        <td></td>
                      </tbody>
                    </table>
                  )}
                </div>
                <div className='payment_modal_user_info'>
                  <div className='payment_modal_title'>고객 정보</div>
                  <table>
                    <thead>
                      <tr className='payment_modal_little_title'>
                        <th>고객명</th>
                        <th>고객ID</th>
                        <th>성별</th>
                        <th>전화번호</th>
                        <th>이메일</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{data.User.name}</td>
                        <td>{data.User.login_id}</td>
                        <td>{data.User.gender === 1 ? '남성' : '여성'}</td>
                        <td>{data.User.phone}</td>
                        <td>{data.User.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='payment_modal_request'>
                  <div className='payment_modal_title'>고객 요청사항</div>
                  <div className='payment_modal_request_content'>
                    <div className='payment_modal_request_text'>{data.user_request ? data.user_request : '-'}</div>
                    <div className='payment_modal_request_img'>
                      {data.Images.length ? data.Images.map((e, i) => <img src={e.url} alt={e.id} key={i} />) : <div></div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className='close_btn' onClick={this.handleClose}>
                <img src={'/image/test/modal_close.svg'} alt='close' />
              </div>
            </div>
          </div>
        ) : null}
      </section>
    );
  }
}

export default modalPay;
