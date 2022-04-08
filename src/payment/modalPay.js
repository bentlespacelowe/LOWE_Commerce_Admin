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

    handleMakeres = () => {
        let date = this.state.surgery_date
        let time = this.state.surgery_time
        let surgery_date = date + " " +time
        console.log(surgery_date);
        if(date && time){

        axios.post('http://3.36.218.192:5000/updatePayment', {
            id: Number(this.props.data.id), //결제 DB 상의 id 값
            state: '예약확정', //원하시는 형태로 결제 상태 입력해주세요!
            surgery_date: surgery_date,
        }).then((res)=>{
            window.alert("예약이 완료되었습니다")
        }).catch((err)=>{
            console.log(err)
        });

        } else {
            window.alert("시간을 설정해주세요")
        }
    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    render() {
        const { open, data } = this.props;
        console.log(this.props)
        return (
            <>
                {open ? (
                    <div className="Signup_modalBody">
                        <div className="modalclick" onClick={this.handleClose}></div>
                        <div className="Signup_modalInner">
                            <div className="payment_modal_request">
                                <div className="payment_modal_request_title">시간 설정 / 환불</div>
                                <div className="payment_modal_refund_title">시간 설정</div>
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
                                        data.cancel_reason ?
                                            <div style={{ marginLeft: "12px", font: "700 14px 'Noto Sans", marginBottom: "5px" }} >
                                                환불사유: {data.cancel_reason}
                                            </div> : null
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
                                <div className="payment_modal_request_title">요청사항</div>
                                {data.user_request ?
                                    <div className="payment_modal_request_content"><pre>{data.user_request}</pre></div> :
                                    <div></div>
                                }
                                <div className="payment_modal_request_img">
                                    {data.Images.length ?
                                        data.Images.map((e) => (
                                            <img src={e.url} alt={e.id} />
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