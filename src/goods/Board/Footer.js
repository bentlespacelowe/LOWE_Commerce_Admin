import { Component } from 'react';
import "./Footer.css"
import { Link } from 'react-router-dom';


class Footer extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    render() {
        console.log(this.props)
        return (
            <footer>
                <Link to={{
                    pathname: "/board/edit/" + this.props.id,
                    state: {
                        data: this.props.data
                    }
                }}>
                    <div>수정</div>
                </Link>
            </footer >
        );
    }
}
export default Footer;