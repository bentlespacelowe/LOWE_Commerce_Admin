import axios from 'axios';
import { Component } from 'react';

class couponcreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      content: '',
      minimum: null,
    };
  }

  handleInputValue = (key) => async (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleImgValue = async () => {
    let id = window.location.pathname.split('/')[3];
    await axios
      .post('http://15.165.44.114:5000/createCoupon', {
        UserId: id,
        price: this.state.price,
        content: this.state.content,
        used: '1',
        expired: this.state.expired,
        minimum: this.state.minimum,
      })
      .then(() => {
        window.location.replace('/users');
      });
  };

  render() {
    console.log(this.state);
    return (
      <section className='designer'>
        <div>금액</div>
        <div>
          <input type='number' onChange={this.handleInputValue('price')} placeholder='금액' id='cprice' />
        </div>
        <div>내용</div>
        <div>
          <input type='text' onChange={this.handleInputValue('content')} placeholder='내용' id='ccontent' />
        </div>
        <div>만료날짜</div>
        <div>
          <input type='text' onChange={this.handleInputValue('expired')} placeholder='만료날짜(ex. 1999-01-01)' id='cexpired' />
        </div>
        <div>최저금액</div>
        <div>
          <input type='text' onChange={this.handleInputValue('minimum')} placeholder='최저금액' id='cminimum' />
        </div>
        <button onClick={this.handleImgValue}>submit</button>
      </section>
    );
  }
}

export default couponcreate;
