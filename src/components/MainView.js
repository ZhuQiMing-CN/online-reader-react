/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/13 14:41
 */
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '../util/loadable';

const Home = loadable(() => import('../views/home'));

const Category = loadable(() => import('../views/category/Category'));
const Cmale = loadable(() => import('../views/category/male/cmale'));
const Cfemale = loadable(() => import('../views/category/female/cfemale'));
const Cpress = loadable(() => import('../views/category/press/cpress'));
const Cpicture = loadable(() => import('../views/category/picture/cpicture'));

const Ranking = loadable(() => import('../views/ranking/Ranking'));
const Rmale = loadable(() => import('../views/ranking/male/rmale'));
const Rfemale = loadable(() => import('../views/ranking/female/rfemale'));
const Rpress = loadable(() => import('../views/ranking/press/rpress'));
const Rpicture = loadable(() => import('../views/ranking/picture/rpicture'));

const Bookinfo = loadable(() => import('../views/bookinfo/bookinfo'));
const Bookchapter = loadable(() => import('../views/bookchapter/bookchapter'));
const Bookshelf = loadable(() => import('../views/bookshelf/bookshelf'));
const Booksearch = loadable(() => import('../views/search/search'));

class MainView extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <Switch>
                <Switch>
                    <Route exact path="/home" component={Home}></Route>
                    <Category path="/category">
                        <Switch>
                            <Redirect exact from="/category" to="/category/male"></Redirect>
                            <Route exact path="/category/male" component={Cmale}></Route>
                            <Route exact path="/category/female" component={Cfemale}></Route>
                            <Route exact path="/category/press" component={Cpress}></Route>
                            <Route exact path="/category/picture" component={Cpicture}></Route>
                        </Switch>
                    </Category>
                    <Ranking path="/ranking">
                        <Switch>
                            <Redirect exact from="/ranking" to="/ranking/male"></Redirect>
                            <Route exact path="/ranking/male" component={Rmale}></Route>
                            <Route exact path="/ranking/female" component={Rfemale}></Route>
                            <Route exact path="/ranking/press" component={Rpress}></Route>
                            <Route exact path="/ranking/picture" component={Rpicture}></Route>
                        </Switch>
                    </Ranking>
                    <Route path="/bookinfo/:id" component={Bookinfo}></Route>
                    <Route path="/bookchapter/:id" component={Bookchapter}></Route>
                    <Route exact path="/bookshelf" component={Bookshelf}></Route>
                    <Route exact path="/search" component={Booksearch}></Route>
                    <Redirect from="*" to="/home"></Redirect>
                </Switch>
            </Switch>
        );
    }
}

export default MainView;
