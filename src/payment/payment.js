import { Component } from "react";
import axios from "axios";
import Header from '../Header';
import "./payment.css"
import ModalPay from "./modalPay";

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
            detail: "",
            open: false,
            total_price: 0,
            refund_price: 0,
            startdate: "",
            enddate: "",
            filter: 0,
            search: "",
        };
    }

    onClickkakao = () => {
        axios.post("http://3.36.218.192:5000/alert", {
            type: 4
        }).then((res) => {
            window.alert("카톡을 보내셨습니다.")
        }).catch((err) => {
            console.log(err)
        })

    }
    componentDidMount = () => {
        axios.post("http://3.36.218.192:5000/getPayment", {
        }).then((res) => {
            let date = []
            let pay = []
            let done = []
            let refund = []
            let waiting = []
            let showdata = []
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].state === "환불완료") {
                    refund.unshift(res.data[i])
                } else if (res.data[i].state === "환불대기") {
                    waiting.unshift(res.data[i])
                } else if (res.data[i].state === "시술완료") {
                    done.unshift(res.data[i])
                } else if (res.data[i].state === "예약확정") {
                    date.unshift(res.data[i])
                } else {
                    pay.unshift(res.data[i])
                }
                showdata.unshift(res.data[i])
            }
            this.setState({ date: date, pay: pay, done: done, refund: refund, waiting: waiting, data: res.data, alldata: showdata, showdata: showdata })
            let total_price = 0
            let refund_price = 0
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].state === "환불완료") {
                    refund_price = refund_price + Number(res.data[i].pay_total)
                }
                total_price = total_price + Number(res.data[i].pay_total)
            }
            this.setState({ total_price: total_price, refund_price: refund_price })
        });
    }

    openModalDetail = (e) => () => {
        this.setState({ detail: e })
        this.setState({ open: true })

    }

    closeModaldetail = () => {
        this.setState({ open: false })
    }

    handleInputValue = (key) => (e) => {
        if (key === "startdate") {
            this.setState({ [key]: e.target.value, nextdate: e.target.value });

        } else {
            this.setState({ [key]: e.target.value });
        }
    };

    selectFilter = (v) => (e) => {
        this.setState({ filter: e.target.value })
        if (Number(e.target.value) === 0) {
            this.setState({ showdata: this.state.alldata })
        } else if (Number(e.target.value) === 1) {
            this.setState({ showdata: this.state.pay })

        } else if (Number(e.target.value) === 2) {
            this.setState({ showdata: this.state.date })

        } else if (Number(e.target.value) === 3) {
            this.setState({ showdata: this.state.done })

        } else if (Number(e.target.value) === 4) {
            this.setState({ showdata: this.state.waiting })

        } else if (Number(e.target.value) === 5) {
            this.setState({ showdata: this.state.refund })

        }

    }

    onClickgetClick = async () => {
        this.setState({ 
            exp: [],
            use: [],
            all: [],
            notuse: [],
            data: [] })
        axios.post("http://3.36.218.192:5000/getPayment", {
            startDate: this.state.startdate + " 00:00:00",
            endDate: this.state.enddate + " 23:59:59"
        }).then((res) => {
            let date = []
            let pay = []
            let done = []
            let refund = []
            let waiting = []
            let showdata = []
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].state === "환불완료") {
                    refund.unshift(res.data[i])
                } else if (res.data[i].state === "환불대기") {
                    waiting.unshift(res.data[i])
                } else if (res.data[i].state === "시술완료") {
                    done.unshift(res.data[i])
                } else if (res.data[i].state === "예약확정") {
                    date.unshift(res.data[i])
                } else {
                    pay.unshift(res.data[i])
                }
                showdata.unshift(res.data[i])
            }
            this.setState({ date: date, pay: pay, done: done, refund: refund, waiting: waiting, data: res.data, alldata: showdata, showdata: showdata })
            let total_price = 0
            let refund_price = 0
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].state === "환불완료") {
                    refund_price = refund_price + Number(res.data[i].pay_total)
                }
                total_price = total_price + Number(res.data[i].pay_total)
            }
            this.setState({ total_price: total_price, refund_price: refund_price })
        });
    }

    handleInputSearch = () => {
        let keyword = this.state.search
        let data = this.state.showdata
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].payer_name.indexOf(keyword) !== -1 || data[i].payer_hp.indexOf(keyword) !== -1 || data[i].Board.designer_name.indexOf(keyword) !== -1 || data[i].Board.name.indexOf(keyword) !== -1 || data[i].Board.store.indexOf(keyword) !== -1) {
                arr.push(data[i]);
            }
        }

        this.setState({ showdata: arr });

    }

    render() {
        let login = window.localStorage.getItem("login");
        console.log(this.state)
        return (
            <>
                <section id="payment">
                    <Header list={8} />
                    <button onClick={this.onClickkakao}>시술완료 카톡</button>
                    <div style={{ width: "100%", justifyContent: "space-between", height: "60px", paddingTop: "90px" }}>
                        <span className="table_title">결제 내역</span>
                        <span >
                            <img onClick={this.handleInputSearch} className="goods_search" src={process.env.PUBLIC_URL + "/image/nav/header_search.svg"} alt="로위 서치" />
                            <input className="input" onChange={this.handleInputValue("search")} placeholder="입력해주세요" type="text"></input>

                        </span>
                    </div>
                    {login === "admin" ?
                        <>
                            <div>
                                <div style={{ paddingTop: "20px", marginRight: "50px", float: "left" }}>
                                    <div>결제 금액: {this.state.total_price}원</div>
                                    <div>결제 건수: {this.state.data.length}건</div>
                                    <div>환불 건수: {this.state.refund_price}원</div>
                                    <div>환불 건수: {this.state.refund.length}건</div>
                                    <div>총 매출: {this.state.total_price - this.state.refund_price}원</div>
                                </div>

                                <div style={{ paddingTop: "20px" }}>
                                    <div>시술완료: {this.state.done.length}건</div>
                                    <div>환불대기: {this.state.waiting.length}건</div>
                                    <div>예약확정: {this.state.date.length}건</div>
                                    <div>결제완료: {this.state.pay.length}건</div>
                                </div>
                            </div>
                        </> : null
                    }
                    <div style={{ marginTop: "50px" }}>
                        <select onChange={this.selectFilter("filter")}>
                            <option value={0}>전체보기</option>
                            <option value={1}>결제완료</option>
                            <option value={2}>예약확정</option>
                            <option value={3}>시술완료</option>
                            <option value={4}>환불대기</option>
                            <option value={5}>환불완료</option>
                        </select>
                    </div>

                    <div style={{ marginTop: "50px" }}>
                        <span>결제날짜: </span>
                        <input type="date" onChange={this.handleInputValue("startdate")} />~
                        <input type="date" onChange={this.handleInputValue("enddate")} />
                        <span><button onClick={this.onClickgetClick} style={{ marginLeft: "10px", width: "50px" }} type="submit">검색</button></span>
                    </div>
                    {
                        this.state.showdata ?
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>결제시간</th>
                                            <th>상품</th>
                                            <th>지점</th>
                                            <th>디자이너</th>
                                            <th>유저</th>
                                            <th>결제금액</th>
                                            <th>상태</th>
                                            <th></th>
                                            <th>확정날짜</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.showdata.map((e, i) => (
                                            <tr key={i} className={e.state === "환불완료" ? "text-deco" : ""}>
                                                <td>{e.pay_time.slice(2, 8)} {e.pay_time.slice(8, 12)}</td>
                                                <td><a href={e.BoardId === 122 ? null : "https://lowehair.kr/board/" + e.BoardId}>{e.pay_goods}</a></td>
                                                <td>{e.Manager.store}</td>
                                                <td>{e.Manager.name}</td>
                                                <td>{e.User.name} / {e.User.login_id}</td>
                                                <td>{e.pay_total}원</td>
                                                <td>{e.state}</td>
                                                <td style={{ textDecoration: "none" }}><div onClick={this.openModalDetail(e)}>상세보기</div></td>
                                                <td>{e.surgery_date ? e.surgery_date.slice(5, e.surgery_date.length) : null}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> : null
                    }
                </section>
                <ModalPay open={this.state.open} close={this.closeModaldetail} data={this.state.detail} />
            </>
        )
    }
}

export default Payment;