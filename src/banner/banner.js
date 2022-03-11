import { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./banner.css"
import Header from "../Header";

class banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }

    componentDidMount = () => {
        axios.post("http://3.36.218.192:5000/getAllBanner", {})
            .then((res) => {
                this.setState({ data: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    removeBanner = (e) => () => {
        axios.post("http://3.36.218.192:5000/removeBanner", {
            id: e
        })
            .then((res) => {
                window.location.replace("/banners")
            }).catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <>
                <section id="banner">
                <Header list={1} />
                <div style={{ width: "100%", justifyContent: "space-between", height: "60px", paddingTop: "90px" }}>
                    <span className="table_title">메인배너</span>
                    <span className="create_button">
                        <a href="/banner/create/1">+ 메인배너 추가</a>
                    </span>
                </div >
                    {
                        this.state.data.length > 0 ?
                            <table>
                                <thead>
                                    <tr>
                                        <th>순서</th>
                                        <th>사진</th>
                                        <th>제목</th>
                                        <th>링크</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((e, i) => (
                                        <tr key={e.id}>
                                            {e.type === 1 ?
                                                <>
                                                    <td style={{ width: "32px" }} >0{i + 1}</td>
                                                    <td style={{ width: "214px" }} ><img src={e.img} alt="이미지" style={{ width: "214px" }} /></td>
                                                    <td style={{ width: "176px" }}>{e.title}</td>
                                                    <td>{e.url}</td>
                                                    <td style={{ width: "308px", textAlign: "center" }}>
                                                        <span>
                                                        <Link to={{
                                                            pathname: "/banner/edit/" + e.id,
                                                            state: {
                                                                e
                                                            }
                                                        }}>수정</Link>
                                                        </span>
                                                        <span onClick={this.removeBanner(e.id)}>
                                                        삭제
                                                        </span>
                                                    </td>
                                                </>
                                                :
                                                null}
                                        </tr>
                                    ))}
                                </tbody>
                            </table> : null
                    }
                    <div style={{ width: "100%", justifyContent: "space-between", height: "60px", paddingTop: "90px" }}>
                        <span className="table_title">이벤트 상품 띠배너</span>
                        <span className="create_button">
                            <a href="/banner/create/2">+ 이벤트 상품 띠배너 추가</a>
                        </span>
                    </div >
                    {
                        this.state.data.length > 0 ?
                            <table>
                                <thead>
                                    <tr>
                                        <th>순서</th>
                                        <th>사진</th>
                                        <th>제목</th>
                                        <th>링크</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((e, i) => (
                                        <tr key={e.id}>
                                            {e.type === 2 ?
                                                <>
                                                    <td style={{ width: "32px" }} >0{i + 1}</td>
                                                    <td style={{ width: "214px" }} ><img src={e.img} alt="이미지" style={{ width: "214px" }} /></td>
                                                    <td style={{ width: "176px" }}>{e.title}</td>
                                                    <td>{e.url}</td>
                                                    <td style={{ width: "308px", textAlign: "center" }}>
                                                        <span>
                                                        <Link to={{
                                                            pathname: "/banner/edit/" + e.id,
                                                            state: {
                                                                e
                                                            }
                                                        }}>수정</Link>
                                                        </span>
                                                        <span onClick={this.removeBanner(e.id)}>
                                                        삭제
                                                        </span>
                                                    </td>
                                                </>
                                                :
                                                null}
                                        </tr>
                                    ))}
                                </tbody>
                            </table> : null
                    }
                    <div style={{ width: "100%", justifyContent: "space-between", height: "60px", paddingTop: "90px" }}>
                        <span className="table_title">상품 띠배너</span>
                        <span className="create_button">
                            <a href="/banner/create/3">+ 상품 띠배너 추가</a>
                        </span>
                    </div >
                    {
                        this.state.data.length > 0 ?
                            <table>
                                <thead>
                                    <tr>
                                        <th>순서</th>
                                        <th>사진</th>
                                        <th>제목</th>
                                        <th>링크</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((e, i) => (
                                        <tr key={e.id}>
                                            {e.type === 3 ?
                                                <>
                                                    <td style={{ width: "32px" }} >0{i + 1}</td>
                                                    <td style={{ width: "214px" }} ><img src={e.img} alt="이미지" style={{ width: "214px" }} /></td>
                                                    <td style={{ width: "176px" }}>{e.title}</td>
                                                    <td>{e.url}</td>
                                                    <td style={{ width: "308px", textAlign: "center" }}>
                                                        <span>
                                                        <Link to={{
                                                            pathname: "/banner/edit/" + e.id,
                                                            state: {
                                                                e
                                                            }
                                                        }}>수정</Link>
                                                        </span>
                                                        <span onClick={this.removeBanner(e.id)}>
                                                        삭제
                                                        </span>
                                                    </td>
                                                </>
                                                :
                                                null}
                                        </tr>
                                    ))}
                                </tbody>
                            </table> : null
                    }
                    <div style={{ fontWeight: "700", fontSize: "15px", margin: "20px" }}>
                        <a href="/banner/create/3">배너 생성</a>
                    </div>

                    <div style={{ fontWeight: "700", fontSize: "20px", margin: "20px", marginBottom: "40px" }}>홈 띠배너</div>
                    {
                        this.state.data.length > 0 ?
                            <table>
                                <thead>
                                    <tr>
                                        <th>순서</th>
                                        <th>사진</th>
                                        <th>제목</th>
                                        <th>링크</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((e, i) => (
                                        <tr key={e.id}>
                                            {e.type === 4 ?
                                                <>
                                                    <td style={{ width: "32px" }} >0{i + 1}</td>
                                                    <td style={{ width: "214px" }} ><img src={e.img} alt="이미지" style={{ width: "214px" }} /></td>
                                                    <td style={{ width: "176px" }}>{e.title}</td>
                                                    <td>{e.url}</td>
                                                    <td style={{ width: "308px", textAlign: "center" }}>
                                                        <span>
                                                        <Link to={{
                                                            pathname: "/banner/edit/" + e.id,
                                                            state: {
                                                                e
                                                            }
                                                        }}>수정</Link>
                                                        </span>
                                                        <span onClick={this.removeBanner(e.id)}>
                                                        삭제
                                                        </span>
                                                    </td>
                                                </>
                                                :
                                                null}
                                        </tr>
                                    ))}
                                </tbody>
                            </table> : null
                    }
                    <div style={{ fontWeight: "700", fontSize: "15px", margin: "20px" }}>
                        <a href="/banner/create/4">배너 생성</a>
                    </div>
                </section>
            </>
        )
    }
}

export default banner;