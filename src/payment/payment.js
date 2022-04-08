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
            detail: "",
            open: false,
            total_price: 0,
            refund_price: 0,
            startdate: "",
            enddate: "",
            filter: 0,
        };
    }

    componentDidMount = () => {
        axios.post("http://3.36.218.192:5000/getPayment", {
        }).then((res) => {
            let date= []
            let pay= []
            let done= []
            let refund= []
            let waiting= []
            let showdata= []
            for(let i =0; i < res.data.length; i++){
                if(res.data[i].state === "환불완료"){
                    refund.unshift(res.data[i])
                } else if(res.data[i].state === "환불대기"){
                    waiting.unshift(res.data[i])
                } else if(res.data[i].state === "시술완료"){
                    done.unshift(res.data[i])
                } else if(res.data[i].state === "예약확정"){
                    date.unshift(res.data[i])
                } else{
                    pay.unshift(res.data[i])
                }
                showdata.unshift(res.data[i])
            }
            this.setState({date:date, pay:pay, done: done, refund: refund, waiting: waiting, data: res.data, showdata: showdata})
            let total_price = 0
            let refund_price = 0
            for(let i =0; i < res.data.length; i++){
                if(res.data[i].state === "환불완료"){
                    refund_price = refund_price + Number(res.data[i].pay_total)
                }
                total_price= total_price + Number(res.data[i].pay_total)
            }
            this.setState({total_price: total_price, refund_price: refund_price})
        });
    }

    openModalDetail = (e) => () => {
        this.setState({detail: e})
        this.setState({open: true})
        
    }

    closeModaldetail = () => {
        this.setState({open: false})
    }
        handleInputValue = (key) => (e) => {
        if(key === "startdate"){
            this.setState({ [key]: e.target.value, nextdate: e.target.value });

        } else{
            this.setState({ [key]: e.target.value });
        }
    };

    selectFilter =(v)=> (e)=>{
        this.setState({filter: e.target.value})
        if(Number(e.target.value) === 0){
            this.setState({showdata: this.state.data})
        } else if(Number(e.target.value) === 1){
            this.setState({showdata: this.state.pay})

        } else if(Number(e.target.value) === 2){
            this.setState({showdata: this.state.date})

        } else if(Number(e.target.value) === 3){
            this.setState({showdata: this.state.done})

        } else if(Number(e.target.value) === 4){
            this.setState({showdata: this.state.waiting})

        } else if(Number(e.target.value) === 5){
            this.setState({showdata: this.state.refund})

        }

    }

    render() {
        console.log(this.state)
        return (
            <section id="payment">
                <Header list={8} />
                {/* <div className="table_title"></div>
                <div>
                    <input type="date" onChange={this.handleInputValue("startdate")} />~
                    <input type="date" onChange={this.handleInputValue("enddate")} />
                    <span><button onClick={this.onClickgetClick} style={{ marginLeft: "10px", width: "50px" }} type="submit">검색</button></span>
                </div> */}
                <div>
                <div style={{paddingTop: "20px", marginRight: "50px",float:"left"}}>
                    <div>결제 금액: {this.state.total_price}원</div>
                    <div>결제 건수: {this.state.data.length}건</div>
                    <div>환불 건수: {this.state.refund_price}원</div>
                    <div>환불 건수: {this.state.refund.length}건</div>
                    <div>총 매출: {this.state.total_price-this.state.refund_price}원</div>
                </div>

                <div style={{paddingTop: "20px"}}>
                    <div>시술완료: {this.state.done.length}건</div>
                    <div>환불대기: {this.state.waiting.length}건</div>
                    <div>예약확정: {this.state.date.length}건</div>
                    <div>결제완료: {this.state.pay.length}건</div>
                </div>
                </div>
                <div style={{marginTop: "50px"}}>
                    <select onChange={this.selectFilter("filter")}>
                        <option value={0}>전체보기</option>
                        <option value={1}>결제완료</option>
                        <option value={2}>예약확정</option>
                        <option value={3}>시술완료</option>
                        <option value={4}>환불대기</option>
                        <option value={5}>환불완료</option>
                    </select>
                </div>
                {
                    this.state.showdata ? 
                    <div>
                        <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>상품</th>
                                        <th>유저</th>
                                        <th>가격</th>
                                        <th>결제시간</th>
                                        <th>상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.showdata.map((e, i) => (

                                        <tr key={i} className={e.state==="환불완료" ? "text-deco": ""}>
                                            <td>{e.id}</td>
                                            <td>{e.pay_goods}</td>
                                            <td>{e.User.name} / {e.User.login_id}</td>
                                            <td>{e.pay_total}원</td>
                                            <td>{e.pay_time.slice(2,8)} {e.pay_time.slice(8,12)}</td>
                                            <td>{e.state}</td>
                                            <td style={{textDecoration: "none"}}><div onClick={this.openModalDetail(e)}>상세보기</div></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> : null
                }
                <ModalPay open={this.state.open} close={this.closeModaldetail} data={this.state.detail} />
            </section>
        )
    }
}

export default Payment;