import { Component } from "react";
import axios from "axios";

class coupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            text: ""
        };
    }

    componentDidMount = () => {
        this.setState({ data: this.props.location.state.coupon })

    }
    onClickUse = (e) => () => {
        axios.post("http://localhost:5000/updateCoupon", {
            id: e.id,
            text: this.state.text
        }).then((res) => {
            window.history.go(-1);
        });
    }

    onClickDelete = (e) => () => {
        console.log(e.id)
        axios.post("http://localhost:5000/removeCoupon", {
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
        console.log(this.state)
        return (
            <section id="coupon">
                {
                    this.state.data ?
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>금액</th>
                                    <th>용도</th>
                                    <th>사용</th>
                                    <th>발급날자</th>
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
                                        <td>{e.used === 1 ? "미사용" : "사용"}</td>
                                        <td>{e.createdAt.slice(0, 16)}</td>
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