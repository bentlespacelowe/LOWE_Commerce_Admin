import { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./banner.css"

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
                console.log(res.data)
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
            <section id="banner">
                <div style={{fontWeight: "700", fontSize: "20px", margin: "20px", marginBottom: "40px"}}>메인배너</div>
            {
                this.state.data.length > 0 ?
                    <table>
                        <thead>
                            <tr>
                                <th>제목</th>
                                <th>내용</th>
                                                   
                                <th>링크</th>
                                <th>사진</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((e) => (
                                <tr key={e.id}>
                                    {e.type === 1 ?
                                        <>
                                            <td>{e.title}</td>
                                            <td>{e.content}</td>
                                                                                        
                                            <td>{e.url}</td>
                                            <td><img src={e.img} alt="이미지" style={{ width: "200px" }} /></td>
                                            <td>
                                                <Link to={{
                                                    pathname: "/banner/edit/" + e.id,
                                                    state: {
                                                        e
                                                    }
                                                }}>수정</Link>
                                            </td>
                                            <td onClick={this.removeBanner(e.id)}>삭제</td>
                                        </>
                                        : 
                                        null}
                                </tr>
                            ))}
                        </tbody>
                    </table> : null
            }
            <div  style={{fontWeight: "700", fontSize: "15px", margin: "20px", marginBottom: "40px"}}>
                <a href="/banner/create/1">배너 생성</a>
            </div>
                <div style={{fontWeight: "700", fontSize: "20px", margin: "20px", marginBottom: "40px"}}>이벤트 상품 띠배너</div>
                {
                    this.state.data.length > 0 ?
                        <table>
                            <thead>
                                <tr>
                                    <th>제목</th>
                                    <th>내용</th>
                                                           
                                    <th>링크</th>
                                    <th>사진</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((e) => (
                                    <tr key={e.id}>
                                        {e.type === 2 ?
                                            <>
                                                <td>{e.title}</td>
                                                <td>{e.content}</td>
                                                                                                
                                                <td>{e.url}</td>
                                                <td><img src={e.img} alt="이미지" style={{ width: "150px" }} /></td>
                                                <td>
                                                    <Link to={{
                                                        pathname: "/banner/edit/" + e.id,
                                                        state: {
                                                            e
                                                        }
                                                    }}>수정</Link>
                                                </td>
                                                <td onClick={this.removeBanner(e.id)}>삭제</td>
                                            </>
                                            : 
                                            null}
                                    </tr>
                                ))}
                            </tbody>
                        </table> : null
                }
                <div  style={{fontWeight: "700", fontSize: "15px", margin: "20px", marginBottom: "40px"}}>
                    <a href="/banner/create/2">배너 생성</a>
                </div>
                <div style={{fontWeight: "700", fontSize: "20px", margin: "20px", marginBottom: "40px"}}>상품 띠배너</div>
                {
                    this.state.data.length > 0 ?
                        <table>
                            <thead>
                                <tr>
                                    <th>제목</th>
                                    <th>내용</th>
                                                           
                                    <th>링크</th>
                                    <th>사진</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((e) => (
                                    <tr key={e.id}>
                                        {e.type === 3 ?
                                            <>
                                                <td>{e.title}</td>
                                                <td>{e.content}</td>
                                                                                                
                                                <td>{e.url}</td>
                                                <td><img src={e.img} alt="이미지" style={{ width: "150px" }} /></td>
                                                <td>
                                                    <Link to={{
                                                        pathname: "/banner/edit/" + e.id,
                                                        state: {
                                                            e
                                                        }
                                                    }}>수정</Link>
                                                </td>
                                                <td onClick={this.removeBanner(e.id)}>삭제</td>
                                            </>
                                            : 
                                            null}
                                    </tr>
                                ))}
                            </tbody>
                        </table> : null
                }
                <div  style={{fontWeight: "700", fontSize: "15px", margin: "20px"}}>
                    <a href="/banner/create/3">배너 생성</a>
                </div>
            </section>
        )
    }
}

export default banner;