import { Component } from "react";
import axios from "axios";
import "./goods.css"

class goods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }

    componentDidMount = () => {
        axios.post("http://localhost:5000/getAllBoard", {})
            .then((res) => {
                this.setState({ data: res.data })
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    handledeleteBoard =(e) => () => {
        axios.post("http://localhost:5000/removeBoard", {
            id: e
        })
            .then((res) => {
                window.location.replace("/goods")
            }).catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <section id="goods">
                {
                    this.state.data.length > 0 ?
                    <table>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>장소</th>
                            <th>디자이너</th> 
                            <th>공개여부</th>    
                        </tr>
                    </thead>
                            <tbody>
                            {this.state.data.map((e) => (
                                    <tr key={e.id}>
                                        <td>{e.name}</td>
                                        <td>{e.store}</td>
                                        <td>{e.designer_name}</td>
                                        <td>{e.open === "1" ? "공개" : "비공개"}</td>
                                        <td>
                                            <a href={"good/"+e.id}>상품 확인</a>
                                        </td>
                                        <td>
                                            <div onClick={this.handledeleteBoard(e.id)}>상품 삭제</div>
                                        </td>
                                    </tr>
                            ))}
                            </tbody>
                        </table> :
                        <div>
                            상품이 없습니다
                        </div>
                }
                <div style={{fontWeight: "700", fontSize: "15px", margin: "20px"}}>
                    <a href="/board/create">상품 추가</a>
                </div>
            </section>
        )
    }
}

export default goods;