/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/19 23:04
 */
import React, { Component } from 'react';
import { AutoComplete, Input } from 'antd';
import { searchAuto, searchhotWords } from '../axios/api';

import * as echarts from 'echarts';
import 'echarts-wordcloud';

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            hotwords: [],
            echartData: []
        };
    }

    componentDidMount () {
        // 获取搜索热词
        this.getHotWords();
    }

    // 获取搜索热词
    getHotWords () {
        searchhotWords().then(res => {
            if (res.ok === true) {
                this.setState({
                    hotwords: res.searchHotWords.map(item => {
                        return { value: item.word }
                    })
                });
                let echartData = [];
                for (let i of res.searchHotWords) {
                    echartData.push({
                        value: i.times,
                        name: i.word
                    });
                }
                this.setState({
                    echartData: echartData
                }, () => {
                    // 生成词云
                    this.drawLine();
                })
            }
        })
    }

    // 搜索自动补充
    queryChange = (value) => {
        if (value) {
            searchAuto({ query: value }).then(res => {
                if (res.ok === true) {
                    if (res.keywords.length > 0) {
                        this.setState({
                            hotwords: res.keywords.map(item => {
                                return { value: item }
                            })
                        });
                    }
                }
            });
        } else {
            this.getHotWords();
        }
    }

    // 模糊搜索选择
    querySelect = (value) => {
        this.props.history.push('/search?val=' + value);
    }

    // 生成词云
    drawLine () {
        let myChart = echarts.init(this.refs.Echart);
        let options = {
            tooltip: {
                show: false
            },
            series: [{
                type: 'wordCloud',
                gridSize: 8,
                shape: 'star',
                sizeRange: [10, 80],
                rotationRange: [0, 0],
                textStyle: {
                    normal: {
                        color: function () {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 8,
                        shadowColor: '#555'
                    }
                },
                left: 'center',
                top: 'center',
                right: null,
                bottom: null,
                data: this.state.echartData
            }]
        };
        myChart.setOption(options);
        myChart.on('click', function (params) {
            window.location.href = '/search?val=' + params.name;
        });
    }

    render () {
        return (
            <div className="home-content">
                <AutoComplete
                    style={{width: 450,paddingTop: 40}}
                    options={this.state.hotwords}
                    onChange={this.queryChange}
                    onSelect={this.querySelect}>
                    <Input.Search placeholder="请输入书本名或者作者名" enterButton />
                </AutoComplete>
                <div ref="Echart" style={{width: '750px',height: '580px',margin: 'auto'}}></div>
            </div>
        );
    }
}

export default Home;
