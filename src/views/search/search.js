/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/22 17:41
 */
import React, { Component } from 'react';
import { Row, Col, Result } from 'antd';
import { searchFuzzy } from '../../axios/api';

class Search extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchQuery: '',
            searchData: []
        };
    }

    componentDidMount () {
        let query = this.props.location.search.split('&')[0].substr(5);
        // 获取搜索结果列表
        let parmas = {
            query: query
        };
        this.setState({
            searchQuery: decodeURIComponent(query)
        });
        searchFuzzy(parmas).then(res => {
            if (res.ok === true) {
                this.setState({
                    searchData: res.books
                });
            }
        });
    }

    // 查看书本详情
    getBookinfo = (val) => {
        this.props.history.push('/bookinfo/' + val._id);
    }

    render () {
        return (
            <div className="book-search">
                <Row>
                    <p className="search-info">
                        与 <span>{this.state.searchQuery}</span> 相关的搜索结果：
                    </p>
                    {
                        this.state.searchData.length > 0 ?
                        this.state.searchData.map((value, index) => (
                            <Col span={8} key={value._id} className="booklist-content">
                                <img className="img cursor"
                                     onClick={() => this.getBookinfo(value)}
                                     src={'http://statics.zhuishushenqi.com' + value.cover} alt=""/>
                                <div className="right">
                                    <p className="name cursor"
                                       onClick={() => this.getBookinfo(value)}>
                                        {value.title}
                                    </p>
                                    <p className="author">
                                        {value.author + " | " + value.cat}
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
            </div>
        );
    }
}

export default Search;
