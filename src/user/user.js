import { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./user.css"

class user extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ""
        };
    }

    componentDidMount = () => {
        axios.post("http://localhost:5000/getAllUser", {})
            .then((res) => {
                this.setState({ data: res.data })
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <section id="user">
                {
                    this.state.data ?
                        <table>
                            <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>전화번호</th>
                                    <th>생년월일</th>
                                    <th>아이디</th>
                                    <th>성별</th>
                                    <th>회원가입일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((e) => (
                                    <tr key={e.id}>
                                        <td>{e.name}</td>
                                        <td>{e.phone}</td>
                                        <td>{e.birthday.slice(0, 10)}</td>
                                        <td>{e.login_id}</td>
                                        <td>{e.gender === 1 ? "남성" : "여성"}</td>
                                        <td>{e.createdAt.slice(0, 16)}</td>
                                        <td><Link to={{
                                            pathname: `/user/coupon/${e.login_id}`,
                                            state: {
                                                coupon: e.Coupons,
                                                id: e.login_id
                                            }
                                        }}>쿠폰확인</Link>
                                        </td>
                                        {/* <td><a href={`{/user/review/${e.login_id}`}>리뷰확인</a></td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table> :
                        <div>
                            유저가 없습니다
                        </div>
                }
            </section>
        )
    }
}

export default user;