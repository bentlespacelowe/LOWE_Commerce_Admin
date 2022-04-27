import React from "react";

class Boarddetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refundprice: "",
            surgery_date: "",
            surgery_time: "",
        };
    }


    handleClose = () => {
        this.props.close();
    }


    render() {
        const { open, data } = this.props;
        console.log(this.props)
        return (
            <>
                {open ? (
                    <div className="Signup_modalBody">
                        <div className="modalclick" onClick={this.handleClose}></div>
                        <div className="Signup_modalInner" style={{maxWidth: "700px"}}>
                            <div style={{marginBottom: "50px"}}>
                                <div><a style={{width: "400px",font: "700 25px 'Noto Sans"}}href={"https://lowehair.kr/board/"+data.id}>{"https://lowehair.kr/board/"+data.id}</a></div>
                                <div></div>
                            </div>
                            {
                                Object.keys(data.funnel).sort().map((e, i) =>(
                                    <div  style={{marginBottom: "20px"}}>
                                        <div style={{font: "500 22px 'Noto Sans"}}>주소</div>
                                        <div style={{width: "680px", overflow: "scroll",font: "500 20px 'Noto Sans",marginBottom: "10px"}}>{e}</div>
                                        <div style={{font: "500 20px 'Noto Sans"}}>{data.funnel[e]}건</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : null}
            </>
        );
    }
}

export default Boarddetail;