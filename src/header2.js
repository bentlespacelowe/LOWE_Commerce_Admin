import React, { Component } from 'react';
import './header2.css';

class header2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  render() {
    return (
      <header className='header2'>
        <div>LOWE Admin</div>
      </header>
    );
  }
}

export default header2;
