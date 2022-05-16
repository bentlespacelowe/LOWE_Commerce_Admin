import axios from 'axios';
import React, { Component } from 'react';
import './create.css';
import './style.css';

class create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      styleTagTab: -1,
      addPortfolioState: 0,
      addPortfolio: {},
      name: '',
      phone: '',
      home: '',
      introduction: '',
      reserve_url: '',
      user_state: 0,
      store: '',
      img: '',
      rank: '',
      address: '',
      operating_time: '',
      sns: '',
      mainimg: '',
      mainimglink: '',
      mainimgtext: '',
      images: [],
      hash: '',
      hashtags: [],
      surprice: 0,
      surcontent: '',
      sururl: '',
      surgeries: [],
      coupon: '0',
      couponlimit: '',
      couponexpired: '',
      couponprice: '',
      coupontext: '',
      portfolios: [],
      board: '',
    };
  }

  componentDidMount = () => {
    if (this.props.location.state) {
      let coupon = '';
      if (JSON.parse(this.props.location.state.e.coupons)) {
        coupon = JSON.parse(this.props.location.state.e.coupons);
      } else {
        coupon = {
          coupon: '0',
          couponlimit: '',
          couponexpired: '',
          couponprice: '',
          coupontext: '',
        };
      }
      let images = this.props.location.state.e.Images;
      let hashtags = this.props.location.state.e.Hashtags;
      let surgeries = this.props.location.state.e.Surgeries;
      let portfolios = this.props.location.state.e.Portfolios;
      document.getElementById('dhome').value = this.props.location.state.e.home;
      document.getElementById('dintroduction').value = this.props.location.state.e.introduction;
      document.getElementById('dname').value = this.props.location.state.e.name;
      document.getElementById('dphone').value = this.props.location.state.e.login_id;
      document.getElementById('dreserve').value = this.props.location.state.e.reserve_url;
      document.getElementById('dstore').value = this.props.location.state.e.store;
      document.getElementById('drank').value = this.props.location.state.e.rank;
      document.getElementById('daddress').value = this.props.location.state.e.address;
      document.getElementById('dtime').value = this.props.location.state.e.operating_time;
      document.getElementById('dsns').value = this.props.location.state.e.sns;
      document.getElementById('dcoupon').value = coupon.coupond;
      document.getElementById('duser_state').value = this.props.location.state.e.user_state;
      this.setState({
        home: this.props.location.state.e.home,
        img: this.props.location.state.e.img,
        introduction: this.props.location.state.e.introduction,
        name: this.props.location.state.e.name,
        phone: this.props.location.state.e.login_id,
        reserve_url: this.props.location.state.e.reserve_url,
        store: this.props.location.state.e.store,
        rank: this.props.location.state.e.rank,
        address: this.props.location.state.e.address,
        operating_time: this.props.location.state.e.operating_time,
        sns: this.props.location.state.e.sns,
        user_state: this.props.location.state.e.user_state,
        couponlimit: coupon.couponlimit,
        couponexpired: coupon.couponexpired,
        couponprice: coupon.couponprice,
        coupontext: coupon.coupontext,
        coupon: coupon.coupon,
        images: images,
        hashtags: hashtags,
        surgeries: surgeries,
        portfolios: portfolios,
      });
      setTimeout(() => {
        document.getElementById('coupontext').value = coupon.coupontext;
        document.getElementById('couponprice').value = coupon.couponprice;
        document.getElementById('couponexpired').value = coupon.couponexpired;
        document.getElementById('couponlimit').value = coupon.couponlimit;
      }, 5);
    }
  };

  tabSelect = (tab) => () => {
    this.setState({ tab: tab });
  };

  styleTagTabSelect = (tag) => () => {
    this.setState({ styleTagTab: tag });
  };

  deleteHashtag = (portfolio, hashtag) => () => {
    hashtag.destroy = true;
    if (portfolio === this.state.addPortfolio) {
      const hashtagIndex = this.state.addPortfolio.Hashtags.indexOf(hashtag);
      let newPortfolio = this.state.addPortfolio;
      newPortfolio.Hashtags[hashtagIndex] = hashtag;
      this.setState({ addPortfolio: newPortfolio });
    } else {
      const portfolioIndex = this.state.portfolios.indexOf(portfolio);
      const hashtagIndex = this.state.portfolios[portfolioIndex].Hashtags.indexOf(hashtag);
      let updatedPortfolio = this.state.portfolios;
      updatedPortfolio[portfolioIndex].Hashtags[hashtagIndex] = hashtag;
      this.setState({ portfolios: updatedPortfolio });
    }
  };

  deleteBoard = (portfolio, board) => () => {
    if (portfolio === this.state.addPortfolio) {
      const boardIndex = this.state.addPortfolio.Boards.indexOf(board);
      let newPortfolio = this.state.addPortfolio;
      newPortfolio.Boards[boardIndex].destroy = true;
      this.setState({ addPortfolio: newPortfolio });
    } else {
      const portfolioIndex = this.state.portfolios.indexOf(portfolio);
      const boardIndex = this.state.portfolios[portfolioIndex].Boards.indexOf(board);
      let updatedPortfolio = this.state.portfolios;
      updatedPortfolio[portfolioIndex].Boards[boardIndex].destroy = true;
      this.setState({ portfolios: updatedPortfolio });
    }
  };

  editPortfolio = (portfolio) => () => {
    portfolio.edit = !portfolio.edit;
    const index = this.state.portfolios.indexOf(portfolio);
    let updatedPortfolio = this.state.portfolios;
    updatedPortfolio[index] = portfolio;
    this.setState({ portfolios: updatedPortfolio });
  };

  addPortfolio = () => () => {
    // console.log(this.state);
    if (this.state.addPortfolioState) {
      const updatedPortfolio = this.state.portfolios;
      const newPortfolio = this.state.addPortfolio;

      if (!newPortfolio.Hashtags.length) {
        alert('해시태그를 추가해주세요!');
      } else {
        updatedPortfolio.push(newPortfolio);
        this.setState({ portfolios: updatedPortfolio });
        this.setState({ addPortfolio: {} });
        this.setState({ addPortfolioState: !this.state.addPortfolioState });
      }
    } else {
      const newPortfolio = {};
      newPortfolio.Hashtags = [];
      newPortfolio.Boards = [];
      newPortfolio.content = 'content';
      newPortfolio.category = 1;
      newPortfolio.state = 1;
      newPortfolio.open = 1;
      this.setState({ addPortfolio: newPortfolio });
      this.setState({ addPortfolioState: !this.state.addPortfolioState });
    }
  };

  addPortfolioHashtag = () => () => {
    let obj = {
      content: this.state.hash,
      open: 1,
      type: 1,
    };
    let newPortfolio = this.state.addPortfolio;
    newPortfolio.Hashtags.push(obj);
    this.setState({ addPortfolio: newPortfolio, hash: '' });
  };

  addPortfolioBoard = () => () => {
    let newPortfolio = this.state.addPortfolio;
    let obj = {
      id: this.state.board,
      destroy: false,
    };
    newPortfolio.Boards.push(obj);
    this.setState({ addPortfolio: newPortfolio, board: '' });
  };

  editPortfolioHashtag = (portfolio) => () => {
    console.log('🚀 ~ file: create.js ~ line 190 ~ create ~ portfolio', portfolio);
    let obj = {
      content: this.state.hash,
      open: 1,
      type: 1,
    };
    let updatedPortfolio = this.state.portfolios;
    const index = updatedPortfolio.indexOf(portfolio);
    console.log('🚀 ~ file: create.js ~ line 198 ~ create ~ updatedPortfolio[index]', index);
    updatedPortfolio[index].Hashtags.push(obj);
    this.setState({ addPortfolio: updatedPortfolio, hash: '' });
  };

  editPortfolioBoard = (portfolio) => () => {
    let updatedPortfolio = this.state.portfolios;
    const index = updatedPortfolio.indexOf(portfolio);
    let obj = {
      id: this.state.board,
      destroy: false,
    };
    updatedPortfolio[index].Boards.push(obj);
    this.setState({ portfolios: updatedPortfolio, board: '' });
  };

  inputPortfolioImg = (portfolio) => async (e) => {
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
        if (portfolio) {
          let updatedPortfolio = this.state.portfolios;
          const index = this.state.portfolios.indexOf(portfolio);
          portfolio.editImg = res.data.url;
          updatedPortfolio[index] = portfolio;
          this.setState({ portfolios: updatedPortfolio });
        } else {
          let updatedPortfolio = this.state.addPortfolio;
          updatedPortfolio.img = res.data.url;
          this.setState({ addPortfolio: updatedPortfolio });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  deletePortfolio = (portfolio) => () => {
    if (window.confirm('이 사진을 삭제하겠습니까?')) {
      portfolio.destroy = true;
      const index = this.state.portfolios.indexOf(portfolio);
      let updatedPortfolio = this.state.portfolios;
      updatedPortfolio[index] = portfolio;
      this.setState({ portfolios: updatedPortfolio });
    }
  };

  handleInputValue = (key) => async (e) => {
    if (key === 'img' || key === 'mainimg') {
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
    } else {
      this.setState({ [key]: e.target.value });
    }
  };

  handleEditDesigner = async () => {
    let images = this.state.images;
    let hashtags = this.state.hashtags;
    let surgeries = this.state.surgeries;
    let coupon = {};
    if (this.state.coupon === '1') {
      coupon = {
        coupon: this.state.coupon,
        couponlimit: this.state.couponlimit,
        couponexpired: this.state.couponexpired,
        couponprice: this.state.couponprice,
        coupontext: this.state.coupontext,
      };
    } else {
      coupon = '';
    }

    await axios
      .patch('http://15.165.44.114:5000/manager', {
        id: this.props.location.state.e.id,
        normal_id: this.state.name,
        password: '1234',
        name: this.state.name,
        login_id: this.state.phone,
        home: this.state.home,
        introduction: this.state.introduction,
        reserve_url: this.state.reserve_url,
        user_state: this.state.user_state,
        img: this.state.img,
        user_type: 1,
        store: this.state.store,
        rank: this.state.rank,
        address: this.state.address,
        operating_time: this.state.operating_time,
        sns: this.state.sns,
        images: images,
        surgeries: surgeries,
        hashtags: hashtags,
        coupons: JSON.stringify(coupon),
        portfolios: this.state.portfolios,
      })
      .then((res) => {
        window.location.replace('/designers');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleImgValue = async () => {
    let images = this.state.images;
    let hashtags = this.state.hashtags;
    let surgeries = this.state.surgeries;
    let coupon = {};
    if (this.state.coupon === '1') {
      coupon = {
        coupon: this.state.coupon,
        couponlimit: this.state.couponlimit,
        couponexpired: this.state.couponexpired,
        couponprice: this.state.couponprice,
        coupontext: this.state.coupontext,
      };
    } else {
      coupon = '';
    }
    await axios
      .post('http://15.165.44.114:5000/joinManager', {
        normal_id: this.state.name,
        password: '1234',
        name: this.state.name,
        login_id: this.state.phone,
        home: this.state.home,
        introduction: this.state.introduction,
        reserve_url: this.state.reserve_url,
        user_state: this.state.user_state,
        img: this.state.img,
        user_type: 1,
        store: this.state.store,
        rank: this.state.rank,
        address: this.state.address,
        operating_time: this.state.operating_time,
        sns: this.state.sns,
        images: images,
        surgeries: surgeries,
        hashtags: hashtags,
        coupons: JSON.stringify(coupon),
        portfolios: this.state.portfolios,
      })
      .then((res) => {
        window.location.replace('/designers');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onClickmainimg = () => {
    let images = this.state.images;
    let obj = {
      main: this.state.mainimg,
      url: this.state.mainimglink,
      content: this.state.mainimgtext,
    };
    images.push(obj);
    this.setState({ images: images });
    document.getElementById('mainimglink').value = '';
    document.getElementById('mainimgtext').value = '';
  };

  onClickDelmain = (i) => () => {
    let images = this.state.images;
    images.splice(i, 1);
    this.setState({ images: images });
  };
  onClickhash = () => {
    let hashtags = this.state.hashtags;
    let obj = {
      content: this.state.hash,
      Manager_Hashtag: { open: 1, type: 1 },
    };
    hashtags.push(obj);
    this.setState({ hashtags: hashtags });
    document.getElementById('hash').value = '';
  };

  onClickDelhash = (e, i) => () => {
    let hashtags = this.state.hashtags;
    hashtags[i].destroy = true;
    // hashtags.splice(i, 1);
    this.setState({ hashtags: hashtags });
  };

  onClicksurgery = () => {
    let surgeries = this.state.surgeries;
    let obj = {
      price: this.state.surprice,
      content: this.state.surcontent,
      url: this.state.sururl,
    };
    surgeries.push(obj);
    this.setState({ surgeries: surgeries });
    document.getElementById('surcontent').value = '';
    document.getElementById('surprice').value = '';
    document.getElementById('sururl').value = '';
    this.setState({ surprice: '', surcontent: '', sururl: '' });
  };

  onClickDelsurgeries = (i) => () => {
    let surgeries = this.state.surgeries;
    surgeries.splice(i, 1);
    this.setState({ surgeries: surgeries });
  };

  onClicksurgeryup = (i) => () => {
    if (i > 0) {
      let surgeries = this.state.surgeries;
      let a = surgeries[i];
      let b = surgeries[i - 1];
      surgeries[i - 1] = a;
      surgeries[i] = b;
      this.setState({ surgeries: surgeries });
    } else {
      window.alert('불가능');
    }
  };
  onClicksurgerydown = (i) => () => {
    if (i + 1 < this.state.surgeries.length) {
      let surgeries = this.state.surgeries;
      let a = surgeries[i];
      let b = surgeries[i + 1];
      surgeries[i + 1] = a;
      surgeries[i] = b;
      this.setState({ surgeries: surgeries });
    } else {
      window.alert('불가능');
    }
  };

  onClickhashup = (i) => () => {
    if (i > 0) {
      let hashtags = this.state.hashtags;
      let a = hashtags[i];
      let b = hashtags[i - 1];
      hashtags[i - 1] = a;
      hashtags[i] = b;
      this.setState({ hashtags: hashtags });
    } else {
      window.alert('불가능');
    }
  };
  onClickhashdown = (i) => () => {
    if (i + 1 < this.state.hashtags.length) {
      let hashtags = this.state.hashtags;
      let a = hashtags[i];
      let b = hashtags[i + 1];
      hashtags[i + 1] = a;
      hashtags[i] = b;
      this.setState({ hashtags: hashtags });
    } else {
      window.alert('불가능');
    }
  };

  render() {
    console.log(this.state);
    return (
      <section className='create_designer'>
        <div className='designer_create_tab'>
          <div onClick={this.tabSelect(0)}>기본정보</div>
          <div onClick={this.tabSelect(1)}>스타일</div>
        </div>
        <div className='designer_editer'>
          {this.state.tab === 0 ? (
            <section className='goods designer_info'>
              <div>
                <span>이름</span>
                <input type='text' onChange={this.handleInputValue('name')} placeholder='이름' id='dname' />
              </div>
              <div>
                <span>전화번호</span>
                <input type='text' onChange={this.handleInputValue('phone')} placeholder='전화번호' id='dphone' />
              </div>
              <div>
                <span>지점</span>
                <input type='text' onChange={this.handleInputValue('store')} placeholder='지점' id='dstore' />
              </div>
              <div>
                <span>공개여부 </span>
                <select name='user_state' id='duser_state' onChange={this.handleInputValue('user_state')}>
                  <option value={this.state.user_state ? this.state.user_state : ''}>
                    {this.state.user_state === '0' ? '비공개' : this.state.user_state === '1' ? '공개' : ''}
                  </option>
                  <option value={0}>비공개</option>
                  <option value={1}>공개</option>
                </select>
              </div>
              <div>
                <span>소개</span>
                <input type='text' onChange={this.handleInputValue('introduction')} placeholder='소개' id='dintroduction' />
              </div>
              <div>
                <span>예약 페이지</span>
                <input type='text' onChange={this.handleInputValue('reserve_url')} placeholder='네이버 페이지 url' id='dreserve' />
              </div>
              <div>
                <span>직급</span>
                <input type='text' onChange={this.handleInputValue('rank')} placeholder='ex) 원장 / 디자이너' id='drank' />
              </div>
              <div>
                <span>주소</span>
                <input type='text' onChange={this.handleInputValue('address')} placeholder='입력을 안하셔도 괜찮습니다' id='daddress' />
              </div>
              <div>
                <span>시간</span>
                <input type='text' onChange={this.handleInputValue('operating_time')} placeholder='영업 시간' id='dtime' />
              </div>
              <div>
                <span>휴무일</span>
                <input type='text' onChange={this.handleInputValue('home')} placeholder='ex) 명절 당일 휴무 / 일요일 휴무' id='dhome' />
              </div>
              <div>
                <span>인스타그램</span>
                <input type='text' onChange={this.handleInputValue('sns')} placeholder='영업 시간' id='dsns' />
              </div>
              <div>
                <div>
                  <span>해쉬태그</span>
                </div>
                <div
                  className='designer_create_hashtag_list'
                  // style={{ display: 'inline-block' }}
                >
                  {this.state.hashtags
                    ? this.state.hashtags.map((e, i) =>
                        e.destroy ? null : (
                          <div key={e.id} className='designer_create_hashtag' onClick={this.onClickDelhash(e, i)}>
                            {`#${e.content}`}
                          </div>
                        )
                      )
                    : null}
                </div>
              </div>
              <div>
                <div>
                  <input type='text' onChange={this.handleInputValue('hash')} placeholder='ex) 컷트' className='hash' />
                </div>
                <div style={{ marginBottom: '45px' }}>
                  <span onClick={this.onClickhash}>추가</span>
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>프로필 사진</div>
              <div style={{ marginBottom: '20px' }}>
                {this.state.img ? <img style={{ width: '200px' }} src={this.state.img} alt='test'></img> : null}
              </div>
              <div>
                <div style={{ marginBottom: '40px' }}>
                  <label htmlFor='designer_img'>등록</label>
                  <input type='file' accept='image/*' size='40' id='designer_img' onChange={this.handleInputValue('img')} />
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>메인 배너이미지</div>
              <div>
                {this.state.images
                  ? this.state.images.map((e, i) => (
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
                          onClick={this.onClickDelmain(i)}
                        >
                          x
                        </div>
                        <img style={{ width: '200px' }} src={e.main} alt='test'></img>
                        <div>링크: {e.url}</div>
                        <div>
                          <pre>{e.content}</pre>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              <div>
                <div style={{ marginTop: '40px' }}>
                  <label htmlFor='mainimg'>이미지</label>
                  <input type='file' accept='image/*' size='40' id='mainimg' onChange={this.handleInputValue('mainimg')} />
                </div>
              </div>
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <input type='text' onChange={this.handleInputValue('mainimglink')} placeholder='링크' id='mainimglink' />
                </div>
              </div>
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <textarea
                    style={{ height: '50px', marginTop: '5px', width: '200px' }}
                    onChange={this.handleInputValue('mainimgtext')}
                    placeholder='컨텐츠 내용'
                    id='mainimgtext'
                  />
                </div>
              </div>

              <div style={{ marginBottom: '45px' }}>
                <span onClick={this.onClickmainimg}>추가</span>
              </div>

              <div style={{ marginBottom: '20px' }}>시술 목록</div>
              <div style={{ marginBottom: '20px' }}>
                {this.state.surgeries.length ? (
                  <table className='Designer_surgery'>
                    <thead>
                      <tr>
                        <th></th>
                        <th>이름</th>
                        <th>가격</th>
                        <th>링크</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.surgeries.map((e, i) => (
                        <tr key={e.id}>
                          <td onClick={this.onClicksurgeryup(i)}>↑</td>
                          <td>{e.content}</td>
                          <td>{e.price}</td>
                          <td>{e.url}</td>
                          <td onClick={this.onClickDelsurgeries(i)}>삭제</td>
                          <td onClick={this.onClicksurgerydown(i)}>↓</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
              </div>
              <div>
                <div>
                  <input type='text' onChange={this.handleInputValue('surcontent')} placeholder='이름' id='surcontent' />
                </div>
                <div>
                  <input type='number' onChange={this.handleInputValue('surprice')} placeholder='가격' id='surprice' />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <input type='text' onChange={this.handleInputValue('sururl')} placeholder='링크' id='sururl' />
                </div>
                <div>
                  <span onClick={this.onClicksurgery}>추가</span>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <span>쿠폰 </span>
                <select name='coupon' id='dcoupon' onChange={this.handleInputValue('coupon')}>
                  <option value={0}>없음</option>
                  <option value={1}>있음</option>
                </select>
              </div>
              {this.state.coupon === '1' ? (
                <div style={{ marginBottom: '40px' }}>
                  <div>
                    <input type='text' onChange={this.handleInputValue('coupontext')} placeholder='쿠폰 목적' id='coupontext' />
                  </div>
                  <div>
                    <input type='number' onChange={this.handleInputValue('couponprice')} placeholder='쿠폰 가격' id='couponprice' />
                  </div>
                  <div>
                    <input type='text' onChange={this.handleInputValue('couponexpired')} placeholder='만료날짜(2022-11-11)' id='couponexpired' />
                  </div>
                  <div>
                    <input type='text' onChange={this.handleInputValue('couponlimit')} placeholder='쿠폰 제한' id='couponlimit' />
                  </div>
                </div>
              ) : null}
            </section>
          ) : this.state.tab === 1 ? (
            <div className='portfolio'>
              {this.state.addPortfolio.img ? (
                <img src={this.state.addPortfolio.img} style={{ width: '200px' }} alt={'추가 포트폴리오 이미지'} />
              ) : null}
              {this.state.addPortfolioState ? (
                <div>
                  <label htmlFor='designer_img'></label>
                  <input type='file' accept='image/*' size='40' onChange={this.inputPortfolioImg()} />
                  {this.state.addPortfolio.Hashtags.length ? (
                    <div className='new_portfolio_hashtags'>
                      {this.state.addPortfolio.Hashtags.map((hashtag) => {
                        return hashtag.destroy ? null : (
                          <div key={hashtag.id} className='portfolio_tag' onClick={this.deleteHashtag(this.state.addPortfolio, hashtag)}>
                            #{hashtag.content}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                  {this.state.addPortfolio.Boards.length ? (
                    <div className='portfolio_boards'>
                      {this.state.addPortfolio.Boards.map((board, i) => {
                        return board.destroy ? null : (
                          <div key={i} className='portfolio_board' onClick={this.deleteBoard(this.state.addPortfolio, board)}>
                            {board.id}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                  <div className='add_hashtag'>
                    <input type='text' onChange={this.handleInputValue('hash')} placeholder='ex) 컷트' className='hash' />
                    <button onClick={this.addPortfolioHashtag()}>해시태그 추가</button>
                  </div>
                  <div className='add_portfolio_board'>
                    <input type='text' onChange={this.handleInputValue('board')} placeholder='보드번호' className='portfolio_board' />
                    <button onClick={this.addPortfolioBoard()}>보드 추가</button>
                  </div>
                  <button className='portfolio_button' onClick={this.addPortfolio()}>
                    추가
                  </button>
                </div>
              ) : (
                <button className='portfolio_button' onClick={this.addPortfolio()}>
                  추가
                </button>
              )}

              <div className='style_tag_tab'>
                <div className='style_tag' onClick={this.styleTagTabSelect(-1)}>
                  전체
                </div>
                {this.state.hashtags.map((hashtag) => {
                  return hashtag.Manager_Hashtag.open ? (
                    <div key={hashtag.id} className='style_tag' onClick={this.styleTagTabSelect(hashtag.id)}>
                      #{hashtag.content}
                    </div>
                  ) : null;
                })}
              </div>
              <div className='portfolio_list'>
                {this.state.portfolios.map((portfolio) => {
                  if (!portfolio.destroy) {
                    const matchTag = portfolio.Hashtags.filter((tag) => this.state.styleTagTab === tag.id).length;
                    return this.state.styleTagTab === -1 || matchTag > 0 ? (
                      <div key={portfolio.id} className='portfolio_detail'>
                        <img src={portfolio.img} alt={portfolio.id} className='portfolio_img' />
                        <div className='portfolio_tags'>
                          {portfolio.Hashtags.map((hashtag) => {
                            if (!hashtag.destroy) {
                              return (
                                <div
                                  key={hashtag.id}
                                  className='portfolio_tag'
                                  onClick={portfolio.edit ? this.deleteHashtag(portfolio, hashtag) : null}
                                >
                                  #{hashtag.content}
                                </div>
                              );
                            } else return null;
                          })}
                        </div>
                        {portfolio.Boards ? (
                          <div className='portfolio_boards'>
                            {portfolio.Boards.map((board, i) => {
                              return board.destroy ? null : (
                                <div key={i} className='portfolio_board' onClick={portfolio.edit ? this.deleteBoard(portfolio, board) : null}>
                                  {board.id}
                                </div>
                              );
                            })}
                          </div>
                        ) : null}
                        {portfolio.edit ? (
                          <div>
                            <label htmlFor='designer_img'>등록</label>
                            <input type='file' accept='image/*' size='40' onChange={this.inputPortfolioImg(portfolio)} />
                            <div className='add_hashtag'>
                              <input type='text' onChange={this.handleInputValue('hash')} placeholder='ex) 컷트' className='hash' />
                              <button onClick={this.editPortfolioHashtag(portfolio)}>해시태그 추가</button>
                            </div>

                            <div className='add_portfolio_board'>
                              <input type='text' onChange={this.handleInputValue('board')} placeholder='보드번호' className='portfolio_board' />
                              <button onClick={this.editPortfolioBoard(portfolio)}>보드 추가</button>
                            </div>
                          </div>
                        ) : null}
                        <button className='portfolio_button' onClick={this.editPortfolio(portfolio)}>
                          {portfolio.edit ? '완료' : '수정'}
                        </button>
                        <button className='portfolio_button' onClick={this.deletePortfolio(portfolio)}>
                          삭제
                        </button>
                      </div>
                    ) : null;
                  } else return null;
                })}
              </div>
            </div>
          ) : null}
        </div>

        {this.props.location.state ? (
          <button className='create_designer' onClick={this.handleEditDesigner}>
            수정
          </button>
        ) : (
          <button className='create_designer' onClick={this.handleImgValue}>
            submit
          </button>
        )}
      </section>
    );
  }
}

export default create;
