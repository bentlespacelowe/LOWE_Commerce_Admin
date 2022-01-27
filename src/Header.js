import { Component } from "react";
import "./Header.css"

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }

    componentDidMount = () => {

    }

    render() {
        let login = window.localStorage.getItem("login");
        return (
            <header className="header">
                {login === "admin" ?
                    <>
                        <a href="/banners">배너</a>
                        <a href="/goods">상품</a>
                        <a href="/designers">디자이너</a>
                        <a href="/users">유저</a>
                    </> :
                    login === "store" ?
                        <>
                            <span onClick={(e) => { e.preventDefault(); window.alert("권한이 없습니다") }}>배너</span>
                            <span onClick={(e) => { e.preventDefault(); window.alert("권한이 없습니다") }}>상품</span>
                            <span onClick={(e) => { e.preventDefault(); window.alert("권한이 없습니다") }}>디자이너</span>
                            <a href="/users">유저</a>
                        </> :
                        <>
                            <span onClick={(e) => { e.preventDefault(); window.alert("권한이 없습니다") }}>배너</span>
                            <span onClick={(e) => { e.preventDefault(); window.alert("권한이 없습니다") }}>상품</span>
                            <span onClick={(e) => { e.preventDefault(); window.alert("권한이 없습니다") }}>디자이너</span>
                            <span onClick={(e) => { e.preventDefault(); window.alert("권한이 없습니다") }}>유저</span>
                        </>
                }
            </header>
        )
    }
}

export default Header;