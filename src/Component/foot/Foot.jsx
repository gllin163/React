import React, { Component } from 'react';
import {  Link } from 'react-router';
import { connect } from 'react-redux';
import action, { initCartNum } from '../../Action/Index';
import { Tool,  } from '../../Container/Tool';
import './Foot.less';

/**
 * 底部导航菜单
 *
 * @export
 * @class Footer
 * @extends {Component}
 */
class FooterInit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageCount: 0,


        };

    }
    getMessageCount () {
        var accesstoken = this.props.User ? this.props.User.accesstoken : '';
        if (accesstoken) {
            Tool.get('/api/v1/message/count', { accesstoken }, (res) => {
//              this.props.dip

                this.setState({
                    messageCount: res.data
                });
            });
        }
    }
  componentDidMount() {
        this.getMessageCount();
            Tool.get('/wechat/getCartCount/', {},  (res)=> {

                this.props.dispatch(initCartNum(res.goodsCount));


            })

    }
    render() {
        
        let visable=this.props.cartNum>0?"block":"none";
       /* this.props.cartNum=this.props.cartNum>99?this.props.cartNum:"99+";*/
        let cartNums=this.props.cartNum<99?this.props.cartNum:"99+";

        var myUrl = this.props.User && this.props.User.loginname ? '/user/' + this.props.User.loginname : '/signin';
        var arr = [];
        arr[this.props.index] = 'on';      
        return (
            <footer className="common-footer">
                <div className="zhanwei"></div>
                  
                <ul className="menu" data-flex="box:mean">
                    <li className={arr[0]}>
                        <Link to="/">
                            <i className="iconfont icon-home"></i>工作
                        </Link>
                    </li>
                    <li className={arr[1]}>
                        <Link to="/news/indexList">
                            <i className="iconfont icon-category"></i>消息
                            <span className="gocart-num" style={{display:visable}}>{cartNums}</span>
                        </Link>
                    </li>
                    <li className={arr[2]} >
                        <Link to={"/customer/indexList"} className="gocart">
                            <i className="iconfont icon-cart"></i>顾客
                        </Link>
                    </li>
                    <li className={arr[3]}>
                        <Link to="/my/indexList">
                            <i className="iconfont icon-user"></i>我的
                        </Link>
                    </li>
                </ul>
            </footer>
        );
    }
   
    /*shouldComponentUpdate(np, ns) {
        return this.props.index !== np.index || this.state.messageCount !== ns.messageCount; //防止组件不必要的更新
    }*/
    componentDidUpdate() {
        this.getMessageCount();
    }
}
FooterInit.defaultProps = {
    index: 0
};


var Footer = connect((state) => { 
    return { 
        User: state.User ,
        cartNum: state.cart.num,
    }; 
})(FooterInit);
    

export { Footer }


