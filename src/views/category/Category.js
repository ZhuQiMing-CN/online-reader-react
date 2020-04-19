/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/13 15:47
 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Content, Sider } = Layout;

class Category extends Component {
    constructor (props) {
        super(props);
        this.state = {
            current: ''
        };
    }

    componentDidMount() {
        console.log('category', this.props.location);
        this.setState({
            current: this.props.location.pathname
        });
    }

    handleClick = (e) => {
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
                        <Menu.Item key="/category/male">
                            <Link to="/category/male">男生</Link>
                        </Menu.Item>
                        <Menu.Item key="/category/fmale">
                            <Link to="/category/fmale">女生</Link>
                        </Menu.Item>
                        <Menu.Item key="/category/press">
                            <Link to="/category/press">出版物</Link>
                        </Menu.Item>
                        <Menu.Item key="/category/picture">
                            <Link to="/category/picture">图片漫画</Link>
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

export default withRouter(Category);
