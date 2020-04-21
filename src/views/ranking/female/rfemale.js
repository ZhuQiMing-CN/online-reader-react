/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/14 09:33
 */
import React, { Component, Fragment } from 'react';
import { Radio, Row, Col, Result } from 'antd';
import { rankCategory, rankListBook } from '../../../axios/api';

class Rfemale extends Component {
    constructor (props) {
        super(props);
        this.state = {
            rankList: [],
            defaultRank: '',
            defaultType: '',
            rankId: '',
            booksData: []
        };
    }

    // 获取排行榜类型
    componentDidMount () {
        rankCategory().then(res => {
            if (res.ok === true) {
                let defaultType;
                if (res.male[0]._id) {
                    defaultType = res.male[0]._id
                } else if (res.male[0].monthRank) {
                    defaultType = res.male[0].monthRank
                } else {
                    defaultType = res.male[0].totalRank
                }
                this.setState({
                    rankList: res.male,
                    defaultRank: res.male[0],
                    rankId: res.male[0]._id,
                    defaultType: defaultType
                }, () => {
                    this.getRankFemaleBook();
                });
            }
        });
    }

    // 根据排行榜获取小说列表
    changeRank = (e) => {
        let defaultType;
        if (e.target.value._id) {
            defaultType = e.target.value._id
        } else if (e.target.value.monthRank) {
            defaultType = e.target.value.monthRank
        } else {
            defaultType = e.target.value.totalRank
        }
        this.setState({
            defaultRank: e.target.value,
            rankId: e.target.value._id,
            defaultType: defaultType
        }, () => {
            this.getRankFemaleBook();
        });
    }

    // 根据更多筛选获取小说列表
    changeType = (value) => {
        this.setState({
            rankId: value,
            defaultType: value
        }, () => {
            this.getRankFemaleBook();
        });
    }

    // 获取排行榜小说
    getRankFemaleBook () {
        let parmas = this.state.rankId;
        rankListBook(parmas).then(res => {
            if (res.ok === true) {
                this.setState({
                    booksData: res.ranking.books
                });
            }
        });
    }

    // 查看书本详情
    getBookinfo = (e) => {
        this.props.history.push('/bookinfo/' + e._id);
    }

    render () {
        return (
            <Fragment>
                <div className="search-content">
                    <h3>女生</h3>
                    <p><i></i>作品类型</p>
                    <Radio.Group value={this.state.defaultRank} buttonStyle="solid">
                        {
                            this.state.rankList.map((value, index) => (
                                <Radio.Button
                                    className="m5"
                                    value={value}
                                    key={index}
                                    onChange={this.changeRank}
                                >
                                    {value.title}
                                </Radio.Button>
                            ))
                        }
                    </Radio.Group>
                    <p><i></i>更多筛选</p>
                    <Radio.Group value={this.state.defaultType} buttonStyle="solid">
                        {
                            this.state.defaultRank._id ?
                                <Radio.Button
                                    className="m5"
                                    value={this.state.defaultRank._id}
                                    onChange={() => this.changeType(this.state.defaultRank._id)}>
                                    周排行榜
                                </Radio.Button> : ''
                        }
                        {
                            this.state.defaultRank.monthRank ?
                                <Radio.Button
                                    className="m5"
                                    value={this.state.defaultRank.monthRank}
                                    onChange={() => this.changeType(this.state.defaultRank.monthRank)}>
                                    月排行榜
                                </Radio.Button> : ''
                        }
                        {
                            this.state.defaultRank.totalRank ?
                                <Radio.Button
                                    className="m5"
                                    value={this.state.defaultRank.totalRank}
                                    onChange={() => this.changeType(this.state.defaultRank.totalRank)}>
                                    总排行榜
                                </Radio.Button> : ''
                        }
                    </Radio.Group>
                </div>
                <hr/>
                <Row>
                    {
                        this.state.booksData.length > 0 ?
                            this.state.booksData.map((value, index) => (
                                <Col span={12} key={value._id} className="booklist-content">
                                    <img className="img cursor"
                                         onClick={() => this.getBookinfo(value)}
                                         src={'http://statics.zhuishushenqi.com' + value.cover} alt=""/>
                                    <div className="right">
                                        <p className="name cursor"
                                           onClick={() => this.getBookinfo(value)}>
                                            {value.title}
                                        </p>
                                        <p className="author">
                                            {value.author + " | " + value.majorCate}
                                        </p>
                                        <p className="desc">{ value.shortIntro }</p>
                                        <p className="popularity">
                                            <span>{value.latelyFollower}</span> 人气 |
                                            <span> {value.retentionRatio}</span> 读者存留
                                        </p>
                                    </div>
                                </Col>
                            )) : <Result
                                status="404"
                                title="暂无数据"
                                subTitle="Sorry, this page may have no data temporarily.">
                            </Result>
                    }
                </Row>
            </Fragment>
        );
    }
}

export default Rfemale;
