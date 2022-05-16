import React, { Component } from 'react';
import './Fifthsec.css';

class Fifthsec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      review: [],
      imgreview: [],
      showreview: [],
      number: 10,
    };
  }

  componentDidMount = () => {
    if (this.props.data.board.Reviews.length > 0) {
      let arr = [];
      let imgarr = [];
      for (let i = 0; i < this.props.data.board.Reviews.length; i++) {
        arr.unshift(this.props.data.board.Reviews[i]);
        if (this.props.data.board.Reviews[i].Images.length > 0) {
          imgarr.unshift(this.props.data.board.Reviews[i]);
        }
      }
      this.setState({ review: arr, imgreview: imgarr, showreview: arr.slice(0, this.state.number) });
    }
  };

  onClickmoreview = () => {
    this.setState({ number: this.state.number + 10, showreview: this.state.review.slice(0, this.state.number + 10) });
  };

  render() {
    return (
      <section className='Board_fifth_section' id='review'>
        <div style={{ paddingTop: '120px' }}></div>
      </section>
    );
  }
}

export default Fifthsec;
