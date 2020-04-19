/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/13 14:57
 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu } from 'antd';

class HeaderView extends Component {
    constructor (props) {
        super(props);
        this.state = {
            current: ''
        };
    }

    componentDidMount() {
        // console.log('header', this.props.location);
        // console.log(this.props.location.pathname.split('/')[1]);
        this.setState({
            current: this.props.location.pathname.split('/')[1]
        });
    }

    handleClick = e => {
        this.setState({
            current: e.key
        });
    };

    render () {
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme="dark">
                <Menu.Item key="home">
                    <Link to="/home">首页</Link>
                </Menu.Item>
                <Menu.Item key="category">
                    <Link to="/category/male">热门分类</Link>
                </Menu.Item>
                <Menu.Item key="ranking">
                    <Link to="/ranking/male">排行榜</Link>
                </Menu.Item>
                <Menu.Item key="bookshelf">
                    <Link to="/bookshelf">我的书架</Link>
                </Menu.Item>
            </Menu>
        );
    }
}

export default withRouter(HeaderView);
