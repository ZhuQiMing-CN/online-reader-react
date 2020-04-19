/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/13 17:27
 */
import React, { Component, Fragment } from 'react';
import { Radio, Row, Col, Pagination, Result } from 'antd';

import { Categorylist, Categorylistbook } from '../../../axios/api';

class Cmale extends Component {
    constructor (props) {
        super(props);
        this.state = {
            majorList: [],
            defaultMajor: '',
            minsList: [],
            defaultMins: '',
            typeList: [
                {
                    label: 'hot',
                    value: '热门'
                },
                {
                    label: 'new',
                    value: '新书'
                },
                {
                    label: 'reputation',
                    value: '好评'
                },
                {
                    label: 'over',
                    value: '完结'
                }
            ],
            defaultType: 'hot',
            bookgender: 'male',
            booksData: [],
            start: 0,
            limit: 10,
            totalData: 0,
            maleCurrentPage: 1
        };
    }

    componentDidMount () {
        // 获取分类下小类别
        Categorylist().then(res => {
            if (res.ok === true) {
                this.setState({
                    majorList: res.male,
                    defaultMajor: res.male[0],
                    minsList: res.male[0].mins,
                    defaultMins: res.male[0].mins[0]
                }, () => {
                    this.getCategorylistbook();
                })
            }
        });
    }

    // 获取小类别下的分类
    changeMajor = (e) => {
        this.setState({
            defaultMajor: e.target.value,
            minsList: e.target.value.mins,
            defaultMins: e.target.value.mins[0]
        }, () => {
            this.getCategorylistbook();
        });
    }

    // 根据小分类获取小说列表
    changeMins = (e) => {
        this.setState({
            defaultMins: e.target.value
        }, () => {
            this.getCategorylistbook();
        });
    }

    // 根据更多筛选获取小说列表
    changeType = (e) => {
        this.setState({
            defaultType: e.target.value
        }, () => {
            this.getCategorylistbook();
        });
    }

    getCategorylistbook () {
        let parmas = {
            gender: this.state.bookgender,
            type: this.state.defaultType,
            major: this.state.defaultMajor.major,
            minor: this.state.defaultMins,
            start: this.state.start,
            limit: this.state.limit
        };
        Categorylistbook(parmas).then(res => {
            if (res.ok === true) {
                this.setState({
                    booksData: res.books,
                    totalData: res.total
                });
            }
        });
    }

    getBookinfo = (e) => {
        this.props.history.push('/bookinfo/' + e._id);
    }

    // 分页跳转页数
    malePageChange = (page, pageSize) => {
        this.setState({
            start: page - 1,
            maleCurrentPage: page
        }, () => {
            this.getCategorylistbook();
        });
    }

    // 分页每页显示
    malePageSizeChange = (current, size) => {
        this.setState({
            limit: size
        }, () => {
            this.getCategorylistbook();
        });
    }

    render () {
        return (
            <Fragment>
                <div className="search-content">
                    <h3>男生</h3>
                    <p><i></i>作品类型</p>
                    <Radio.Group value={this.state.defaultMajor} buttonStyle="solid">
                        {
                            this.state.majorList.map((value, index) => (
                                <Radio.Button
                                    className="m5"
                                    value={value}
                                    key={index}
                                    onChange={this.changeMajor}
                                >
                                    {value.major}
                                </Radio.Button>
                            ))
                        }
                    </Radio.Group>
                    {this.state.minsList.length > 0 ? <p><i></i>具体类型</p> : ''}
                    <Radio.Group value={this.state.defaultMins} buttonStyle="solid">
                        {
                            this.state.minsList.map((value, index) => (
                                <Radio.Button
                                    className="m5"
                                    value={value}
                                    key={index}
                                    onChange={this.changeMins}
                                >
                                    {value}
                                </Radio.Button>
                            ))
                        }
                    </Radio.Group>
                    <p><i></i>更多筛选</p>
                    <Radio.Group defaultValue={this.state.defaultType} buttonStyle="solid">
                        {
                            this.state.typeList.map((value, index) => (
                                <Radio.Button
                                    className="m5"
                                    value={value.label}
                                    key={index}
                                    onChange={this.changeType}
                                >
                                    {value.value}
                                </Radio.Button>
                            ))
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
                                        <span>{value.retentionRatio}</span> 读者存留
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
                {this.state.totalData > 0 ? <hr/> : ''}
                {
                    this.state.totalData > 0 ?
                        <Pagination
                            current={this.state.maleCurrentPage}
                            pageSizeOptions={['10', '20', '30', '40', '50']}
                            showQuickJumper
                            showSizeChanger
                            showTotal={total => `共 ${total} 条`}
                            total={this.state.totalData}
                            onChange={this.malePageChange}
                            onShowSizeChange={this.malePageSizeChange}>
                        </Pagination> : ''}

            </Fragment>
        );
    }
}

export default Cmale;
