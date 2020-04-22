/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/19 22:51
 */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Row, Col, message, Modal, Form, Input, Radio } from 'antd';
import { bookInfo, bookSources, bookCatalog } from '../../axios/api';
import { connect } from 'react-redux';
import { updateBookShelf } from '../../store/action';

class Bookinfo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            bookLink: [],
            staticsLink: '',
            mybookData: [],
            sourceId: '',
            sourceName: '',
            sources: '',
            lastChapter: '',
            formSources: {
                sources: '',
                lastChapter: ''
            },
            sourcesData: [],
            catalogList: [],
            dialogSources: false
        };
    }

    componentDidMount () {
        // 获取小说信息
        bookInfo(this.props.match.params.id).then(res => {
            this.setState({
                bookLink: res,
                staticsLink: `http://statics.zhuishushenqi.com${res.cover}`
            });
        });
        // 获取小说正版源于盗版源(混合)
        this.getBookSources();
    }

    // 获取小说正版源于盗版源(混合)
    getBookSources () {
        let parmas = {
            view: 'summary',
            book: this.props.match.params.id
        };
        bookSources(parmas).then(res => {
            this.setState({
                sourceId: res[0]._id,
                sourceName: res[0].name,
                sources: res[0],
                lastChapter: res[0].lastChapter,
                formSources: {
                    sources: res[0].name,
                    lastChapter: res[0].lastChapter
                },
                sourcesData: res
            }, () => {
                this.getCatalog();
            });
        });
    }

    // 获取小说章节(根据小说源id)
    getCatalog () {
        let parmas = this.state.sourceId;
        bookCatalog(parmas).then(res => {
            this.setState({
                catalogList: res.chapters
            });
        });
    }

    // 点击小说章节阅读
    chapterMatter = (value) => {
        let bookShelfs;
        if (typeof this.props.bookShelf == "string") {
            bookShelfs = JSON.parse(this.props.bookShelf);
        } else {
            bookShelfs = this.props.bookShelf;
        }
        if (bookShelfs.findIndex(item => item.id === this.props.match.params.id) === -1) {
            let readRecord = {
                id: this.state.bookLink._id,
                title: this.state.bookLink.title,
                cover: this.state.bookLink.cover,
                author: this.state.bookLink.author,
                readlink: value.link,
                readtitle: value.title,
                sourceId: this.state.sourceId,
                readsource: this.state.sourceName,
                lastChapter: this.state.lastChapter
            };
            bookShelfs.push(readRecord);
            this.props.updateBookShelf({bookShelf: JSON.stringify(bookShelfs)});
        } else {
            bookShelfs[bookShelfs.findIndex(item => item.id === this.props.match.params.id)].sourceId = this.state.sourceId;
            bookShelfs[bookShelfs.findIndex(item => item.id === this.props.match.params.id)].readlink = value.link;
            bookShelfs[bookShelfs.findIndex(item => item.id === this.props.match.params.id)].readtitle = value.title;
            this.props.updateBookShelf({bookShelf: JSON.stringify(bookShelfs)});
        }
        this.props.history.push('/bookchapter/' + this.props.match.params.id);
    }

    // 加入书架
    addBooks = () => {
        let bookShelfs;
        if (typeof this.props.bookShelf == "string") {
            bookShelfs = JSON.parse(this.props.bookShelf);
        } else {
            bookShelfs = this.props.bookShelf;
        }
        if (bookShelfs.findIndex(item => item.id === this.props.match.params.id) === -1) {
            let readRecord = {
                id: this.state.bookLink._id,
                title: this.state.bookLink.title,
                cover: this.state.bookLink.cover,
                author: this.state.bookLink.author,
                readlink: this.state.catalogList[0].link,
                readtitle: this.state.catalogList[0].title,
                sourceId: this.state.sourceId,
                readsource: this.state.sourceName,
                lastChapter: this.state.lastChapter
            };
            bookShelfs.push(readRecord);
            this.props.updateBookShelf({bookShelf: JSON.stringify(bookShelfs)});
            message.success(`${this.state.bookLink.title} 加入书架成功~`);
        } else {
            bookShelfs[bookShelfs.findIndex(item => item.id === this.props.match.params.id)].sourceId = this.state.sourceId;
            bookShelfs[bookShelfs.findIndex(item => item.id === this.props.match.params.id)].readsource = this.state.sourceName;
            bookShelfs[bookShelfs.findIndex(item => item.id === this.props.match.params.id)].lastChapter = this.state.lastChapter;
            this.props.updateBookShelf({bookShelf: JSON.stringify(bookShelfs)});
            message.error(`${this.state.bookLink.title} 此本书已经加入书架咯~`);
        }
    }

    // 开始阅读
    readBooks = (e) => {
        let bookShelfs;
        if (typeof this.props.bookShelf == "string") {
            bookShelfs = JSON.parse(this.props.bookShelf);
        } else {
            bookShelfs = this.props.bookShelf;
        }
        if (bookShelfs.findIndex(item => item.id === this.props.match.params.id) === -1) {
            let readRecord = {
                id: this.state.bookLink._id,
                title: this.state.bookLink.title,
                cover: this.state.bookLink.cover,
                author: this.state.bookLink.author,
                readlink: this.state.catalogList[0].link,
                readtitle: this.state.catalogList[0].title,
                sourceId: this.state.sourceId,
                readsource: this.state.sourceName,
                lastChapter: this.state.lastChapter
            };
            bookShelfs.push(readRecord);
            this.props.updateBookShelf({bookShelf: JSON.stringify(bookShelfs)});
        }
        this.props.history.push('/bookchapter/' + e._id);
    }

    // 选择其他的小说源
    changeSources = (e) => {
        this.refs.formRef.setFieldsValue({
            lastChapter: e.target.value.lastChapter
        })
    }

    // 确定选择小说源
    affirmSources = () => {
        this.refs.formRef.validateFields().then(value => {
            this.setState({
                sourceId: value.sources._id,
                sourceName: value.sources.name,
                lastChapter: value.sources.lastChapter,
                dialogSources: false
            }, () => {
                this.getCatalog();
                // 书架状态管理
                let bookShelfs;
                if (typeof this.props.bookShelf == "string") {
                    bookShelfs = JSON.parse(this.props.bookShelf);
                } else {
                    bookShelfs = this.props.bookShelf;
                }
                if (bookShelfs.findIndex(item => item.id === this.props.match.params.id) === -1) {
                    let readRecord = {
                        id: this.state.bookLink._id,
                        title: this.state.bookLink.title,
                        cover: this.state.bookLink.cover,
                        author: this.state.bookLink.author,
                        readlink: this.state.catalogList[0].link,
                        readtitle: this.state.catalogList[0].title,
                        sourceId: this.state.sourceId,
                        readsource: this.state.sourceName,
                        lastChapter: this.state.lastChapter
                    };
                    bookShelfs.push(readRecord);
                    this.props.updateBookShelf({bookShelf: JSON.stringify(bookShelfs)});
                } else {
                    bookShelfs[bookShelfs.findIndex(item => item.id === this.props.match.params.id)].sourceId = this.state.sourceId;
                    bookShelfs[bookShelfs.findIndex(item => item.id === this.props.match.params.id)].readsource = this.state.sourceName;
                    bookShelfs[bookShelfs.findIndex(item => item.id === this.props.match.params.id)].lastChapter = this.state.lastChapter;
                    bookShelfs[bookShelfs.findIndex(item => item.id === this.props.match.params.id)].readlink = '';
                    this.props.updateBookShelf({bookShelf: JSON.stringify(bookShelfs)});
                }
            });
        })
    }

    // 取消选择小说源
    cancelSources = () => {
        this.setState({
            dialogSources: false
        }, () => {
            this.refs.formRef.resetFields();
        });
    }

    render () {
        return (
            <Fragment>
                <Breadcrumb separator=">" className="ptb-10">
                    <Breadcrumb.Item>
                        <Link to="/home">首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {/*<Link to="/category/male">{this.state.bookLink.cat}</Link>*/}
                        {this.state.bookLink.cat}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.bookLink.title}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="bookinfo-content">
                    <img src={this.state.staticsLink} alt={this.state.bookLink.title} className="img"/>
                    <div className="right-content">
                        <div className="content-data">
                            <div className="data-info">
                                <p>{this.state.bookLink.title}</p>
                                <p>作者：{this.state.bookLink.author}</p>
                                <p>
                                    类型：{this.state.bookLink.majorCate} |
                                    字数：{(this.state.bookLink.wordCount / 10000).toFixed(0)}
                                    万字</p>
                                <p>最后更新：{this.state.bookLink.updated}</p>
                                <p>最新章节：{this.state.lastChapter}</p>
                                <p>当前小说源：{this.state.sourceName}</p>
                            </div>
                            <div className="mt-20">
                                <Button type="primary" onClick={this.addBooks}>加入书架</Button>
                                <Button
                                    type="primary"
                                    onClick={() => this.readBooks(this.state.bookLink)}
                                    className="ml-15">
                                    开始阅读
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() => this.setState({dialogSources: true})}
                                    className="ml-15">
                                    更换小说源
                                </Button>
                            </div>
                        </div>
                        <p className="long-intro">{this.state.bookLink.longIntro}</p>
                    </div>
                </div>
                <div className="popularity-content">
                    <Row>
                        <Col span={8}>
                            <p>追书人数</p>
                            <p className="popularity-p">{this.state.bookLink.latelyFollower}</p>
                        </Col>
                        <Col span={8}>
                            <p>读者存留率</p>
                            <p className="popularity-p">{this.state.bookLink.retentionRatio}%</p>
                        </Col>
                        <Col span={8}>
                            <p>日更新字数</p>
                            <p className="popularity-p">{this.state.bookLink.serializeWordCount}字</p>
                        </Col>
                    </Row>
                </div>
                <div className="catalog-content">
                    <p className="catalog-p">
                        目录
                        <span className="text-danger">（红色字体的为VIP章节）</span>
                    </p>
                    <div style={{padding: "0px 10px"}}>
                        {
                            this.state.catalogList.map((value, index) => (
                                <li
                                    className="chapter-li"
                                    key={value.link}
                                    onClick={() => this.chapterMatter(value)}>
                                    <span className={value.isVip?"text-danger":""}>{value.title}</span>
                                </li>
                            ))
                        }
                    </div>
                    <div style={{clear: "both"}}></div>
                </div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.dialogSources}
                    onOk={this.affirmSources}
                    onCancel={this.cancelSources}
                >
                    <Form ref="formRef" initialValues={{sources: this.state.sources, lastChapter: this.state.lastChapter}}>
                        <Form.Item label="小说源" name="sources">
                            <Radio.Group>
                                {
                                    this.state.sourcesData.map((value, index) => (
                                        <Radio
                                            style={{padding: '2px 5px', width: '30%'}}
                                            value={value}
                                            key={value._id}
                                            onChange={this.changeSources}
                                        >
                                            {value.name}
                                        </Radio>
                                    ))
                                }
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="最新章节" name="lastChapter">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="注意事项">
                            <span>不同的小说源的章节可能会不一样，选择其他的小说源后需要重新选择章节阅读！</span>
                        </Form.Item>
                    </Form>
                </Modal>
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Bookinfo);
