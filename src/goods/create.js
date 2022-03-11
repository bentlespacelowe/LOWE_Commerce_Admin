import axios from "axios";
import { Component } from "react";
import "./create.css"

class create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            designer_name: "",
            store: "",
            name: "",
            content: "",
            addContent: "",
            price: 0,
            eventType: null,
            eventPrice: 0,
            category: '',
            gender: "",
            length: 0,
            open: 0,
            beforeimg: '',
            afterimg: '',
            beforeAfter: '',
            beforeAfterImg: [],
            MainimgMain: '',
            MainimgSub: '',
            Mainimgs: [],
            Mainimg: '',
            SubimgSub: '',
            Subimgs: [],
            Subimg: '',
            SubimgTotal: [],
            thumbnail: '',
        };
    }

    componentDidMount = () => {
        axios.post("http://3.36.218.192:5000/getDesignerList", {})
            .then((res) => {
                this.setState({ data: res.data })
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })

        if (this.props.location.state) {
            let mainimg = [];
            let mainimgurl = [];
            let subimg = [];
            let subimgurl = [];
            let BAimg = [];

            const img = this.props.location.state.data.board.Images
            for (let i = 0; i < img.length; i++) {
                if (img[i].imgType === 0) {
                    for (let j = 0; j < img[i].Urls.length; j++) {
                        mainimgurl.push({
                            url: img[i].Urls[j].url
                        })
                    }
                    mainimg = ({
                        main: img[i].main,
                        sub: img[i].sub,
                        img: mainimgurl
                    })
                    document.getElementById("gMainimgMain").value = img[i].main
                    document.getElementById("gMainimgSub").value = img[i].sub

                } 
                if (img[i].imgType === 2) {
                    BAimg.push({
                        main: img[i].main,
                        beforeimg: img[i].beforeimg,
                        afterimg: img[i].afterimg,
                    })
                } 
                if (img[i].imgType === 1) {
                    for (let j = 0; j < img[i].Urls.length; j++) {
                        subimgurl.push({
                            url: img[i].Urls[j].url
                        })
                    }
                    subimg.push({
                        main: img[i].main,
                        img: subimgurl
                    })
                    subimgurl = [];
                }
            }

            console.log(mainimg)

            document.getElementById("gdesigner_name").value = this.props.location.state.data.board.designer_name
            document.getElementById("gstore").value = this.props.location.state.data.board.store
            document.getElementById("gname").value = this.props.location.state.data.board.name
            document.getElementById("gcontent").value = this.props.location.state.data.board.content
            document.getElementById("gprice").value = this.props.location.state.data.board.price
            document.getElementById("gaddPrice").value = this.props.location.state.data.board.addPrice
            document.getElementById("gcategory").value = this.props.location.state.data.board.category
            document.getElementById("geventType").value = this.props.location.state.data.board.eventType
            document.getElementById("geventPrice").value = this.props.location.state.data.board.eventPrice
            document.getElementById("gopen").value = this.props.location.state.data.board.open
            document.getElementById("ggender").value = this.props.location.state.data.board.gender
            document.getElementById("glength").value = this.props.location.state.data.board.length

            this.setState({
                designer_name: this.props.location.state.data.board.designer_name,
                store: this.props.location.state.data.board.store,
                name: this.props.location.state.data.board.name,
                content: this.props.location.state.data.board.content,
                category: this.props.location.state.data.board.category,
                eventType: this.props.location.state.data.board.eventType,
                price: this.props.location.state.data.board.price,
                addPrice: this.props.location.state.data.board.addPrice,
                eventPrice: this.props.location.state.data.board.eventPrice,
                open: this.props.location.state.data.board.open,
                gender: this.props.location.state.data.board.gender,
                length: this.props.location.state.data.board.length,
                thumbnail: this.props.location.state.data.board.thumbnail,
                MainimgMain: mainimg.main,
                MainimgSub: mainimg.sub,
                Mainimgs: mainimg.img,
                beforeAfterImg: BAimg,
                SubimgTotal: subimg
            })


        }
    };

    handleInputValue = (key) => async (e) => {
        if (key === "beforeimg" || key === "afterimg" || key === "Mainimg" || key === "Subimg" || key === "Subimg") {
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    previewURL: reader.result,
                });
            };
            reader.readAsDataURL(file);
            let img = e.target.files[0];

            const formData = new FormData();
            formData.append("file", img);
            await axios
                .post("http://3.36.218.192:5000/addImg", formData, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                }).then(res => {
                    this.setState({ [key]: res.data.url });
                })
        } else {
            this.setState({ [key]: e.target.value });
        }
    };

    handleImgValue = () => {
        const beforeAfterImg = this.state.beforeAfterImg
        const surgeryImg = this.state.SubimgTotal
        const mainImg = [
            {
                main: this.state.MainimgMain,
                sub: this.state.MainimgSub,
                img: this.state.Mainimgs
            },
        ];
        const category2 = [
            {
                content: "로위",
            },
        ];
        axios.post("http://3.36.218.192:5000/createBoard", {
            ManagerId: 1,
            phone: "0",
            designer_name: this.state.designer_name,
            store: this.state.store,
            name: this.state.name,
            content: this.state.content,
            addContent: "0",
            price: this.state.price,
            addPrice: this.state.addPrice,
            eventType: Number(this.state.eventType),
            eventPrice: this.state.eventPrice,
            category: Number(this.state.category),
            open: this.state.open,
            time: 0,
            gender: Number(this.state.gender),
            length: Number(this.state.length),
            thumbnail: this.state.thumbnail,
            mainImg,
            beforeAfterImg,
            surgeryImg,
            category2
        }).then((result) => {
            window.location.replace("/goods")
            console.log("result")
        });
    };
    handleImgedit = async () => {
        const beforeAfterImg = this.state.beforeAfterImg
        const surgeryImg = this.state.SubimgTotal
        const mainImg = [
            {
                main: this.state.MainimgMain,
                sub: this.state.MainimgSub,
                img: this.state.Mainimgs
            },
        ];
        const category2 = [
            {
                content: "로위",
            },
        ];
        await axios.post("http://3.36.218.192:5000/updateBoard", {
            id: Number(window.location.pathname.split("/")[3]),
            ManagerId: 1,
            phone: "0",
            designer_name: this.state.designer_name,
            store: this.state.store,
            name: this.state.name,
            content: this.state.content,
            addContent: "0",
            price: this.state.price,
            addPrice: this.state.addPrice,
            eventType: Number(this.state.eventType),
            eventPrice: this.state.eventPrice,
            category: Number(this.state.category),
            open: this.state.open,
            time: 0,
            gender: Number(this.state.gender),
            length: Number(this.state.length),
            thumbnail: this.state.thumbnail,
            mainImg,
            beforeAfterImg,
            surgeryImg,
            category2
        }).then((result) => {
            window.location.replace("/goods")
        });
    };

    onClickBaA = () => {
        let beforeAfter = this.state.beforeAfterImg;
        let data = {
            main: this.state.beforeAfter,
            beforeimg: this.state.beforeimg,
            afterimg: this.state.afterimg,
        }
        beforeAfter.push(data);
        this.setState({ beforeAfterImg: beforeAfter });

        document.getElementById("gbeforeAfter").value = ""
    }

    onClickDelBaA = (i) => () => {
        let beforeAfter = this.state.beforeAfterImg;
        beforeAfter.splice(i, 1);
        this.setState({ beforeAfterImg: beforeAfter });
    }


    onClickMain = () => {
        let main = this.state.Mainimgs;
        let data = {
            url: this.state.Mainimg,
        }
        main.push(data);
        this.setState({ mainimgs: main });
    }


    onClickDelMain = (i) => () => {
        let main = this.state.Mainimgs;
        main.splice(i, 1);
        this.setState({ Mainimgs: main });
    }

    onClickSub = () => {
        let subimg = this.state.Subimgs;
        let data = {
            url: this.state.Subimg,
        }
        subimg.push(data);
        this.setState({ Subimgs: subimg });
    }


    onClickDelSub = (i) => () => {
        let subimg = this.state.Subimgs;
        subimg.splice(i, 1);
        this.setState({ Subimgs: subimg });
    }

    onClickSubtotal = () => {
        let SubimgTotal = this.state.SubimgTotal;
        let data = {
            main: this.state.SubimgSub,
            img: this.state.Subimgs
        }
        SubimgTotal.push(data);
        this.setState({ SubimgTotal: SubimgTotal, SubimgSub: "", Subimgs: [] });

        document.getElementById("gSubimgSub").value = ""
    }

    onClickDelSubtotal = (i) => () => {
        let SubimgTotal = this.state.SubimgTotal;
        SubimgTotal.splice(i, 1);
        this.setState({ SubimgTotal: SubimgTotal });
    }

    onClickthumbnail = (e) => () => {
        this.setState({ thumbnail: e })
    }

    render() {
        console.log(this.state);
        // let profile_preview = null;
        // if (this.state.file !== "") {
        //     profile_preview = (
        //         <img
        //             className="profile_preview"
        //             src={this.state.previewURL}
        //             alt="text"
        //         ></img>
        //     );
        // }
        let board = {};
        if (this.props.location.state) {
            board = this.props.location.state.data.board
        } else {
            board = this.state
        }
        console.log(this.props.location.state);
        return (
            <div className="goods">
                <span>디자이너 </span>
                <select name="designer_name" id="gdesigner_name" onChange={this.handleInputValue("designer_name")}>
                    <option value={board.designer_name ? board.designer_name : ''}>{board.designer_name ? board.designer_name : null}</option>
                    {this.state.data ?
                        this.state.data.map((e) => (
                            <option key={e.id} value={e.name} >{e.name}</option>
                        )) : null}
                </select>
                <select name="store" id="gstore" onChange={this.handleInputValue("store")}>
                    <option value={board.store ? board.store : ''}>{board.store ? board.store : ''}</option>
                    <option value="강남점">강남점</option>
                    <option value="홍대입구역점">홍대입구역점</option>
                    <option value="신촌점">신촌점</option>
                    <option value="합정점">합정점</option>
                </select>
                <div>
                    <span>상품이름 </span>
                    <input
                        type="text"
                        onChange={this.handleInputValue("name")}
                        placeholder="상품이름"
                        id="gname"
                    />
                </div>
                <div>
                    <span>상품설명 </span>
                    <input
                        type="text"
                        onChange={this.handleInputValue("content")}
                        placeholder="상품설명"
                        id="gcontent"
                    />
                </div>
                <div>
                    <span>상품가격 </span>
                    <input
                        type="number"
                        onChange={this.handleInputValue("price")}
                        placeholder="가격(원)"
                        id="gprice"
                    />
                </div>
                <div>
                    <span style={{ height: "50px", float: "left" }}>상품추가설명 </span>
                    <span>
                        <textarea
                            style={{ height: "50px", marginTop: "20px", width: "200px" }}
                            onChange={this.handleInputValue("addPrice")}
                            placeholder="추가가격설명"
                            id="gaddPrice"
                        />
                    </span>
                </div>
                <div>
                    <span>카테고리</span>
                    <select name="category" id="gcategory" onChange={this.handleInputValue("category")}>
                        <option value={board.category ? board.category : ''}>
                            {board.category === 1 ? "컷" :
                                board.category === 2 ? "펌" :
                                    board.category === 3 ? "염색" :
                                        board.category === 4 ? "붙임머리" :
                                            board.category === 5 ? "클리닉" : ''}
                        </option>
                        <option value={1}>컷</option>
                        <option value={2}>펌</option>
                        <option value={3}>염색</option>
                        <option value={4}>붙임머리</option>
                        <option value={5}>클리닉</option>
                    </select>
                </div>
                <div>
                    <span>이벤트 유/무 </span>
                    <select name="eventType" id="geventType" onChange={this.handleInputValue("eventType")}>
                        <option value={board.eventType ? board.eventType : ''}>
                            {Number(board.eventType) === 0 ? "이벤트 없음" :
                                Number(board.eventType) === 1 ? "이벤트 있음" : ""}
                        </option>
                        <option value={0}>이벤트 없음</option>
                        <option value={1}>이벤트 있음</option>
                    </select>
                    <input
                        className={Number(this.state.eventType) === 1 ? "on" : "off"}
                        style={{ width: "70px" }}
                        type="number"
                        onChange={this.handleInputValue("eventPrice")}
                        placeholder="할인률(%)"
                        id="geventPrice"
                    />
                </div>
                <div>
                </div>
                <span>공개여부 </span>
                <select name="open" id="gopen" onChange={this.handleInputValue("open")}>
                    <option value={board.open ? board.open : ''}>
                        {board.open === "0" ? "비공개" :
                            board.open === "1" ? "공개" : ""}
                    </option>
                    <option value={0}>비공개</option>
                    <option value={1}>공개</option>
                </select>
                <div>
                    <span>성별 </span>
                    <select name="gender" id="ggender" onChange={this.handleInputValue("gender")}>
                        <option value={board.gender ? board.gender : ''}>
                            {board.gender === 0 ? "남자" :
                                board.gender === 1 ? "여자" : ""}
                        </option>
                        <option value={0}>남자</option>
                        <option value={1}>여자</option>
                    </select>
                </div>
                <div>
                    <span>기장 </span>
                    <select name="length" id="glength" onChange={this.handleInputValue("length")}>
                        <option value={board.length ? board.length : ''}>
                            {board.length === 1 ? "숏" :
                                board.length === 2 ? "미듐" :
                                    board.length === 3 ? "롱" : ""}
                        </option>
                        <option value={1}>숏</option>
                        <option value={2}>미듐</option>
                        <option value={3}>롱</option>
                    </select>
                </div>
                <div style={{ marginBottom: "30px", height: "fit-content" }}>
                    <div style={{ display: "inline-block" }}>
                        <div style={{ marginTop: "40px" }}>Main img</div>
                        <div style={{ width: "375px",  marginTop: "40px"  }}>
                            <input
                                type="text"
                                onChange={this.handleInputValue("MainimgMain")}
                                placeholder="메인 설명"
                                id="gMainimgMain"
                            />
                        </div>
                        <div style={{ width: "375px", marginTop: "20px", marginBottom: "30px" }}>
                            <input
                                type="text"
                                onChange={this.handleInputValue("MainimgSub")}
                                placeholder="서브 설명"
                                id="gMainimgSub"
                            />
                        </div>
                        {
                            this.state.Mainimgs.length ?
                                this.state.Mainimgs.map((e, i) => (
                                    <div key={i} style={{marginTop: "10px"}}>
                                    <div style={{ width: "20px", backgroundColor: "#ffffff", position: "absolute", border: "1px solid #F5F5F5", textAlign: "center",cursor: "pointer" }} onClick={this.onClickDelMain(i)}>x</div>
                                        <img style={{ width: "150px" }} onClick={this.onClickthumbnail(e.url)} className={(this.state.thumbnail === e.url ? "push_button" : '')} src={e.url} alt={e.url}></img>
                                    </div>
                                )) : null
                        }
                        <div style={{ marginTop: "20px" }}>
                            <label htmlFor="board_Mainimg">이미지 선택</label>
                            <input
                                type="file"
                                accept="image/*"
                                size="40"
                                id="board_Mainimg"
                                onChange={this.handleInputValue("Mainimg")}
                            />
                            <span style={{ marginLeft: "20px" }} onClick={this.onClickMain}>이미지 추가</span>
                        </div>
                    </div>
                </div>
                <div style={{ display: "inline-block", width: "100%" }}>
                    <div style={{ marginTop: "40px" }}>Sub img</div>

                    {
                        this.state.SubimgTotal.length ?
                            this.state.SubimgTotal.map((e, i) => (
                                <div key={i} style={{border: "1px solid #F5F5F5", marginBottom: "15px", textAlign: "center"}}>
                                <div style={{ width: "20px", backgroundColor: "#ffffff", position: "absolute", border: "1px solid #F5F5F5", textAlign: "center",cursor: "pointer"  }} onClick={this.onClickDelSubtotal(i)}>x</div>
                                    <div>{e.main}</div>
                                    {e.img.map((e, j) => (
                                        <div key={j}>
                                            <img style={{ width: "150px" }} onClick={this.onClickthumbnail(e.url)} className={(this.state.thumbnail === e.url ? "push_button" : '')} src={e.url} alt={e.url}></img>
                                        </div>
                                    ))
                                    }
                                </div>
                            )) : null
                    }
                    <div style={{ marginTop: "20px" }}>
                        <div>

                            {
                                this.state.Subimgs.length ?
                                    this.state.Subimgs.map((e, n) => (
                                        <div key={n}>
                                        <div style={{ width: "20px", backgroundColor: "#ffffff", position: "absolute", border: "1px solid #F5F5F5", textAlign: "center",cursor: "pointer" }} onClick={this.onClickDelSub(n)}>x</div>
                                            <img style={{ width: "150px" }} onClick={this.onClickthumbnail(e.url)} className={(this.state.thumbnail === e.url ? "push_button" : '')} src={e.url} alt={e.url}></img>
                                        </div>
                                    )) : null
                            }
                            <input
                                type="text"
                                onChange={this.handleInputValue("SubimgSub")}
                                placeholder="서브 설명"
                                id="gSubimgSub"
                            />
                        </div>
                        <label htmlFor="board_Subimg">이미지 선택</label>
                        <input
                            type="file"
                            accept="image/*"
                            size="40"
                            id="board_Subimg"
                            onChange={this.handleInputValue("Subimg")}
                        />
                        <span style={{ marginLeft: "20px" }} onClick={this.onClickSub}>이미지 추가</span>
                    </div>
                    <div>

                        <span onClick={this.onClickSubtotal}>추가</span>
                    </div>
                </div>
                <div style={{ marginTop: "40px"}}>before & after</div>
                {
                    this.state.beforeAfterImg.length ?
                        this.state.beforeAfterImg.map((e, i) => (
                            <div key={i} style={{border: "1px solid #F5F5F5", marginBottom: "15px", textAlign: "center"}}>
                            <div style={{ width: "20px", backgroundColor: "#ffffff", position: "absolute", border: "1px solid #F5F5F5", textAlign: "center",cursor: "pointer"  }}  onClick={this.onClickDelBaA(i)}>x</div>
                                <div style={{ justifyContent: "space-around", display: "flex", height: "170px" , marginTop: "30px"}}>
                                    <span><img style={{ width: "150px" }} onClick={this.onClickthumbnail(e.beforeimg)} className={(this.state.thumbnail === e.beforeimg ? "push_button" : '')} src={e.beforeimg} alt={e.beforeimg}></img></span>
                                    <span><img style={{ width: "150px" }} onClick={this.onClickthumbnail(e.afterimg)} className={(this.state.thumbnail === e.afterimg ? "push_button" : '')} id={e.afterimg} src={e.afterimg} alt={e.afterimg}></img></span>
                                </div>
                                <div>{e.main}</div>
                            </div>
                        )) : null
                }
                <div style={{marginTop: "40px"}}>
                    <label style={{width: "40px", fontSize: "13px", marginRight: "10px"}} htmlFor="board_beforeimg">before</label>
                    <input
                        type="file"
                        accept="image/*"
                        size="40"
                        id="board_beforeimg"
                        onChange={this.handleInputValue("beforeimg")}
                    />
                    <label style={{width: "40px", fontSize: "13px"}} htmlFor="board_afterimg">after</label>
                    <input
                        type="file"
                        accept="image/*"
                        size="40"
                        id="board_afterimg"
                        onChange={this.handleInputValue("afterimg")}
                    />
                    <input
                        style={{ marginLeft: "10px", width: "200px" }}
                        type="text"
                        onChange={this.handleInputValue("beforeAfter")}
                        placeholder="비포앤에프터 설명"
                        id="gbeforeAfter"
                    />
                </div>
                <div style={{marginBottom: "45px"}}>
                    <span onClick={this.onClickBaA}>추가</span>
                </div>
                {
                    this.props.location.state ?
                        <button onClick={this.handleImgedit}>수정</button> :
                        <button onClick={this.handleImgValue}>등록</button>
                }
            </div>
        );
    }
}

export default create;