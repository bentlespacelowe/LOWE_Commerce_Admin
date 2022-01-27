import { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./designers.css"

class designers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }

    componentDidMount = () => {
        axios.post("http://localhost:5000/getDesignerList", {})
            .then((res) => {
                this.setState({ data: res.data })
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <section id="designer">
                <div></div>
                {
                    this.state.data.length > 0 ?
                        <table>
                            <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>지점</th>
                                    <th>소개</th>
                                    <th>프로필</th>
                                    <th>예약</th>
                                    <th>이미지</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((e) => (
                                    <tr key={e.id}>
                                        <td>{e.name}</td>
                                        <td>{e.store}</td>
                                        <td>{e.introduction}</td>
                                        <td>{e.home}</td>
                                        <td>{e.reserve_url}</td>
                                        <td><img src={e.img} alt="이미지" style={{ width: "150px" }} /></td>
                                        <td>

                                            <Link to={{
                                                pathname: "/designer/edit/" + e.id,
                                                state: {
                                                    e
                                                }
                                            }}>수정</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> :
                        <div>
                            디자이너가 없습니다
                        </div>
                }
                <div>
                    <a href="/designer/create">디자이너 추가</a>
                </div>
            </section>
        )
    }
}

export default designers;