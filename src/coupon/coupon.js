import { Component } from "react";
import axios from "axios";
import Header from '../Header'

class coupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            text: "",
            number: 0,
            used: 0,
            expired: 0
        };
    }

    componentDidMount = () => {
        axios.post("http://3.36.218.192:5000/getAllCoupon", {
        }).then((res) => {
            let data = res.data;
            let used = 0;
            let expired =0;
            this.setState({ data: data, number: data.length, })
            for(let i=0; i < data.length; i++){
                if(data[i].used === 0){
                    used = used + 1
                }
                if(data[i].deletedAt){
                    expired = expired + 1;
                }
            }
            this.setState({ used: used, expired: expired })

        });

    }
    onClickUse = (e) => () => {
        axios.post("http://3.36.218.192:5000/updateCoupon", {
            id: e.id,
            text: this.state.text
        }).then((res) => {
            window.history.go(-1);
        });
    }

    onClickDelete = (e) => () => {
        console.log(e.id)
        axios.post("http://3.36.218.192:5000/removeCoupon", {
            id: e.id
        }).then((res) => {
            window.history.go(-1)
        }).catch((err) => {
            console.log(err)
        })

    }


    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    }

    render() {
        console.log(this.state.data)
        return (
            <section id="coupon">
            <Header list={5} />
            <div>총 {this.state.number} / 사용 {this.state.used}</div>
                {
                    this.state.data ?
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>금액</th>
                                    <th>용도</th>
                                    <th>유저</th>
                                    <th>사용</th>
                                    <th>발급날짜</th>
                                    <th>만료날짜</th>
                                    <th>최저금액</th>
                                    <th>사용처</th>
                                    <th>사용변경</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((e) => (
                                    <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.price}</td>
                                        <td>{e.content}</td>
                                        <td>{e.User ? e.User.login_id : "탈퇴회원"}</td>
                                        <td>{e.used === 1 ? "미사용" : "사용"}</td>
                                        <td>{e.createdAt.slice(0, 16)}</td>
                                        <td>{!e.deletedAt ? e.expired ? e.expired.slice(0, 16) : null : "만료된 쿠폰"}</td>
                                        <td>{e.minimum}</td>
                                        <td><input type="text" onChange={this.handleInputValue("text")}></input></td>
                                        <td><p onClick={this.onClickUse(e)}>수정</p></td>
                                        <td><p onClick={this.onClickDelete(e)}>삭제</p></td>
                                        <td>{e.text}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> :
                        <div>
                            쿠폰 없음
                        </div>
                }
            </section>
        )
    }
}

export default coupon;