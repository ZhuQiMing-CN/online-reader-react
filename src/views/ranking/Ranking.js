/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/13 16:34
 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Content, Sider } = Layout;

class Ranking extends Component {
    constructor (props) {
        super(props);
        this.state = {
            current: ''
        };
    }

    componentDidMount() {
        console.log('ranking', this.props.location);
        this.setState({
            current: this.props.location.pathname
        });
    }

    handleClick = e => {
        this.setState({
            current: e.key
        });
    };

    render () {
        return (
            <Layout>
                <Sider width={200}>
                    <Menu
                        mode="inline"
                        onClick={this.handleClick} selectedKeys={[this.state.current]}
                        style={{ height: '100%' }}>
                        <Menu.Item key="/ranking/male">
                            <Link to="/ranking/male">男生</Link>
                        </Menu.Item>
                        <Menu.Item key="/ranking/fmale">
                            <Link to="/ranking/fmale">女生</Link>
                        </Menu.Item>
                        <Menu.Item key="/ranking/press">
                            <Link to="/ranking/press">出版物</Link>
                        </Menu.Item>
                        <Menu.Item key="/ranking/picture">
                            <Link to="/ranking/picture">图片漫画</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(Ranking);
