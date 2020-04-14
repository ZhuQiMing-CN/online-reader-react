import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import HeaderView from './components/HeaderView';
import MainView from './components/MainView';

import './App.css';

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
                    <Footer>Footer</Footer>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
