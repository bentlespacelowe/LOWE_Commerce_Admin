import { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./designers.css"

class designers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            alldata: '',
            search: '',
        };
    }

    componentDidMount = () => {
        axios.post("http://3.36.218.192:5000/getDesignerList", {})
            .then((res) => {
                this.setState({ data: res.data, alldata: res.data })
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }


    handleInputSearch = () => {
        let keyword = this.state.search
        let data = this.state.alldata
        let arr =[];
        for(let i =0; i <data.length; i++){
            if(data[i].name.indexOf(keyword) !== -1){
                arr.push(data[i]);
            }
        }

        this.setState({data: arr});

    }



    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value, });
    };

    render() {
        return (
            <section id="designer">
                <div style={{ fontWeight: "700", fontSize: "15px", margin: "20px" }}>
                    <a href="/designer/create">디자이너 추가</a>
                </div>
                <div style={{ float: "right", width: "250px" }}>
                    <input onChange={this.handleInputValue("search")} className="goods_input" placeholder="이름을 입력해주세요" type="text"></input>

                    <img onClick={this.handleInputSearch} className="goods_search" src={process.env.PUBLIC_URL + "/image/nav/header_search.svg"} alt="로위 서치" />

                </div>
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
            </section>
        )
    }
}

export default designers;