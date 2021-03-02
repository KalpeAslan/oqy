import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom'
import Calc from './calc/calc.js';
import About from './about/about.js';
import Blog from './blog/blog.js';
import Study from './study/study.js';
import Test from './test/test.js';
import Profs from './profs/profs.js'
import Univers from './univers/univers.js'
import CardPost from './cardPost/cardPost.js';
import Error from './error/error.js'
import cn from 'classnames';
import './main.css';




function Main(props) {

    const { isOutideActive, strings, isAlert, setALert, hideAnim, setHideAnim, setHideFooter } = props;

    const mainName = cn('main-elems', {
        'main-elems-opactity-active': isOutideActive,
        'main-elems-opactity-inActive': !isOutideActive
    });
    const {postBody,postBodyOrig,setPostBody,setPostBodyOrig} = props;

    return (
        <main className={mainName}>
            <Switch>
                <Route exact path='/' render={props => <Calc strings={strings} isAlert={isAlert} setALert={setALert}
                    hideAnim={hideAnim} setHideAnim={setHideAnim} setHideFooter={setHideFooter} {...props} />} />
                <Route path='/about' render={props => <About strings={strings} {...props} />} />
                {postBody.map(post => {
                    return <Route path={`/blog/${post.id}`} render={props => <CardPost isKz={strings.getLanguage() === 'kz'} postBodyOrig={postBodyOrig} 
                                                            setPostBody={setPostBody} postBody={post} {...props} />}></Route>
                })}
                <Route path='/blog' render={props => <Blog postBody={postBody} strings={strings} setPostBodyOrig={setPostBodyOrig} setPostBody={setPostBody} 
                                    isKz={strings.getLanguage() === 'kz'} {...props} />}></Route>
                <Route path='/study' render={props => <Study strings={strings} {...props} />}></Route>
                <Route path='/test' render={props => <Test strings={strings} {...props} />}></Route>
                <Route path='/profs' render={props => <Profs strings={strings} {...props} />}></Route>
                <Route path='/univers' render={props => <Univers strings={strings} {...props} />}></Route>
                <Route render={props => <Error strings={strings} {...props} />} />
            </Switch>
        </main>
    )
}
export default Main;