import axios from 'axios';
import { Component } from 'react';
import './create.css';

class create extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      });
      setTimeout(() => {
        document.getElementById('coupontext').value = coupon.coupontext;
        document.getElementById('couponprice').value = coupon.couponprice;
        document.getElementById('couponexpired').value = coupon.couponexpired;
        document.getElementById('couponlimit').value = coupon.couponlimit;
      }, 5);
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
    };
    hashtags.push(obj);
    this.setState({ hashtags: hashtags });
    document.getElementById('hash').value = '';
  };

  onClickDelhash = (i) => () => {
    let hashtags = this.state.hashtags;
    hashtags.splice(i, 1);
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
      <section className='goods'>
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
          <div style={{ display: 'inline-block' }}>
            {this.state.hashtags
              ? this.state.hashtags.map((e, i) => (
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      float: 'left',
                      border: '1px solid #F5F5F5',
                      cursor: 'pointer',
                      padding: '5px',
                      height: '20px',
                      marginRight: '10px',
                      marginBottom: '10px',
                    }}
                  >
                    <span
                      onClick={this.onClickhashup(i)}
                      style={{ margin: '0', padding: '0 5px', height: '20px', lineHeight: '20px', textAlign: 'center' }}
                    >
                      {'<'}
                    </span>{' '}
                    <span onClick={this.onClickDelhash(i)} style={{ margin: '0', height: '20px', lineHeight: '20px', textAlign: 'center' }}>
                      {e.content}
                    </span>
                    <span
                      onClick={this.onClickhashdown(i)}
                      style={{ margin: '0', height: '20px', padding: '0 5px', lineHeight: '20px', textAlign: 'center' }}
                    >
                      {'>'}
                    </span>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div>
          <div>
            <input type='text' onChange={this.handleInputValue('hash')} placeholder='ex) 컷트' id='hash' />
          </div>
          <div style={{ marginBottom: '45px' }}>
            <span onClick={this.onClickhash}>추가</span>
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>프로필 사진</div>
        <div style={{ marginBottom: '20px' }}>{this.state.img ? <img style={{ width: '200px' }} src={this.state.img} alt='test'></img> : null}</div>
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
        {this.props.location.state ? <button onClick={this.handleEditDesigner}>수정</button> : <button onClick={this.handleImgValue}>submit</button>}
      </section>
    );
  }
}

export default create;
