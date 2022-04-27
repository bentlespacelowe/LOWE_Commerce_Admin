import React from "react";
import "./modalPay.css";
import axios from "axios";

class modalPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refundprice: "",
            surgery_date: "",
            surgery_time: "",
        };
    }


    handleClose = () => {
        this.props.close();
    }

    handleReservation = () => {

        axios.post('http://3.36.218.192:5000/updatePayment', {
            id: Number(this.props.mypayment.id), //결제 DB 상의 id 값
            state: '시술', //원하시는 형태로 결제 상태 입력해주세요!
        }).then((res) => {
            window.location.replace('/mypayments')
        }).catch((err) => {
            console.log(err)
        });
    }

    handleRefundAll = (value) => (e) => {
        e.preventDefault();
        let price = 0
        if (value === "100") {
            price = this.props.data.pay_total;
        } else if (value === "90") {
            price = Math.round((Number(this.props.data.pay_total) * 0.9))
        } else {
            price = this.state.refundprice
            if (this.state.refundprice > Number(this.props.data.pay_total)) {
                window.alert("결제 금액보다 금액이 큽니다")
            }
        }
        console.log(price)
        axios
            .post('http://3.36.218.192:5000/payAuth', {
                PCD_PAYCANCEL_FLAG: 'Y',
            })
            .then((authResult) => {
                axios
                    .post('http://3.36.218.192:5000/refund', {
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
    }


    onClickkakao = () => {
        axios.post("http://3.36.218.192:5000/alert", {
            type: 3,
            PaymentId: this.props.data.id
        }).then((res) => {
            window.alert("예약이 완료되었습니다")
        }).catch((err) => {
            console.log(err)
        })

    }


    handleMakeres = () => {
        let date = this.state.surgery_date
        let time = this.state.surgery_time
        let surgery_date = date + " " + time
        console.log(surgery_date);
        if (date && time) {

            axios.post('http://3.36.218.192:5000/updatePayment', {
                id: Number(this.props.data.id), //결제 DB 상의 id 값
                state: '예약확정', //원하시는 형태로 결제 상태 입력해주세요!
                surgery_date: surgery_date,
            }).then((res) => {
                this.onClickkakao()
            }).catch((err) => {
                console.log(err)
            });

        } else {
            window.alert("시간을 설정해주세요")
        }
    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    onClickUse = (e) => () => {
        axios.post("http://3.36.218.192:5000/updateCoupon", {
            id: e.id,
        }).then((res) => {
            window.location.reload();
        });
    }

    render() {
        let login = window.localStorage.getItem("login");
        const { open, data } = this.props;
        console.log(this.props)
        return (
            <>
                {open ? (
                    <div className="Signup_modalBody">
                        <div className="modalclick" onClick={this.handleClose}></div>
                        <div className="Signup_modalInner">
                            <div className="payment_modal_request">
                                <div className="payment_modal_request_title">상품 정보</div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "250px" }}>상품(이름 클릭시 이동)</th>
                                            <th>디자이너</th>
                                            <th>실제가격</th>
                                            <th>할인가격</th>
                                            <th>지점</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><a href={data.BoardId ? "https://lowehair.kr/board/" + data.BoardId : null}>{data.pay_goods}</a></td>
                                            <td>{data.Manager.name}</td>
                                            <td>{data.event_price ? data.event_price : data.list_price}원</td>
                                            <td>{data.event_price ? data.event_price - Number(data.pay_amount) : data.list_price - Number(data.pay_amount)}원</td>
                                            <td>{data.Manager.store}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="payment_modal_request">
                                <div className="payment_modal_request_title">예약 설정 {login === "admin" ? "/ 환불" : "/ 변경"}</div>
                                <div className="payment_modal_refund_title">예약 설정</div>
                                <div>
                                    {
                                        data.surgery_date ?
                                            <div style={{ marginLeft: "12px", font: "700 14px 'Noto Sans", marginBottom: "5px" }} >
                                                예약시간: {data.surgery_date}
                                            </div> : null
                                    }
                                </div>
                                <div>
                                    <input style={{ marginLeft: "12px" }} type="date" onChange={this.handleInputValue("surgery_date")} />
                                    <input style={{ marginLeft: "12px" }} type="time" onChange={this.handleInputValue("surgery_time")} />
                                    <button onClick={this.handleMakeres} >예약</button>
                                </div>
                                <div className="payment_modal_refund_title">환불</div>
                                <div>
                                    {
                                        data.cancel_reason || data.request_refund_time ?
                                            <>
                                                <div style={{ marginLeft: "12px", font: "700 14px 'Noto Sans", marginBottom: "5px" }} >
                                                    환불사유: {data.cancel_reason}
                                                </div>
                                                <div style={{ marginLeft: "12px", font: "700 14px 'Noto Sans", marginBottom: "5px" }} >환불요청시간: {data.request_refund_time}</div>
                                            </> : null
                                    }
                                </div>
                                <div>
                                    {data.state === "환불대기" ?
                                        <>
                                            <button style={{ marginLeft: "12px" }} onClick={this.handleRefundAll("100")}>100%</button>
                                            <button style={{ marginLeft: "12px" }} onClick={this.handleRefundAll("90")}>90%</button>
                                        </> :
                                        <>
                                            <button style={{ marginLeft: "12px" }} onClick={() => { window.alert("환불대기 중인 결제내역이 아닙니다") }}>100%</button>
                                            <button style={{ marginLeft: "12px" }} onClick={() => { window.alert("환불대기 중인 결제내역이 아닙니다") }}>90%</button>
                                        </>
                                    }
                                    <input style={{ marginLeft: "12px" }} type="number" onChange={this.handleInputValue("refundprice")} />
                                    <button onClick={this.handleRefundAll("")} >환불</button>
                                </div>
                            </div>
                            <div className="payment_modal_request">
                                <div className="payment_modal_request_title">사용 쿠폰</div>
                                {data.Coupons.length ?
                                    <table style={{ marginTop: "0px" }}>
                                        <thead>
                                            <tr>
                                                <th>금액</th>
                                                <th>용도</th>
                                                <th>사용</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.Coupons.map((e) => (
                                                <tr key={e.id}>
                                                    <td>{e.price}원</td>
                                                    <td>{e.content}</td>
                                                    <td>{e.used === 1 ? "미사용" : "사용"}</td>
                                                    <td><p onClick={this.onClickUse(e)}>수정</p></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    :
                                    <div style={{ marginLeft: "12px" }}>사용한 쿠폰이 없습니다</div>
                                }
                            </div>
                            <div className="payment_modal_request">
                                <div className="payment_modal_request_title">유저정보</div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>성함</th>
                                            <th>아이디</th>
                                            <th>성별</th>
                                            <th>전화번호</th>
                                            <th>이메일</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{data.User.name}</td>
                                            <td>{data.User.login_id}</td>
                                            <td>{data.User.gender === 1 ? "남성" : "여성"}</td>
                                            <td>{data.User.phone}</td>
                                            <td>{data.User.email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="payment_modal_request">
                                <div className="payment_modal_request_title">요청사항</div>
                                {data.user_request ?
                                    <div className="payment_modal_request_content"><pre>{data.user_request}</pre></div> :
                                    <div className="payment_modal_request_content">요청사항 없음</div>
                                }
                                <div className="payment_modal_request_img">
                                    {data.Images.length ?
                                        data.Images.map((e, i) => (
                                            <img src={e.url} alt={e.id} key={i} />
                                        ))
                                        :
                                        <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </>
        );
    }
}

export default modalPay;