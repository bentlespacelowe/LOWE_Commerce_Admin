import axios from "axios";
import { Component } from "react";

class create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            type: 0,
            open: 1,
            url: "",
            img: "",
            file: "",
        };
    }

    componentDidMount = () => {
        let id = window.location.pathname.split("/")[3];
        this.setState({ type: Number(id) })
        console.log("gi")
        if (this.props.location.state) {
            document.getElementById("bcontent").value = this.props.location.state.e.content
            document.getElementById("btitle").value = this.props.location.state.e.title
            document.getElementById("burl").value = this.props.location.state.e.url
            this.setState({
                content: this.props.location.state.e.content,
                img: this.props.location.state.e.img,
                title: this.props.location.state.e.title,
                type: this.props.location.state.e.type,
                url: this.props.location.state.e.url
            })

        }

    }


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
                .post("http://localhost:5000/addImg", formData, {
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

    handleEditbanner = async () => {
        await axios.post("http://localhost:5000/updateBanner", {
            id: this.props.location.state.e.id,
            title: this.state.title,
            content: this.state.content,
            type: this.state.type,
            open: 1,
            url: this.state.url,
            img: this.state.img
        })
            .then((res) => {
                window.location.replace("/banners")
                console.log(res.data);
            });
    }

    handleImgValue = async () => {
        await axios.post("http://localhost:5000/createBanner", {
            title: this.state.title,
            content: this.state.content,
            type: this.state.type,
            open: 1,
            url: this.state.url,
            img: this.state.img
        })
            .then((res) => {
                window.location.replace("/banners")
                console.log(res.data);
            });
    };

    render() {
        console.log(this.state)
        console.log(this.props.location.state)
        return (
            <section>
                <div>
                    <div>타이틀</div>
                    <input type="text" onChange={this.handleInputValue("title")} id="btitle" placeholder="제목" />
                </div>
                <div>
                    <div>내용</div>
                    <input type="text" onChange={this.handleInputValue("content")} id="bcontent" placeholder="내용" />
                </div>
                <div>
                    <div>링크</div>
                    <input type="text" onChange={this.handleInputValue("url")} id="burl" placeholder="이동url" />
                </div>
                <div>
                    <div>이미지</div>
                    <input type="file" accept="image/*" size="40" onChange={this.handleInputValue("img")} />
                </div>
                <div>
                    {
                        this.state.img ? <img style={{ width: "200px" }} src={this.state.img} alt="test"></img>
                            : null
                    }
                </div>
                {this.props.location.state ?
                    <button onClick={this.handleEditbanner}>수정</button> :
                    <button onClick={this.handleImgValue}>submit</button>
                }
            </section>
        )
    }
}

export default create;