/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/13 14:57
 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu, AutoComplete, Input } from 'antd';
import { searchhotWords, searchAuto } from '../axios/api';

class HeaderView extends Component {
    constructor (props) {
        super(props);
        this.state = {
            current: '',
            hotwords: []
        };
    }

    componentDidMount() {
        this.setState({
            current: this.props.location.pathname.split('/')[1]
        });
        // 获取搜索热词
        this.getHotWords();
    }

    // 菜单跳转
    handleMenuClick = e => {
        this.setState({
            current: e.key
        });
    };

    // 获取搜索热词
    getHotWords () {
        searchhotWords().then(res => {
            if (res.ok === true) {
                this.setState({
                    hotwords: res.searchHotWords.map(item => {
                        return { value: item.word }
                    })
                });
            }
        })
    }

    // 搜索自动补充
    queryChange = (value) => {
        if (value) {
            searchAuto({ query: value }).then(res => {
                if (res.ok === true) {
                    if (res.keywords.length > 0) {
                        this.setState({
                            hotwords: res.keywords.map(item => {
                                return { value: item }
                            })
                        });
                    }
                }
            });
        } else {
            this.getHotWords();
        }
    }

    // 模糊搜索选择
    querySelect = (value) => {
        this.props.history.push('/search?val=' + value);
    }

    render () {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Menu onClick={this.handleMenuClick} selectedKeys={[this.state.current]} mode="horizontal" theme="dark" style={{flex: 'auto'}}>
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
                <AutoComplete
                    style={{width: 300}}
                    options={this.state.hotwords}
                    onChange={this.queryChange}
                    onSelect={this.querySelect}>
                    <Input.Search placeholder="请输入书本名或者作者名" enterButton />
                </AutoComplete>
            </div>
        );
    }
}

export default withRouter(HeaderView);
