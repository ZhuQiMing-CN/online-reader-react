/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/14 15:35
 */
import React, { Component } from 'react';
import { Row, Col, Button, Result } from 'antd';
import { connect } from 'react-redux';
import { updateBookShelf } from '../../store/action';

class Bookshelf extends Component {
    constructor (props) {
        super(props);
        this.state = {
            bookShelfs: []
        };
    }

    componentDidMount () {
        if (typeof this.props.bookShelf == "string") {
            this.setState({
                bookShelfs: JSON.parse(this.props.bookShelf)
            })
        }
    }

    // 查看书本详情
    getBookinfo = (val) => {
        this.props.history.push('/bookinfo/' + val.id);
    }

    // 移除书架
    delBooks  = (val) => {
        let bookShelfs = this.state.bookShelfs;
        let delbook = bookShelfs.findIndex(item => item.id === val.id);
        bookShelfs.splice(delbook, 1);
        this.setState({
            bookShelfs: bookShelfs
        });
        this.props.updateBookShelf({bookShelf: JSON.stringify(bookShelfs)});
    }

    render () {
        return (
            <div className="book-shelf">
                <Row>
                    <p className="shelf-info">
                        我的书架共有
                        <span>{this.state.bookShelfs.length}</span>本在看的书籍：
                    </p>
                    {
                        this.state.bookShelfs.length > 0 ?
                            this.state.bookShelfs.map((value, index) => (
                                <Col span={12} key={value.id} className="book-list">
                                    <img
                                        onClick={() => this.getBookinfo(value)}
                                        src={`http://statics.zhuishushenqi.com${value.cover}`}
                                        alt={value.title }/>
                                    <div className="book-info">
                                        <p onClick={() => this.getBookinfo(value)}>
                                            {value.title}
                                        </p>
                                        <p>作者：{value.author}</p>
                                        <p>小说来源：{value.readsource}</p>
                                        <p>上次阅读：{value.readtitle}</p>
                                        <p>最新章节：{value.lastChapter}</p>
                                    </div>
                                    <div>
                                        <Button
                                            danger
                                            type="primary"
                                            onClick={() => this.delBooks(value)}>
                                            移出书架
                                        </Button>
                                    </div>
                                </Col>
                            )) : <Result
                                status="404"
                                title="书架空空如也~"
                                subTitle="Sorry, this page may have no data temporarily.">
                            </Result>
                    }
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return state
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateBookShelf: (data) => {
            dispatch(updateBookShelf(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookshelf);
