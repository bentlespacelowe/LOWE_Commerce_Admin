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

    }
    componentDidMount = () => {
        // axios.post("http://3.36.218.192:5000/alert", {
        //     type: 4
        // }).then((res) => {
        // }).catch((err) => {
        //     console.log(err)
        // })

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
            data: []
        })
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


    onclickEnter = (e) => {
        if (e.key === 'Enter') {
            this.handleInputSearch();
        }
    }

    render() {
        let login = window.localStorage.getItem("login");
        console.log(this.state)
        return (
            <>
                <section id="payment">
                    <Header list={8} />
                    <div style={{ width: "100%", justifyContent: "space-between", height: "60px", paddingTop: "80px" }}>
                        <span className="table_title">결제 내역</span>
                        <span >
                            <img onClick={this.handleInputSearch} className="payment_search" src={process.env.PUBLIC_URL + "/image/nav/header_search.svg"} alt="로위 서치" />
                            <input className="input" onKeyPress={this.onclickEnter} onChange={this.handleInputValue("search")} placeholder="Search" type="text"></input>

                        </span>
                    </div>
                    <div className="Payment_category">
                        <div>
                            <select onChange={this.selectFilter("filter")}>
                                <option value={0}>전체보기</option>
                                <option value={1}>결제완료</option>
                                <option value={2}>예약확정</option>
                                <option value={3}>시술완료</option>
                                <option value={4}>환불대기</option>
                                <option value={5}>환불완료</option>
                            </select>
                        </div>
                        <div>
                            <input type="date" onChange={this.handleInputValue("startdate")} /> ~ <input type="date" onChange={this.handleInputValue("enddate")} />
                            <span><button onClick={this.onClickgetClick} type="submit">검색하기</button></span>
                        </div>
                    </div>
                    {login === "admin" ?
                        <div className="Payment_data">
                            <div>
                                <div className="Payment_data_title">
                                    <div>결제현황</div>
                                </div>
                                <div className="Payment_data_content">
                                    <div>{this.state.total_price - this.state.refund_price}원<div>총 매출</div></div>
                                    <div>{this.state.data.length}건<div>총 건수</div></div>
                                    <div>{this.state.total_price}원<div>결제 금액</div></div>
                                    <div>{this.state.refund_price}원<div>환불 금액</div></div>
                                </div>
                            </div>

                            <div >
                                <div className="Payment_data_title">
                                    <div>결제현황</div>
                                </div>
                                <div className="Payment_data_content">
                                    <div>{this.state.pay.length}건<div>결제 완료</div></div>
                                    <div>{this.state.date.length}건<div>예약 확정</div></div>
                                    <div>{this.state.done.length}건<div>시술 완료</div></div>
                                    <div>{this.state.waiting.length}건<div>환불 대기</div></div>
                                    <div>{this.state.refund.length}건<div>환불 완료</div></div>
                                </div>
                            </div>
                        </div> : null
                    }
                    {
                        this.state.showdata ?
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>상품</th>
                                            <th style={{ width: "96px" }}>지점</th>
                                            <th style={{ width: "96px" }}>디자이너</th>
                                            <th style={{ width: "96px" }}>고객명</th>
                                            <th style={{ width: "96px" }}>고객ID</th>
                                            <th style={{ width: "96px" }}>결제금액</th>
                                            <th style={{ width: "116px" }}>결제시간</th>
                                            <th style={{ width: "116px" }}>확정날짜</th>
                                            <th style={{ width: "96px" }}>상태</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.showdata.map((e, i) => (
                                            <tr key={i} className={e.state === "환불완료" ? "text-deco" : "none-deco"}>
                                                <td style={{ borderRadius: "8px 0 0 8px" }}><a href={e.BoardId === 122 ? null : "https://lowehair.kr/board/" + e.BoardId}>{e.pay_goods}</a></td>
                                                <td style={{ width: "96px" }}>{e.Manager.store}</td>
                                                <td style={{ width: "96px" }}>{e.Manager.name}</td>
                                                <td style={{ width: "96px" }}>{e.User.name}</td>
                                                <td style={{ width: "96px" }}>{e.User.login_id}</td>
                                                <td style={{ width: "96px" }}>{e.pay_total}원</td>
                                                <td style={{ width: "116px" }}>{e.pay_time.slice(2, 8)} {e.pay_time.slice(8, 12)}</td>
                                                <td style={{ width: "116px" }}>{e.surgery_date ? e.surgery_date.slice(2, e.surgery_date.length) : null}</td>
                                                <td style={{ width: "96px" }}>{e.state}</td>
                                                <td style={{ textDecoration: "none", borderRadius: "0 8px 8px 0", width: "96px" }}>
                                                    <div onClick={this.openModalDetail(e)}>상세보기</div>
                                                </td>
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