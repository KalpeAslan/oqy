import React, { useState, useEffect, useRef } from 'react';
import profDB from './profDB';
import connect from './connect';
import useOutsideOfClick from '../../../navbar/useOutsideOfClick.js';
import cn from 'classnames';
import './brachesAndProfs.css';

function BranchesAndProfs(props) {

    const {strings} = props;
    // for to server
    const chosenArea = {
        branch: {
            name: 'branch',
            desc:  strings.mainBranches
        },
        prof: {
            name: 'prof',
            desc: strings.mainProfs
        }
    };

    //set Profs or Branches in db

 

    //get elems of area
    useEffect(() => {
        const send = async () => {
            if (props.branchOrProf.name === chosenArea.branch.name) {
                const isSettedBool = await connect.setBranches(props.fullSubj);
                alert(isSettedBool)
                if(!isSettedBool) send()
                props.setLoading(false);
            } else {
                props.setLoading(true);
                const isSettedBool = await connect.setProfs(props.fullSubj);
                if(!isSettedBool) send()
                props.setLoading(false);
            }
        };
        send();
    }, [props.fullSubj, props.branchOrProf])


    // for branches states 
    const [firstBranch, setFirstBranch] = useState('none');
    const [secondBranch, setSecondBranch] = useState('none');
    const [thirdBranch, setThirdBranch] = useState('none');
    const [fourthBranch, setFourthBranch] = useState('none');
    const elemsBranch = [firstBranch, secondBranch, thirdBranch, fourthBranch];
    const setElemsBranch = [setFirstBranch, setSecondBranch, setThirdBranch, setFourthBranch];

    const [branches, setBranches] = useState([]);


    const [elemIndex, setElemIndex] = useState('none');

    const queryForBranch = (elemIndex) => {
        setElemIndex(elemIndex)
        const dbFull = connect.getBranches();
        profDB.setAllBranches(dbFull, props.score);
        const branchesTemp = profDB.getAllBranches();
        setBranches(branchesTemp);
    }




    // for animations of the list
    const [toggle, setToggle] = useState(false);
    const [hideFirst, setHideFirst] = useState(false);

    const firstSwitch = cn('list-group subjects-list-area page-branches-profs', {
        'ul-switch-next-area': toggle ? true : false,
        'ul-switch-back-area': !toggle ? true : false,
        'hide-first-area': hideFirst ? true : false,
        'hide-scroll-area': !toggle ? true : false
    });

    const togglerNext = (i) => {
        setToggle(!toggle);
        setActiveIdFirst(i);
        setTimeout(() => {
            setHideFirst(true)
        }, 1000);
    };


    const togglerBackBranch = (branch, i) => {
        setToggle(!toggle);
        setActiveIdSecond(i);
        setActiveIdFirst(null);

        setTimeout(() => {
            setHideFirst(false)
            setElemsBranch[elemIndex](branch);
        }, 1000);
    };

    //   list

    const [activeIdFirst, setActiveIdFirst] = useState();
    const [activeIdSecond, setActiveIdSecond] = useState();



    const [isFocus, setFocus] = useState(false);

    const closeInAcive = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    </svg>;

    const closeActive = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
    </svg>;








    let firstBranches = () => {
        let result = [];
        for (let i = 0; i < 4; i++) {
            const desc = elemsBranch[i] !== 'none' ? elemsBranch[i] : props.branchOrProf.desc;
            const firstName = cn('list-group-item first-page-list', {
                'active': activeIdFirst === i,
                'disabled': props.isLoading
            });


            const button = <button data-key={i} key={Math.floor(Math.random(i) * 60)} onClick={(e) => { if (e.currentTarget.dataset.key == i) setElemsBranch[i]('none') }} type="button" className="btn btn-outline-danger">
                {isFocus ? closeActive : closeInAcive}
            </button>;

            result.push(
                <div className="first-page-list">
                    <li onClick={() => { togglerNext(i); queryForBranch(i); }} key={i} className={firstName}>
                        <p>{desc}</p>
                    </li>
                    {elemsBranch[i] !== 'none' ? button : null}

                </div>
            );
        }
        return result;
    };
    firstBranches = firstBranches();

    useEffect(() => {
        setElemsBranch.forEach(setElem => {
            setElem('none');
        });
        setElemsProfs.forEach(setElem => {
            setElem('none')
        })
    }, [props.fullSubj])







    const secondBranches = branches.map((branch, i) => {
        const secondName = cn('list-group-item second-page-list', {
            'active': activeIdSecond === i,
            'disabled': props.isLoading
        });

        const list = <li onClick={(e) => { togglerBackBranch(branch, i) }} key={i} className={secondName}>{branch}</li>;
        if (elemsBranch.includes(branch)) {
            setTimeout(() => {
                return null
            }, 1000)
        } else {
            return list
        }
    });


    const secondEmpty = <li onClick={() => {
        setToggle(!toggle);
        setTimeout(() => {
            setHideFirst(false);
            setActiveIdFirst(null);
        }, 1000);
    }} className='list-group-item second-page-list'>{props.branchOrProf.name !== chosenArea.branch.name ? strings.profsIsEmpty : strings.branchesIsEmpty}</li>;

    const isEmpty = (second) => {
        const emptyCheck = second.every(elem => elem === undefined);
        return emptyCheck ? secondEmpty : second;
    }




    //for prof

    // for profs states
    const [firstProf, setFirstProf] = useState('none');
    const [secondProf, setSecondProf] = useState('none');
    const [thirdProf, setThirdProf] = useState('none');
    const [fourthProf, setFourthProf] = useState('none');
    const elemsProfs = [firstProf, secondProf, thirdProf, fourthProf];
    const setElemsProfs = [setFirstProf, setSecondProf, setThirdProf, setFourthProf];

    const [profs, setProfs] = useState([]);


    const [fullProfsTemp, setFullProfs] = useState([])

    const queryForProfs = (elemIndex) => {
        setElemIndex(elemIndex)
        const dbFull = connect.getProfs();
        if(dbFull.length === 0) connect.getProfs();
        profDB.setAllProfs(dbFull);
        const profsTemp = profDB.getAllProfs();
        setFullProfs(profsTemp);
        setProfs(profsTemp);

    }

    const togglerBackProfs = (prof, i) => {
        setToggle(!toggle);
        setActiveIdSecond(i);
        setActiveIdFirst(null);

        setTimeout(() => {
            setHideFirst(false)
            setElemsProfs[elemIndex](prof);
        }, 1000);
    };



    let firstProfs = () => {
        let result = [];
        for (let i = 0; i < 4; i++) {
            const desc = elemsProfs[i].name !== undefined ? elemsProfs[i].name : props.branchOrProf.desc;
            const firstName = cn('list-group-item first-page-list', {
                'active': activeIdFirst === i,
                'disabled': props.isLoading
            });


            const button = <button data-key={i} key={Math.floor(Math.random(i) * 60)} onClick={(e) => { if (e.currentTarget.dataset.key == i) setElemsProfs[i]('none') }} type="button" className="btn btn-outline-danger">
                {isFocus ? closeActive : closeInAcive}
            </button>;
            result.push(<div className="first-page-list">
            <li onClick={() => { togglerNext(i); queryForProfs(i); }} key={i} className={firstName}>
                <p>{desc}</p>
            </li>
            {elemsProfs[i] !== 'none' ? button : null}
        </div>);

            




        }
        return result;
    }
    firstProfs = firstProfs();


    const secondProfs = profs.map((prof, i) => {
        const secondName = cn('list-group-item second-page-list', {
            'active': activeIdSecond === i,
            'disabled': props.isLoading
        });



        const list = <li onClick={(e) => { togglerBackProfs(prof, i) }} key={i} className={secondName}>{`${prof.code}   ${prof.name}`}</li>;

        const namesProfs = elemsProfs.map(prof => prof.name);

        if (namesProfs.includes(prof.name)) {
            setTimeout(() => {
                return null
            }, 1000)
        } else {
            return list
        }
    });

    const [inputValue, setInputValue] = useState('');

    const [hideSearch, setHideSearch] = useState(false);


    const back = <svg id="search-input-icons" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
    </svg>;





    const close = <svg onClick={() => { setInputValue('') }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" id="clear-input-search" className="bi bi-x" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    </svg>

    const changeValue = (e) => {
        setInputValue(e.target.value);
    };
    const ref = useRef();

    useOutsideOfClick(ref, () => {
        setHideSearch(!hideSearch)
    });

    const inputCLick = () => {
        if (!hideSearch) {
            const inputClass = document.querySelector('.search-prof-input');
            inputClass.focus();
        }
        setHideSearch(!hideSearch);
    }


    useEffect(() => {

        if (inputValue !== '') {
            const filtered = fullProfsTemp.filter((prof => {
                const profStr = `${prof.code.toLowerCase()}   ${prof.name.toLowerCase()}`;
                return profStr.includes(inputValue);
            }));
            setProfs(filtered);
        } else {
            setProfs(fullProfsTemp);
        }

    }, [inputValue])



    const search = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>

    const input = <li className="list-group-item input-search-prof">
        <div className="input-group mb-3" id="search-prof">
            <div onClick={inputCLick} className="input-group-prepend search-prof-icon">
                <span className="input-group-text search-prof-icon">
                    {hideSearch ? null : search}
                    {hideSearch ? back : null}
                </span>
            </div>
            <input ref={ref} onClick={() => { setHideSearch(!hideSearch) }} onChange={(e) => changeValue(e)} value={inputValue} type="text" className="form-control search-prof-input" aria-label="Amount (to the nearest dollar)" />
            {inputValue === '' ? null : close}

        </div>
    </li>





    //get result
    const getGrants = () => {
        props.setIsResult(true);
        props.setShowResult(true);
        props.setHideBrAndPr(true);
        console.log(elemsBranch);
        if (props.branchOrProf.name === chosenArea.prof.name) {
            //filter for undefined elems(for algorithm of sort)
            const filteredProfs = elemsProfs.filter(prof => prof === 'none' ? false : true);
            const res = profDB.getFiltredProfs(filteredProfs, props.score, props.qouta);
            props.setGrantsProf(res);
        } else {
            //filter for undefined elems(for algorithm of sort)

            const filteredBranches = elemsBranch.filter(branch => branch === 'none' ? false : true);
            console.log(filteredBranches)
            profDB.setProfsByBraches(elemsBranch, props.qouta);
            const res = profDB.getProfsByBraches();
            props.setAllGrantsBranch(res);
        }
    }

    const changeArea = (area) => {
        props.setBrOrPr(area);
        props.setArea(area.name);
        if (toggle === true) {
            setToggle(false);
            setHideFirst(false);
        }
    };

    const buttonName = cn('btn btn-success btn-get-result', {
        'disabled': toggle,
        'hidden': props.hideBranchesAndProfs
    });

    const branchesAndProfs = cn('pages-branches-profs', {
        'hidden': props.hideBranchesAndProfs
    });

    const buttonsArea = cn('btn btn-light', {
        'hidden': props.hideBranchesAndProfs
    });

    const qoutaInput = cn('form-check-input', {
        'hidden': props.hideBranchesAndProfs
    });

    const qoutaLabel = cn('form-check-label', {
        'hidden': props.hideBranchesAndProfs
    });


    const spinner = <div className="spinner-parent">
        <div className="spinner-border text-primary" role="status">
        </div>
    </div>

    const mainBranchesProfs = cn('main-branches-profs', {
        'hidden': props.isChanged
    })

    return (
        <div className={mainBranchesProfs}>

    <button type="button" className={buttonsArea} onClick={() => { changeArea(chosenArea.branch); }}>{strings.mainBranches}</button>
    <button type="button" className={buttonsArea} onClick={() => { changeArea(chosenArea.prof) }}>{strings.mainProfs}</button>
            <div class="form-check">
                <input onClick={() => { props.setQouta(!props.qouta) }} className={qoutaInput} type="checkbox" value="" id="flexCheckDefault" />
                <label className={qoutaLabel} for="flexCheckDefault">
                    {strings.formCheckLabel}
                </label>
            </div>
            <div className={branchesAndProfs}>
                {props.isLoading ? spinner : null}

                <div className="main-pages-branches-profs">
                    <div className={firstSwitch}>
                        <ul className="list-group list-area list-area-first">
                            {props.branchOrProf.name === 'branch' ? firstBranches : firstProfs}
                        </ul>
                    </div>
                    <div className={firstSwitch}>
                        <ul className="list-group list-area">
                            {props.branchOrProf.name === 'prof' ? input : null}
                            {props.branchOrProf.name === chosenArea.branch.name ? isEmpty(secondBranches, branches, elemsBranch) : isEmpty(secondProfs, profs, elemsProfs)}
                        </ul>
                    </div>

                </div>
            </div>
    <button type="button" onClick={getGrants} className={buttonName}>{strings.btnGetResult}</button>

        </div>
    )
}

export default BranchesAndProfs;