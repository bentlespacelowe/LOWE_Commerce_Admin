import { Component } from "react";
import axios from "axios";
import Firstsec from "./Firstsec";
import Secondsec from "./Secondsec";
import Thirdsec from "./Thirdsec";
import Fourthsec from "./Fourthsec";
import Fifthsec from "./Fifthsec";
import "./Board.css"
import Footer from "./Footer";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            store: null,
            designer: null
        };
    }

    componentDidMount = () => {
        let id = window.location.pathname.split("/")[2];
        axios.post("http://localhost:5000/getBoardDetail", {
            id: id,
        }).then((res) => {
            this.setState({ data: res.data });
            axios.post("http://localhost:5000/getDesignerName", {
            name: res.data.board.designer_name,
           })
           .then((res) => {
                this.setState({ designer: res.data });
           });
            
        }).catch((err) => {
            console.log(err)
        });


    }

    render() {
        console.log(this.state)
        return (
            <div className="goods_detail">
                {this.state.data && this.state.designer?
                    <div >
                        <Firstsec data={this.state.data} />
                        <Secondsec data={this.state.data} designer={this.state.designer} />
                        <Thirdsec data={this.state.data} />
                        <Fourthsec data={this.state.data} />
                        <Fifthsec data={this.state.data} />
                        <Footer data={this.state.data} id={window.location.pathname.split("/")[2]} />
                    </div>
                    : <></>
                }
            </div>
        )
    }
}

export default Board;
