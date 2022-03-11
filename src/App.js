import { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./Mainpage";
import Banner from "./banner/banner";
import BannerCreate from "./banner/create";
import Designers from "./designers/designers";
import DesignersCreate from "./designers/create";
import User from "./user/user";
import Coupon from "./user/coupon";
import Goods from "./goods/goods";
import Goodsdetail from "./goods/Board/Board";
import GoodsCreate from "./goods/create";
import Header2 from "./header2";
import Coupons from "./coupon/coupon";
import Reviews from "./review/review";
import couponcreate from "./user/couponcreate";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <Header2 />
        <Route exact path="/" component={Home} />
        <Switch>
          {window.localStorage.getItem("login") === "admin" ?
            <>
              <Route path="/banners" component={Banner} />
              <Route path="/banner/edit/:id" component={BannerCreate} />
              <Route path="/banner/create/:id" component={BannerCreate} />
              <Route path="/designers" component={Designers} />
              <Route path="/designer/create" component={DesignersCreate} />
              <Route path="/designer/edit/:id" component={DesignersCreate} />
              <Route path="/users" component={User} />
              <Route path="/user/coupon/:id" component={Coupon} />
              <Route path="/goods" component={Goods} />
              <Route path="/good/:id" component={Goodsdetail} />
              <Route path="/board/create" component={GoodsCreate} />
              <Route path="/board/edit/:id" component={GoodsCreate} />
              <Route path="/coupons" component={Coupons} />
              <Route path="/reviews" component={Reviews} />
              <Route path="/coupon/create/:id" component={couponcreate} />
            </> :
            window.localStorage.getItem("login") === "store" ?
              <>
                <Route path="/users" component={User} />
                <Route path="/user/coupon/:id" component={Coupon} />
              </> : null
          }
        </Switch>
      </>
    )
  }
}

export default withRouter(App);





