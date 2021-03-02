



import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import './showResult.css';


let counter = Math.floor(Math.random() * 10);

function keyIter() {
    counter = counter + 1;
    return counter;
}
function ShowResult(props) {

    const { allgrantsBranch, grantsProf, area } = props;
    const grants = area === 'branch' ? allgrantsBranch : grantsProf;
    const grantsKeys = Object.keys(grants);

    const [pagesCount, setPagesCount] = useState(null);

    function moreFour() {
        let branchesList = () => {
            const res = [];
            const keys = Object.keys(grants);
            const remainder = keys.length % 4;
            if (remainder !== 0) {
                const startOfEnd = keys.length - 4;
                const end = keys.length;
                for (let i = 0; i < end - remainder; i++) {
                    res.push(grants[keys[i]]);
                }
                //for last elems 
                for (let i = startOfEnd; i < end; i++) {
                    res.push(grants[keys[i]])
                }
            } else {
                console.log(area)
                for (let i = 0; i < keys.length; i++) {
                    res.push(grants[keys[i]]);
                }
            }

            const listElems = [];
            for (let i = 0; i < res.length; i = i + 4) {
                const fourElems = [];
                for (let j = i; j < i + 4; j++) {
                    fourElems.push(res[j]);
                }
                listElems.push(fourElems)
            }
            return listElems
        }
        branchesList = branchesList();
        console.log(branchesList)
        if (pagesCount === null) {
            setPagesCount(branchesList.length);
        }

        const lists = branchesList.map((page, i) => {
            const grantsName = cn('grants-page', {
                'show': pageIndex === i,
                'hidden': pageIndex !== i
            });
            const listsPage = generateList(page);
            const wrap = <div key={i} className={grantsName}>
                <ul class="list-group grants-list-parent">
                    {listsPage}
                </ul>
            </div>;
            return wrap;
        });
        return lists;
    }



    function getUniversList(elem, code) {

        const checkKeep = { show: 'list-group-item subject-list-item list-grant-elem show-univer-animation', hide: 'list-group-item subject-list-item list-grant-elem hidden' };
        let univerName;

        if (keepUniver === code) {
            univerName = checkKeep.show
        } else {
            univerName = checkKeep.hide;
        }
        return elem.univers.map(uni => {
            let uniName;

            if (uni.name === undefined) {
                const key = Object.keys(uni)[0];
                uniName = uni[key].name;
            } else {
                uniName = uni.name;
            }
            return <li key={keyIter()} className={univerName}>{uniName}</li>
        });
    }



    const toggleList = (code) => {
        if (code === keepUniver) {
            setKeepUniver('none');
        } else {
            setKeepUniver(code);
        }
    }


    function arrowHide(arrowName) {
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={arrowName} viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z" />
        </svg>
    }

    function checkToUniverLength(elemUnivers,name){
        console.log(name)
        console.log(elemUnivers)
        if(elemUnivers !== undefined){
            if(elemUnivers.length === 0) return false;
            return true
        }
        return false;
    }

    const [keepUniver, setKeepUniver] = useState('');
    function generateList(elems) {
        const lists = elems.map((elem, i) => {
            const arrowName = cn('bi bi-chevron-compact-right', {
                'arrow-spin': elem.code === keepUniver
            })

            const liHead = <li key={keyIter()} onClick={() => { toggleList(elem.code) }} className="list-group-item subject-list-item list-grant-elem">
                {checkToUniverLength(elem.univers,elem.name) ? arrowHide(arrowName) : null}

                <p className="subject-desc-icon subject-desc">{elem.name}</p>
            </li>;


            const ul = <ul class="list-group grants-list-ul">
                {liHead}
                {checkToUniverLength(elem.univers,elem.name)  ? getUniversList(elem, elem.code) : null}
            </ul>
            return ul;
        });
        return lists;
    }
    function lessFour() {
        const keys = Object.keys(grants);
        const elemsLess = keys.map((key, i) => {
            return grants[key];
        });
        const res = generateList(elemsLess);
        const wrap = <div className="grants-list-parent">
            <ul class="list-group grants-list-ul grants-list-parent">
                {res}
                {elemsLess.univers !== undefined ? getUniversList(elemsLess, elemsLess.code) : null}
            </ul>
        </div>;
        return wrap;
    }
    const [pageIndex, setPage] = useState(0);

    const [isProf, setIfProf] = useState(false);



    useEffect(() => {
        if (props.area === 'prof') {
            setIfProf(true);
            return;
        }
    }, [props.area])
    const toggleNext = () => {
        if (pagesCount === null) return null;
        if (pagesCount !== pageIndex + 1) {
            setPage(pageIndex + 1);
        }
    }

    const toggleBack = () => {
        if (pageIndex >= 1) {
            setPage(pageIndex - 1);
        }
    }





    const [isBackActive, setBackActive] = useState(false);
    const [isNextActive, setNextActive] = useState(false);

    const backIconInActive = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className={'bi bi-arrow-left-circle grants-arrow-icon'} viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
    </svg>;

    const backIconActive = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
    </svg>;

    const backButton = <button onMouseOut={() => { setBackActive(false) }} onMouseOver={() => { setBackActive(true) }} onClick={toggleBack} type="button" className="btn btn-primary">
        {isBackActive ? backIconActive : backIconInActive}
        <span class="visually-hidden">Button</span>
    </button>;


    const nextIconInActive = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
    </svg>
    const nextIconActive = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
    </svg>

    const nextButton = <button onMouseOut={() => { setNextActive(false) }} onMouseOver={() => { setNextActive(true) }} onClick={toggleNext} type="button" className="btn btn-primary">
        {isNextActive ? nextIconActive : nextIconInActive}
        <span class="visually-hidden">Button</span>
    </button>;





    return <div className="main-grants-pages-headers">

        {isProf ? <h4>{props.strings.mainGrantsPagesHeaders}</h4> : <h3>{`Вариант ${pageIndex + 1}`}</h3>}
        <div className="main-grants-parent">
            {(grantsKeys.length < 4 || isProf) ? null : backButton}
            <div className="main-page-grants-list">
                <div className="elems-grants-list">
                    {grantsKeys.length > 4 ? moreFour() : null}
                    {grantsKeys.length <= 4 ? lessFour() : null}
                </div>
            </div>
            {(grantsKeys.length < 4 || isProf) ? null : nextButton}
        </div>
    </div>

}

export default ShowResult;