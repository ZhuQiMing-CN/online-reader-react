import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import HeaderView from './components/HeaderView';
import MainView from './components/MainView';

import './App.less';

const { Header, Footer, Content } = Layout;

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <BrowserRouter>
                <Layout className="layout">
                    <Header>
                        <div className="logo">This is Logo</div>
                        <HeaderView></HeaderView>
                    </Header>
                    <Content>
                        <MainView></MainView>
                    </Content>
                    <Footer>本站提供的内容均来源于网络,纯属共享学习之用,若有侵权,请与管理员邮箱联系！</Footer>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
