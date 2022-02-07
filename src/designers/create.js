import axios from "axios";
import { Component } from "react";
import "./create.css"

class create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            home: "",
            introduction: "",
            reserve_url: "",
            user_state: 0,
            store: "",
            img: "",
        };
    }

    componentDidMount = () => {

        if (this.props.location.state) {
            document.getElementById("dhome").value = this.props.location.state.e.home
            document.getElementById("dintroduction").value = this.props.location.state.e.introduction
            document.getElementById("dname").value = this.props.location.state.e.name
            document.getElementById("dphone").value = this.props.location.state.e.login_id
            document.getElementById("dreserve").value = this.props.location.state.e.reserve_url
            document.getElementById("dstore").value = this.props.location.state.e.store
            this.setState({
                home: this.props.location.state.e.home,
                img: this.props.location.state.e.img,
                introduction: this.props.location.state.e.introduction,
                name: this.props.location.state.e.name,
                phone: this.props.location.state.e.login_id,
                reserve_url: this.props.location.state.e.reserve_url,
                store: this.props.location.state.e.store,
            })

        }
    };

    handleInputValue = (key) => async (e) => {
        if (key === "img") {
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

    handleEditDesigner = async () => {
        await axios
            .post("http://3.36.218.192:5000/updateDesigner", {
                id: this.props.location.state.e.id,
                normal_id: this.state.name,
                password: "1234",
                name: this.state.name,
                login_id: this.state.phone,
                home: this.state.home,
                introduction: this.state.introduction,
                reserve_url: this.state.reserve_url,
                user_state: 1,
                img: this.state.img,
                user_type: 1,
                store: this.state.store
            })
            .then((res) => {
                window.location.replace("/designers")
            });
    };

    handleImgValue = async () => {
        await axios
            .post("http://3.36.218.192:5000/joinManager", {
                normal_id: this.state.name,
                password: "1234",
                name: this.state.name,
                login_id: this.state.phone,
                home: this.state.home,
                introduction: this.state.introduction,
                reserve_url: this.state.reserve_url,
                user_state: 1,
                img: this.state.img,
                user_type: 1,
                store: this.state.store
            })
            .then((res) => {
                window.location.replace("/designers")
            });
    };

    render() {
        return (
            <section className="designer">
                <div>이름</div>
                <div>
                    <input
                        type="text"
                        onChange={this.handleInputValue("name")}
                        placeholder="이름"
                        id="dname"
                    />
                </div>
                <div>전화번호</div>
                <div>
                    <input
                        type="text"
                        onChange={this.handleInputValue("phone")}
                        placeholder="전화번호"
                        id="dphone"
                    />
                </div>
                <div>지점</div>
                <div>
                    <input
                        type="text"
                        onChange={this.handleInputValue("store")}
                        placeholder="지점"
                        id="dstore"
                    />
                </div>
                <div>소개</div>
                <div>
                    <input
                        type="text"
                        onChange={this.handleInputValue("introduction")}
                        placeholder="소개"
                        id="dintroduction"
                    />
                </div>
                <div>프로필 페이지</div>
                <div>
                    <input
                        type="text"
                        onChange={this.handleInputValue("home")}
                        placeholder="프로필 페이지 url"
                        id="dhome"
                    />
                </div>
                <div>예약 페이지</div>
                <div>
                    <input
                        type="text"
                        onChange={this.handleInputValue("reserve_url")}
                        placeholder="네이버 페이지 url"
                        id="dreserve"
                    />
                </div>
                <div>사진</div>
                <div>
                    {
                        this.state.img ? <img style={{ width: "200px" }} src={this.state.img} alt="test"></img>
                            : null
                    }
                </div>
                <div>
                    <div style={{marginBottom: "40px"}}>
                    <label htmlFor="designer_img" >이미지</label>
                    <input
                        type="file"
                        accept="image/*"
                        size="40"
                        id="designer_img"
                        onChange={this.handleInputValue("img")}
                    />
                    </div>
                </div>
                {this.props.location.state ?
                    <button onClick={this.handleEditDesigner}>수정</button> :
                    <button onClick={this.handleImgValue}>submit</button>
                }
            </section>
        );
    }
}

export default create;