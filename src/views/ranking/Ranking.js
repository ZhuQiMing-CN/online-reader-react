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
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        onClick={this.handleClick} selectedKeys={[this.state.current]}
                        style={{ height: '100%', borderRight: 0 }}>
                        <Menu.Item key="/ranking/male">
                            <Link to="/ranking/male">ranking/male</Link>
                        </Menu.Item>
                        <Menu.Item key="/ranking/fmale">
                            <Link to="/ranking/fmale">ranking/fmale</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        className="site-layout-background"
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
