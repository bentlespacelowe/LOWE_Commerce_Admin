import axios from 'axios';
import React, { Component } from 'react';
import './create.css';

class create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      designer_name: '',
      store: '',
      name: '',
      content: '',
      addContent: '',
      price: 0,
      eventType: null,
      eventPrice: 0,
      category: '',
      gender: '',
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
      ManagerId: null,
    };
  }

  componentDidMount = () => {
    axios
      .post('http://15.165.44.114:5000/getDesignerList', {})
      .then((res) => {
        this.setState({ data: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (this.props.location.state) {
      let mainimg = [];
      let mainimgurl = [];
      let subimg = [];
      let subimgurl = [];
      let BAimg = [];

      const img = this.props.location.state.data.board.Images;
      for (let i = 0; i < img.length; i++) {
        if (img[i].imgType === 0) {
          for (let j = 0; j < img[i].Urls.length; j++) {
            mainimgurl.push({
              url: img[i].Urls[j].url,
            });
          }
          mainimg = {
            main: img[i].main,
            sub: img[i].sub,
            img: mainimgurl,
          };
          document.getElementById('gMainimgMain').value = img[i].main;
          document.getElementById('gMainimgSub').value = img[i].sub;
        }
        if (img[i].imgType === 2) {
          BAimg.push({
            main: img[i].main,
            beforeimg: img[i].beforeimg,
            afterimg: img[i].afterimg,
          });
        }
        if (img[i].imgType === 1) {
          for (let j = 0; j < img[i].Urls.length; j++) {
            subimgurl.push({
              url: img[i].Urls[j].url,
            });
          }
          subimg.push({
            main: img[i].main,
            img: subimgurl,
          });
          subimgurl = [];
        }
      }

      console.log(mainimg);

      document.getElementById('gdesigner_name').value = this.props.location.state.data.board.ManagerId;
      document.getElementById('gstore').value = this.props.location.state.data.board.store;
      document.getElementById('gname').value = this.props.location.state.data.board.name;
      document.getElementById('gcontent').value = this.props.location.state.data.board.content;
      document.getElementById('gprice').value = this.props.location.state.data.board.price;
      document.getElementById('gaddPrice').value = this.props.location.state.data.board.addPrice;
      document.getElementById('gcategory').value = this.props.location.state.data.board.category;
      document.getElementById('geventType').value = this.props.location.state.data.board.eventType;
      document.getElementById('geventPrice').value = this.props.location.state.data.board.eventPrice;
      document.getElementById('gopen').value = this.props.location.state.data.board.open;
      document.getElementById('ggender').value = this.props.location.state.data.board.gender;
      document.getElementById('glength').value = this.props.location.state.data.board.length;

      this.setState({
        ManagerId: this.props.location.state.data.board.ManagerId,
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
        SubimgTotal: subimg,
      });
    }
  };

  handleInputValue = (key) => async (e) => {
    if (key === 'beforeimg' || key === 'afterimg' || key === 'Mainimg' || key === 'Subimg' || key === 'Subimg') {
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
      formData.append('file', img);
      await axios
        .post('http://15.165.44.114:5000/addImg', formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.setState({ [key]: res.data.url });
        });
    } else if (key === 'designer_name') {
      let id = Number(e.target.value);
      this.setState({
        ManagerId: id,
        [key]: document.getElementById('gdesigner_name').options[document.getElementById('gdesigner_name').selectedIndex].text,
      });
    } else {
      this.setState({ [key]: e.target.value });
    }
  };

  handleImgValue = () => {
    const beforeAfterImg = this.state.beforeAfterImg;
    const surgeryImg = this.state.SubimgTotal;
    const mainImg = [
      {
        main: this.state.MainimgMain,
        sub: this.state.MainimgSub,
        img: this.state.Mainimgs,
      },
    ];
    const category2 = [
      {
        content: '??????',
      },
    ];
    axios
      .post('http://15.165.44.114:5000/createBoard', {
        phone: '0',
        designer_name: this.state.designer_name,
        store: this.state.store,
        name: this.state.name,
        content: this.state.content,
        addContent: '0',
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
        ManagerId: Number(this.state.ManagerId),
        mainImg,
        beforeAfterImg,
        surgeryImg,
        category2,
      })
      .then((result) => {
        window.location.replace('/goods');
        console.log('result');
      });
  };
  handleImgedit = async () => {
    const beforeAfterImg = this.state.beforeAfterImg;
    const surgeryImg = this.state.SubimgTotal;
    const mainImg = [
      {
        main: this.state.MainimgMain,
        sub: this.state.MainimgSub,
        img: this.state.Mainimgs,
      },
    ];
    const category2 = [
      {
        content: '??????',
      },
    ];
    await axios
      .post('http://15.165.44.114:5000/updateBoard', {
        id: Number(window.location.pathname.split('/')[3]),
        phone: '0',
        designer_name: this.state.designer_name,
        store: this.state.store,
        name: this.state.name,
        content: this.state.content,
        addContent: '0',
        price: this.state.price,
        addPrice: this.state.addPrice,
        eventType: Number(this.state.eventType),
        eventPrice: this.state.eventPrice,
        category: Number(this.state.category),
        open: this.state.open,
        time: 0,
        gender: Number(this.state.gender),
        length: Number(this.state.length),
        ManagerId: Number(this.state.ManagerId),
        thumbnail: this.state.thumbnail,
        mainImg,
        beforeAfterImg,
        surgeryImg,
        category2,
      })
      .then((result) => {
        window.location.replace('/goods');
      });
  };

  onClickBaA = () => {
    let beforeAfter = this.state.beforeAfterImg;
    let data = {
      main: this.state.beforeAfter,
      beforeimg: this.state.beforeimg,
      afterimg: this.state.afterimg,
    };
    beforeAfter.push(data);
    this.setState({ beforeAfterImg: beforeAfter });

    document.getElementById('gbeforeAfter').value = '';
  };

  onClickDelBaA = (i) => () => {
    let beforeAfter = this.state.beforeAfterImg;
    beforeAfter.splice(i, 1);
    this.setState({ beforeAfterImg: beforeAfter });
  };

  onClickBaAup = (i) => () => {
    if (i > 0) {
      let beforeAfter = this.state.beforeAfterImg;
      let a = beforeAfter[i];
      let b = beforeAfter[i - 1];
      beforeAfter[i - 1] = a;
      beforeAfter[i] = b;
      this.setState({ beforeAfterImg: beforeAfter });
    } else {
      window.alert('?????????');
    }
  };

  onClickBaAdown = (i) => () => {
    if (i + 1 < this.state.beforeAfterImg.length) {
      let beforeAfter = this.state.beforeAfterImg;
      let a = beforeAfter[i];
      let b = beforeAfter[i + 1];
      beforeAfter[i + 1] = a;
      beforeAfter[i] = b;
      this.setState({ beforeAfterImg: beforeAfter });
    } else {
      window.alert('?????????');
    }
  };

  onClickMain = () => {
    let main = this.state.Mainimgs;
    let data = {
      url: this.state.Mainimg,
    };
    main.push(data);
    this.setState({ mainimgs: main });
  };

  onClickDelMain = (i) => () => {
    let main = this.state.Mainimgs;
    main.splice(i, 1);
    this.setState({ Mainimgs: main });
  };

  onClickMainup = (i) => () => {
    if (i > 0) {
      let main = this.state.Mainimgs;
      let a = main[i];
      let b = main[i - 1];
      main[i - 1] = a;
      main[i] = b;
      this.setState({ mainimgs: main });
    } else {
      window.alert('?????????');
    }
  };

  onClickMaindown = (i) => () => {
    if (i + 1 < this.state.mainImg.length) {
      let main = this.state.Mainimgs;
      let a = main[i];
      let b = main[i + 1];
      main[i + 1] = a;
      main[i] = b;
      this.setState({ mainimgs: main });
    } else {
      window.alert('?????????');
    }
  };

  onClickSub = () => {
    let subimg = this.state.Subimgs;
    let data = {
      url: this.state.Subimg,
    };
    subimg.push(data);
    this.setState({ Subimgs: subimg });
  };

  onClickDelSub = (i) => () => {
    let subimg = this.state.Subimgs;
    subimg.splice(i, 1);
    this.setState({ Subimgs: subimg });
  };

  onClickSubup = (i) => () => {
    if (i > 0) {
      let subimg = this.state.SubimgTotal;
      let a = subimg[i];
      let b = subimg[i - 1];
      subimg[i - 1] = a;
      subimg[i] = b;
      this.setState({ SubimgTotal: subimg });
    } else {
      window.alert('?????????');
    }
  };

  onClickSubdown = (i) => () => {
    if (i + 1 < this.state.mainImg.length) {
      let subimg = this.state.SubimgTotal;
      let a = subimg[i];
      let b = subimg[i + 1];
      subimg[i + 1] = a;
      subimg[i] = b;
      this.setState({ SubimgTotal: subimg });
    } else {
      window.alert('?????????');
    }
  };

  onClickSubtotal = () => {
    let SubimgTotal = this.state.SubimgTotal;
    let data = {
      main: this.state.SubimgSub,
      img: this.state.Subimgs,
    };
    SubimgTotal.push(data);
    this.setState({ SubimgTotal: SubimgTotal, SubimgSub: '', Subimgs: [] });

    document.getElementById('gSubimgSub').value = '';
  };

  onClickDelSubtotal = (i) => () => {
    let SubimgTotal = this.state.SubimgTotal;
    SubimgTotal.splice(i, 1);
    this.setState({ SubimgTotal: SubimgTotal });
  };

  onClickthumbnail = (e) => () => {
    this.setState({ thumbnail: e });
  };

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
      board = this.props.location.state.data.board;
    } else {
      board = this.state;
    }
    console.log(this.props.location.state);
    return (
      <div className='goods'>
        <span>???????????? </span>
        <select name='designer_name' id='gdesigner_name' onChange={this.handleInputValue('designer_name')}>
          <option value={board.ManagerId ? board.ManagerId : ''}>{board.designer_name ? board.designer_name : null}</option>
          {this.state.data
            ? this.state.data.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))
            : null}
        </select>
        <select name='store' id='gstore' onChange={this.handleInputValue('store')}>
          <option value={board.store ? board.store : ''}>{board.store ? board.store : ''}</option>
          <option value='?????????'>?????????</option>
          <option value='??????????????????'>??????????????????</option>
          <option value='?????????'>?????????</option>
          <option value='?????????'>?????????</option>
          <option value='L7?????????'>L7?????????</option>
        </select>
        <div>
          <span>???????????? </span>
          <input type='text' onChange={this.handleInputValue('name')} placeholder='????????????' id='gname' />
        </div>
        <div>
          <span>???????????? </span>
          <input type='text' onChange={this.handleInputValue('content')} placeholder='????????????' id='gcontent' />
        </div>
        <div>
          <span>???????????? </span>
          <input type='number' onChange={this.handleInputValue('price')} placeholder='??????(???)' id='gprice' />
        </div>
        <div>
          <span style={{ height: '50px', float: 'left' }}>?????????????????? </span>
          <span>
            <textarea
              style={{ height: '50px', marginTop: '20px', width: '200px' }}
              onChange={this.handleInputValue('addPrice')}
              placeholder='??????????????????'
              id='gaddPrice'
            />
          </span>
        </div>
        <div>
          <span>????????????</span>
          <select name='category' id='gcategory' onChange={this.handleInputValue('category')}>
            <option value={board.category ? board.category : ''}>
              {board.category === 1
                ? '???'
                : board.category === 2
                ? '???'
                : board.category === 3
                ? '??????'
                : board.category === 4
                ? '????????????'
                : board.category === 5
                ? '?????????'
                : ''}
            </option>
            <option value={1}>???</option>
            <option value={2}>???</option>
            <option value={3}>??????</option>
            <option value={4}>????????????</option>
            <option value={5}>?????????</option>
          </select>
        </div>
        <div>
          <span>????????? ???/??? </span>
          <select name='eventType' id='geventType' onChange={this.handleInputValue('eventType')}>
            <option value={board.eventType ? board.eventType : ''}>
              {Number(board.eventType) === 0 ? '????????? ??????' : Number(board.eventType) === 1 ? '????????? ??????' : ''}
            </option>
            <option value={0}>????????? ??????</option>
            <option value={1}>????????? ??????</option>
          </select>
          <input
            className={Number(this.state.eventType) === 1 ? 'on' : 'off'}
            style={{ width: '70px' }}
            type='number'
            onChange={this.handleInputValue('eventPrice')}
            placeholder='?????????(%)'
            id='geventPrice'
          />
        </div>
        <div></div>
        <span>???????????? </span>
        <select name='open' id='gopen' onChange={this.handleInputValue('open')}>
          <option value={board.open ? board.open : ''}>{board.open === '0' ? '?????????' : board.open === '1' ? '??????' : ''}</option>
          <option value={0}>?????????</option>
          <option value={1}>??????</option>
        </select>
        <div>
          <span>?????? </span>
          <select name='gender' id='ggender' onChange={this.handleInputValue('gender')}>
            <option value={board.gender ? board.gender : ''}>{board.gender === 0 ? '??????' : board.gender === 1 ? '??????' : ''}</option>
            <option value={0}>??????</option>
            <option value={1}>??????</option>
          </select>
        </div>
        <div>
          <span>?????? </span>
          <select name='length' id='glength' onChange={this.handleInputValue('length')}>
            <option value={board.length ? board.length : ''}>
              {board.length === 1 ? '???' : board.length === 2 ? '??????' : board.length === 3 ? '???' : ''}
            </option>
            <option value={1}>???</option>
            <option value={2}>??????</option>
            <option value={3}>???</option>
          </select>
        </div>
        <div style={{ marginBottom: '30px', height: 'fit-content' }}>
          <div style={{ display: 'inline-block' }}>
            <div style={{ marginTop: '40px' }}>Main img</div>
            <div style={{ width: '375px', marginTop: '40px' }}>
              <input type='text' onChange={this.handleInputValue('MainimgMain')} placeholder='?????? ??????' id='gMainimgMain' />
            </div>
            <div style={{ width: '375px', marginTop: '20px', marginBottom: '30px' }}>
              <input type='text' onChange={this.handleInputValue('MainimgSub')} placeholder='?????? ??????' id='gMainimgSub' />
            </div>
            {this.state.Mainimgs.length
              ? this.state.Mainimgs.map((e, i) => (
                  <div key={i} style={{ marginTop: '10px' }}>
                    <span onClick={this.onClickMainup(i)}>???</span>
                    <div
                      style={{
                        width: '20px',
                        backgroundColor: '#ffffff',
                        position: 'absolute',
                        border: '1px solid #F5F5F5',
                        textAlign: 'center',
                        cursor: 'pointer',
                      }}
                      onClick={this.onClickDelMain(i)}
                    >
                      x
                    </div>
                    <img
                      style={{ width: '150px' }}
                      onClick={this.onClickthumbnail(e.url)}
                      className={this.state.thumbnail === e.url ? 'push_button' : ''}
                      src={e.url}
                      alt={e.url}
                    ></img>

                    <span onClick={this.onClickMaindown(i)}>???</span>
                  </div>
                ))
              : null}
            <div style={{ marginTop: '20px' }}>
              <label htmlFor='board_Mainimg'>????????? ??????</label>
              <input type='file' accept='image/*' size='40' id='board_Mainimg' onChange={this.handleInputValue('Mainimg')} />
              <span style={{ marginLeft: '20px' }} onClick={this.onClickMain}>
                ????????? ??????
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'inline-block', width: '100%' }}>
          <div style={{ marginTop: '40px' }}>Sub img</div>

          {this.state.SubimgTotal.length
            ? this.state.SubimgTotal.map((e, i) => (
                <div key={i} style={{ border: '1px solid #F5F5F5', marginBottom: '15px', textAlign: 'center' }}>
                  <span onClick={this.onClickSubup(i)}>???</span>
                  <div
                    style={{
                      width: '20px',
                      backgroundColor: '#ffffff',
                      position: 'absolute',
                      border: '1px solid #F5F5F5',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={this.onClickDelSubtotal(i)}
                  >
                    x
                  </div>
                  <div>{e.main}</div>
                  {e.img.map((e, j) => (
                    <div key={j}>
                      <img
                        style={{ width: '150px' }}
                        onClick={this.onClickthumbnail(e.url)}
                        className={this.state.thumbnail === e.url ? 'push_button' : ''}
                        src={e.url}
                        alt={e.url}
                      ></img>
                    </div>
                  ))}

                  <span onClick={this.onClickSubdown(i)}>???</span>
                </div>
              ))
            : null}
          <div style={{ marginTop: '20px' }}>
            <div>
              {this.state.Subimgs.length
                ? this.state.Subimgs.map((e, n) => (
                    <div key={n}>
                      <div
                        style={{
                          width: '20px',
                          backgroundColor: '#ffffff',
                          position: 'absolute',
                          border: '1px solid #F5F5F5',
                          textAlign: 'center',
                          cursor: 'pointer',
                        }}
                        onClick={this.onClickDelSub(n)}
                      >
                        x
                      </div>
                      <img
                        style={{ width: '150px' }}
                        onClick={this.onClickthumbnail(e.url)}
                        className={this.state.thumbnail === e.url ? 'push_button' : ''}
                        src={e.url}
                        alt={e.url}
                      ></img>
                    </div>
                  ))
                : null}
              <input type='text' onChange={this.handleInputValue('SubimgSub')} placeholder='?????? ??????' id='gSubimgSub' />
            </div>
            <label htmlFor='board_Subimg'>????????? ??????</label>
            <input type='file' accept='image/*, .avi, .mp4' size='40' id='board_Subimg' onChange={this.handleInputValue('Subimg')} />
            <span style={{ marginLeft: '20px' }} onClick={this.onClickSub}>
              ????????? ??????
            </span>
          </div>
          <div>
            <span onClick={this.onClickSubtotal}>??????</span>
          </div>
        </div>
        <div style={{ marginTop: '40px' }}>before & after</div>
        {this.state.beforeAfterImg.length
          ? this.state.beforeAfterImg.map((e, i) => (
              <div key={i} style={{ border: '1px solid #F5F5F5', marginBottom: '15px', textAlign: 'center' }}>
                <div
                  style={{
                    width: '20px',
                    backgroundColor: '#ffffff',
                    position: 'absolute',
                    border: '1px solid #F5F5F5',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={this.onClickDelBaA(i)}
                >
                  x
                </div>
                <div style={{ justifyContent: 'space-around', display: 'flex', height: '170px', marginTop: '30px' }}>
                  <span onClick={this.onClickBaAup(i)}>???</span>
                  <span>
                    <img
                      style={{ width: '150px' }}
                      onClick={this.onClickthumbnail(e.beforeimg)}
                      className={this.state.thumbnail === e.beforeimg ? 'push_button' : ''}
                      src={e.beforeimg}
                      alt={e.beforeimg}
                    ></img>
                  </span>
                  <span>
                    <img
                      style={{ width: '150px' }}
                      onClick={this.onClickthumbnail(e.afterimg)}
                      className={this.state.thumbnail === e.afterimg ? 'push_button' : ''}
                      id={e.afterimg}
                      src={e.afterimg}
                      alt={e.afterimg}
                    ></img>
                  </span>

                  <span onClick={this.onClickBaAdown(i)}>???</span>
                </div>
                <div>{e.main}</div>
              </div>
            ))
          : null}
        <div style={{ marginTop: '40px' }}>
          <label style={{ width: '40px', fontSize: '13px', marginRight: '10px' }} htmlFor='board_beforeimg'>
            before
          </label>
          <input type='file' accept='image/*' size='40' id='board_beforeimg' onChange={this.handleInputValue('beforeimg')} />
          <label style={{ width: '40px', fontSize: '13px' }} htmlFor='board_afterimg'>
            after
          </label>
          <input type='file' accept='image/*' size='40' id='board_afterimg' onChange={this.handleInputValue('afterimg')} />
          <input
            style={{ marginLeft: '10px', width: '200px' }}
            type='text'
            onChange={this.handleInputValue('beforeAfter')}
            placeholder='?????????????????? ??????'
            id='gbeforeAfter'
          />
        </div>
        <div style={{ marginBottom: '45px' }}>
          <span onClick={this.onClickBaA}>??????</span>
        </div>
        {this.props.location.state ? <button onClick={this.handleImgedit}>??????</button> : <button onClick={this.handleImgValue}>??????</button>}
      </div>
    );
  }
}

export default create;
