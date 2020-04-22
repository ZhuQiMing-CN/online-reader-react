/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/21 21:57
 */
import React, { Component } from 'react';
import { Breadcrumb, Button, message, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { bookCatalog, bookChapter } from '../../axios/api';
import { connect } from 'react-redux';
import { updateBookShelf } from '../../store/action';
import { LeftOutlined, RightOutlined, UnorderedListOutlined } from '@ant-design/icons';

class Bookchapter extends Component {
    constructor (props) {
        super(props);
        this.state = {
            bookTitle: '',
            bookData: '',
            mybookData: [],
            chaptersData: '',
            chapterIndex: 0,
            imagesData: []
        };
    }

    // 获取小说目录列表
    componentDidMount () {
        let bookShelfs;
        if (typeof this.props.bookShelf == "string") {
            bookShelfs = JSON.parse(this.props.bookShelf);
        } else {
            bookShelfs = this.props.bookShelf;
        }
        let bookData = bookShelfs.filter(item => item.id === this.props.match.params.id);
        this.setState({
            mybookData: bookData,
            bookTitle: bookData[0].title
        }, () => {
            this.getBookCatalog(bookData);
        });
    }

    // 获取小说章节(根据小说源id)
    getBookCatalog (value) {
        let parmas = value[0].sourceId;
        bookCatalog(parmas).then(res => {
            this.setState({
                chaptersData: res.chapters
            });
            if (value[0].readlink === '') {
                value[0].readlink = res.chapters[0].link;
                this.setState({
                    mybookData: value
                });
            }
            this.getBookChapter(value);
        });
    }

    // 获取小说章节内容
    getBookChapter (value) {
        let parmas = value[0].readlink;
        bookChapter(parmas).then(res => {
            if (res.ok === true) {
                this.setState({
                    bookData: res.chapter
                });
                if (res.chapter.isVip) {
                    Modal.warning({
                        title: '警告',
                        content: '该章节为正版源，请换源后重试~',
                        keyboard: false,
                        onOk: () => this.props.history.push('/bookinfo/' + this.props.match.params.id)
                    });
                }
                // 漫画
                if (res.chapter.images) {
                    this.setState({
                        imagesData: res.chapter.images.split(',')
                    });
                }
            }
        });
        this.setState({
            chapterIndex: this.state.chaptersData.findIndex(item => item.link === value[0].readlink)
        });
    }

    // 上一章
    backChapter = () => {
        let index = this.state.chapterIndex;
        if (index < 1) {
            message.warning('这已经是第一章节了哦~');
            return;
        }
        let parmas = this.state.chaptersData[index -= 1].link;
        this.pageTurningChapter(parmas);
    }

    // 下一章
    nextChapter = () => {
        let index = this.state.chapterIndex;
        if (index >= this.state.chaptersData.length - 1) {
            message.warning('这已经是最新的章节了哦~');
            return;
        }
        let parmas = this.state.chaptersData[index += 1].link;
        this.pageTurningChapter(parmas);
    }

    // 翻页获取小说内容
    pageTurningChapter (parmas) {
        let bookShelfs;
        if (typeof this.props.bookShelf == "string") {
            bookShelfs = JSON.parse(this.props.bookShelf);
        } else {
            bookShelfs = this.props.bookShelf;
        }
        bookChapter(parmas).then(res => {
            if (res.ok === true) {
                this.setState({
                    bookData: res.chapter
                });
                if (res.chapter.isVip) {
                    Modal.warning({
                        title: '警告',
                        content: '该章节为正版源，请换源后重试~',
                        keyboard: false,
                        onOk: () => this.props.history.push('/bookinfo/' + this.props.match.params.id)
                    });
                }
                // 漫画
                if (res.chapter.images) {
                    this.setState({
                        imagesData: res.chapter.images.split(',')
                    });
                }
                if (bookShelfs.findIndex(item=> item.id === this.props.match.params.id) !== -1) {
                    bookShelfs[bookShelfs.findIndex(item => item.id === this.props.match.params.id)].readlink = parmas;
                    bookShelfs[bookShelfs.findIndex(item => item.id === this.props.match.params.id)].readtitle = this.state.bookData.title;
                    this.props.updateBookShelf({bookShelf: JSON.stringify(bookShelfs)});
                }
            }
        });
    }

    // 返回章节列表
    backBookinfo = () => {
        this.props.history.push('/bookinfo/' + this.props.match.params.id)
    }

    render () {
        return (
            <div className="book-chapter">
                <Breadcrumb separator=">" className="ptb-10">
                    <Breadcrumb.Item>
                        <Link to="/home">首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        { this.state.bookTitle }
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        { this.state.bookData.title }
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="chapter-btn">
                    <div>
                        { this.state.bookData.title }
                    </div>
                    <div>
                        <Button
                            type="primary"
                            onClick={this.backChapter}
                            icon={<LeftOutlined />}>
                            上一章
                        </Button>
                        <Button
                            type="primary"
                            onClick={this.backBookinfo}
                            icon={<UnorderedListOutlined />}
                            className="ml-15">
                            章节列表
                        </Button>
                        <Button
                            type="primary"
                            onClick={this.nextChapter}
                            className="ml-15">
                            下一章
                            <RightOutlined />
                        </Button>
                    </div>
                </div>
                <hr/>
                <div className="chapter-content">
                    {
                        this.state.imagesData.length === 0 ?
                            <pre>
                                { this.state.bookData.cpContent || this.state.bookData.body }
                            </pre> : <div>
                                {
                                    this.state.imagesData.map((value, index) => (
                                        <p key={value}>
                                            <img src={value} width="100%" alt=""/>
                                        </p>
                                    ))
                                }
                            </div>
                    }
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button
                        type="primary"
                        onClick={this.backChapter}
                        icon={<LeftOutlined />}>
                        上一章
                    </Button>
                    <Button
                        type="primary"
                        onClick={this.nextChapter}
                        className="ml-15">
                        下一章
                        <RightOutlined />
                    </Button>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Bookchapter);
