import { Component } from "react";
import axios from "axios";
import "./Statistic.css"
import moment from 'moment';
import Boarddetail from "./Boarddetail";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            number: 0,
            showdata: "",
            startdate: "",
            enddate: "",
            nextdate: "",
            datedata: [],
            obj: {},
            open: false,
            detail: ""
        };
    }

    closeModaldetail = () => {
        this.setState({ open: false })
    }

    openModalDetail = (e) => () => {
        this.setState({ detail: e })
        this.setState({ open: true })
    }

    componentDidMount = () => {
        axios.post("http://3.36.218.192:5000/getClick", {
            type: 1
        }).then((res) => {
            if (res.data) {
                let obj = this.state.obj
                for (let i = 0; i < res.data.length; i++) {
                    let funnel =""
                    if(res.data[i].funnel && res.data[i].funnel==="/"){
                        funnel = "/";
                    } else  {
                         funnel = res.data[i].funnel.split("&")[0] + "&" + res.data[i].funnel.split("&")[1] + "&" + res.data[i].funnel.split("&")[2]

                    }
                    if (obj[res.data[i].Board.name]) {
                        obj[res.data[i].Board.name].num++;
                        if (obj[res.data[i].Board.name].funnel[funnel]) {
                            obj[res.data[i].Board.name].funnel[funnel]++
                        } else {
                            obj[res.data[i].Board.name].funnel[funnel] = 1
                        }
                    } else {
                        obj[res.data[i].Board.name] = {
                            num: 1,
                            id: res.data[i].BoardId,
                            funnel: {
                                [funnel]: 1
                            }
                        };
                    }
                }
                this.setState({ data: res.data, number: res.data.length, showdata: obj })
            } else {
                this.setState({ data: [], number: 0, showdata: "" })
            }
        });
    }


    onClickgetClick = async () => {
        let date = this.state.startdate
        let enddate = new Date(this.state.enddate)
        let startdate = new Date(date)
        if (enddate - startdate === 0) {
            this.setState({ obj: {}, data: [], datedata: [] })
            axios.post("http://3.36.218.192:5000/getClick", {
                type: 1,
                startDate: this.state.startdate + " 00:00:00",
                endDate: this.state.enddate + " 23:59:59"
            }).then((res) => {
                if (res.data) {
                    let obj = {}
                    for (let i = 0; i < res.data.length; i++) {
                        let funnel =""
                        if(res.data[i].funnel && res.data[i].funnel==="/"){
                            funnel = "/";
                        } else  {
                             funnel = res.data[i].funnel.split("&")[0] + "&" + res.data[i].funnel.split("&")[1] + "&" + res.data[i].funnel.split("&")[2]
    
                        }
                        if (obj[res.data[i].Board.name]) {
                            obj[res.data[i].Board.name].num++;
                            if (obj[res.data[i].Board.name].funnel[funnel]) {
                                obj[res.data[i].Board.name].funnel[funnel]++
                            } else {
                                obj[res.data[i].Board.name].funnel[funnel] = 1
                            }
                        } else {
                            obj[res.data[i].Board.name] = {
                                num: 1,
                                id: res.data[i].BoardId,
                                funnel: {
                                    [funnel]: 1
                                }
                            };
                        }
                    }
                    this.setState({ data: res.data, number: res.data.length, showdata: obj })
                } else {
                    this.setState({ data: [], number: 0, showdata: "" })
                }

                console.log(res.data)
            });
        } else {
            this.setState({ obj: {}, data: [], datedata: [] })
            for (let i = 0; i <= (enddate - startdate) / 86400000; i++) {
                await axios.post("http://3.36.218.192:5000/getClick", {
                    type: 1,
                    startDate: date + " 00:00:00",
                    endDate: date + " 23:59:59"
                }).then((res) => {
                    if (res.data) {
                        console.log(res.data)
                        let datedata = this.state.datedata
                        let data = this.state.data
                        let d = {
                            create: this.state.nextdate,
                            number: res.data.length
                        }
                        datedata.push(d)
                        data.push(...res.data)
                        let obj = this.state.obj
                        for (let i = 0; i < res.data.length; i++) {
                            let funnel =""
                            if(res.data[i].funnel && res.data[i].funnel==="/"){
                                funnel = "/";
                            } else  {
                                 funnel = res.data[i].funnel.split("&")[0] + "&" + res.data[i].funnel.split("&")[1] + "&" + res.data[i].funnel.split("&")[2]
        
                            }
                            if (obj[res.data[i].Board.name]) {
                                obj[res.data[i].Board.name].num++;
                                if (obj[res.data[i].Board.name].funnel[funnel]) {
                                    obj[res.data[i].Board.name].funnel[funnel]++
                                } else {
                                    obj[res.data[i].Board.name].funnel[funnel] = 1
                                }
                            } else {
                                obj[res.data[i].Board.name] = {
                                    num: 1,
                                    id: res.data[i].BoardId,
                                    funnel: {
                                        [funnel]: 1
                                    }
                                };
                            }
                        }
                        this.setState({ data: data, number: res.data.length, showdata: obj, datedata: datedata })
                    } else {
                        let datedata = this.state.datedata
                        let d = {
                            create: this.date,
                            number: 0
                        }
                        datedata.push(d)
                        this.setState({ showdata: "", datedata: datedata })
                    }
                });
                date = moment(date).add(1, "days").format("YYYY-MM-DD")
                this.setState({ nextdate: date })
            }
        }

    }

    handleInputValue = (key) => (e) => {
        if (key === "startdate") {
            this.setState({ [key]: e.target.value, nextdate: e.target.value });

        } else {
            this.setState({ [key]: e.target.value });
        }
    };
    render() {
        console.log(this.state)
        return (
            <>
                <div className="table_title">예약하기 클릭 수</div>
                <div>
                    <input type="date" onChange={this.handleInputValue("startdate")} />~
                    <input type="date" onChange={this.handleInputValue("enddate")} />
                    <span><button onClick={this.onClickgetClick} style={{ marginLeft: "10px", width: "50px" }} type="submit">검색</button></span>
                </div>
                {
                    this.state.datedata.length ?
                        <div>

                            <table>
                                <thead>
                                    <tr>
                                        <th>날짜</th>
                                        <th>클릭수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.datedata.map((e, i) => (

                                        <tr key={i}>
                                            <td>{e.create}</td>
                                            <td>{e.number}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> : null
                }
                {
                    this.state.showdata ?
                        <table>
                            <thead>
                                <tr>
                                    <th>총 {this.state.data.length}개</th>
                                    <th style={{ width: "400px" }}>제목</th>
                                    <th style={{ width: "100px" }}>링크넘버</th>
                                    <th>클릭수</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(this.state.showdata).map((e, i) => (

                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td >{e}</td>
                                        <td><a href={"https://lowehair.kr/board/" + this.state.showdata[e].id} >{this.state.showdata[e].id}</a></td>
                                        <td>{this.state.showdata[e].num}</td>
                                        <td><div onClick={this.openModalDetail(this.state.showdata[e])}>자세히 보기</div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> :
                        <div>
                            결과값 없음
                        </div>
                }
                <Boarddetail open={this.state.open} close={this.closeModaldetail} data={this.state.detail} />
            </>
        )
    }
}

export default Board;