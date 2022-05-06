import React from "react";
// import "./userroute.css";

class userroute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            modal: false
        };
    }


    handleClose = () => {
        this.props.close();
    }

    componentDidMount = () => {

    }

    render() {
        const { open } = this.props;
        console.log(this.props)
        return (
            <>
                {open ? 
                    (
                    <div className="Signup_modalBody">
                        <div className="modalclick" onClick={this.handleClose}></div>
                        <div className="Signup_modalInner">
                            <div style={{font: "700 22px 'Noto Sans'"}}>경로 내역</div>
                            {
                                this.props.data ?
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>총 {this.props.data.length}개</th>
                                                <th>위치</th>
                                                <th>행동</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.data.map((e => (

                                                <tr key={e.id}>
                                                    <td>{e.createdAt}</td>
                                                    <td>
                                                        {
                                                            e.type==="1" ?
                                                            `https://lowehair.kr/board/${e.BoardId}`:
                                                            e.type==="2" ?
                                                            `https://lowehair.kr/board/${e.BoardId}`:
                                                            e.type==="3" ? 
                                                            `https://lowehair.kr/search?${e.funnel}`: 
                                                            e.type==="4" ? 
                                                            `https://lowehair.kr/designer/${e.ManagerId}`:
                                                            e.type==="5" ? 
                                                                e.tab_num===1 ?
                                                                `https://lowehair.kr/designer/${e.ManagerId}`:
                                                                e.tab_num===2 ?
                                                                `https://lowehair.kr/designer/${e.ManagerId}#Ddetailmenu`:
                                                                e.tab_num===3 ?
                                                                `https://lowehair.kr/designer/${e.ManagerId}#Ddetailreview`:
                                                                `https://lowehair.kr/designer/${e.ManagerId}#Ddetailinfo`: 
                                                            e.type==="6" ? 
                                                            `https://lowehair.kr/designer/${e.ManagerId}#Ddetailmenu`: null
                                                        }
                                                    </td>
                                                    <td>
                                                    {
                                                            e.type==="1" ?
                                                            "예약하기 버튼 클릭":
                                                            e.type==="2" ?
                                                            "상세페이지 유입":
                                                            e.type==="3" ? 
                                                            "검색": 
                                                            e.type==="4" ? 
                                                            "디자이너 프로필 유입":
                                                            e.type==="5" ? 
                                                            "디자이너 프로필 탭 클릭": 
                                                            e.type==="6" ? 
                                                            "디자이너 프로필 메뉴 클릭": null
                                                        }
                                                    </td>
                                                </tr>
                                            )))
                                            }
                                        </tbody>
                                    </table> :
                                    <div>
                                        내역이 없습니다
                                    </div>
                            }
                            <div style={{marginTop: "50px", font: "700 22px 'Noto Sans'"}}>결제 내역</div>
                            {
                                this.props.payment.length ?
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>총 {this.props.payment.length}개</th>
                                                <th>상품</th>
                                                <th>상태</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.payment.map((e => (

                                                <tr key={e.id}>
                                                    <td>{e.createdAt}</td>
                                                    <td>
                                                        {e.pay_goods}
                                                    </td>
                                                    <td>
                                                        {e.state}
                                                    </td>
                                                </tr>
                                            )))
                                            }
                                        </tbody>
                                    </table> :
                                    <div>
                                        내역이 없습니다
                                    </div>
                            }
                        </div>
                    </div>
                ) : null}
            </>
        );
    }
}

export default userroute;