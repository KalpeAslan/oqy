import React, { useState, useEffect } from 'react';
// import Subjects from '../subjectsList/subjects';
import Subjects from './subjectsList/subjects.js';
import InputScore from './inputScore/inputScore.js';
import SendSubjects from './api/sendSubjects.js';
import ChosenSubjesAndScore from './chosenSubjes/chosenSubj.js';
import BranchesAndProfs from './branchesAndPRofs/brachesAndProfs.js';
import ShowResult from './showResult/showResult.js';
import connect from './branchesAndPRofs/connect.js'
import cn from 'classnames';
import './calc.css';
function Calc(props) {
    const { strings } = props;
    const [isActive, setActive] = useState(false);
    const [isFullHeight, setFullHeight] = useState(true);

    const [countCalc, setCount] = useState(0);

    const [inputScoreShow, setInputScoreShow] = useState(false);

    const [fullSubj, setFullSubj] = useState('none');
    const [score, setScore] = useState(95);

    const [firstSubj, setFirstSujb] = useState('none');
    const [secondSubj, setSecondSubj] = useState('none');

    const [hideSubjList, setHideSubjList] = useState(false);
    const [toShow, setShow] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [hideFirst, setHideFirst] = useState(false);


    const [hideHeader, setHideHeader] = useState(false);

    const [hideFooter, setHideFooterChild] = useState(false);

    useEffect(() => {
        hideFooter ? props.setHideFooter(true) : props.setHideFooter(false);
    }, [hideFooter])



    const buttonToggle = () => {
        setHideFooterChild(true)
        setHideHeader(true);
        setActive(true);
        setShow(true);
        setCount(countCalc + 1);
    }

    const name = cn('main-list', {
        'show': toShow ? true : false,
        'full-height': isFullHeight ? true : false
    });

    // const [result, setResult] = useState('none');
    const [hideBranchesAndProfs, setHideBrAndPr] = useState(false);
    const [isShowResult, setShowResult] = useState(false);


    const chosenArea = {
        branch: {
            name: 'branch',
            desc: strings.mainBranches
        },
        prof: {
            name: 'prof',
            desc: strings.mainProfs
        }
    };

    const [branchOrProf, setBrOrPr] = useState(chosenArea.branch);


    const [isLoading, setLoading] = useState(false);


    const [isResult, setIsResult] = useState(false);

    const [tittleIndex, setTittleIndex] = useState(1);

    const [showLast, setShowLast] = useState(false);


    const [isChanged, setChanged] = useState(false);

    const listSubject = <div className={name}>
        <Subjects strings={strings} setIsResult={setIsResult} changeHeight={setFullHeight} countCalc={countCalc}
            setCount={setCount} setInputScoreShow={setInputScoreShow}
            setFullSubj={setFullSubj} fullSubj={fullSubj}
            setFirstSujb={setFirstSujb}
            hideSubjList={hideSubjList} setHideSubjList={setHideSubjList}
            setSecondSubj={setSecondSubj} setShow={setShow}
            toggle={toggle} setToggle={setToggle}
            hideFirst={hideFirst} setHideFirst={setHideFirst}
            setHideBrAndPr={setHideBrAndPr} setShowResult={setShowResult}
            branchOrProf={branchOrProf} setBrOrPr={setBrOrPr}
            setLoading={setLoading} isLoading={isLoading}
            tittleIndex={tittleIndex} setTittleIndex={setTittleIndex}
            isFullHeight={isFullHeight} setShowLast={setShowLast}
            isChanged={isChanged} setChanged={setChanged}
            setHideFooterChild={setHideFooterChild} />
    </div>;
    const startButton = <button onClick={buttonToggle} type="button" className="btn btn-outline-primary">{strings.chosenSubjectsInputBranchesSubjects}</button>;


    const [hideInput, setHideInput] = useState(false);


    const [qouta, setQouta] = useState(false);

    //for area of result

    const [area, setArea] = useState('branch');
    //result for Branch
    const [allgrantsBranch, setAllGrantsBranch] = useState([]);



    //result for prof
    const [grantsProf, setGrantsProf] = useState([]);


    const description = <div className="main-header">
        <div className="main-header-tittle">
            <h2>
                {strings.mainHeaderTittle}
            </h2>
        </div>
        <div className="main-header-descriptio">
            <h4>
                {strings.mainHeaderDescriptio}
            </h4>
        </div>
    </div>

    //save in local storage

    useEffect(() => {
        if (secondSubj !== 'none') {
            localStorage.setItem('firstSubj', JSON.stringify(firstSubj));
            localStorage.setItem('secondSubj', JSON.stringify(secondSubj));
            localStorage.setItem('score', JSON.stringify(score));
        }
    }, [secondSubj, score]);



    //check to subjects in localStorage

    // useEffect(() => {
    //     if (localStorage.getItem('firstSubj') !== null) {
    //         setHideFooterChild(true)
    //         setHideHeader(true);
    //         setActive(true);
    //         setShow(true);
    //         setCount(countCalc + 1);
    //         const first = JSON.parse(localStorage.getItem('firstSubj'));
    //         const second = JSON.parse(localStorage.getItem('secondSubj'));
            
    //         setFirstSujb(first);
    //         setSecondSubj(second);
    //         setFullSubj({
    //             full: first + second,
    //             reversed: second + first
    //         });
    //         const send = async () => {
    //             if (branchOrProf.name === chosenArea.branch.name) {
    //                 await connect.setBranches({
    //                     full: first + second,
    //                     reversed: second + first
    //                 });
    //                 setLoading(false)
    //                 const elems = connect.getBranches();
    //                 console.log(elems)
    
    //             } else {
    //                 setLoading(true);
    //                 await connect.setProfs({
    //                     full: first + second,
    //                     reversed: second + first
    //                 });
    //                 setLoading(false);
    //                 const elems = connect.getProfs();
    //                 console.log(elems)
    //             }
    //         };
    //         send();

    //         console.log(connect.getBranches())
            
    //         setHideFooterChild(false)
    //         setTittleIndex(null)
    //         setIsResult(false);
    //         setLoading(true);
    //         setHideSubjList(true)
    //         setInputScoreShow(true);
    //         setHideBrAndPr(false);
    //         setShowResult(false);
    //         setShowLast(true);
    //         setHideInput(true);
    //     }
    // }, [])


    return (
        <div className="main-calc-wrap">
            <div className="main-calc">
                {hideHeader ? null : description}
                {isActive ? listSubject : null}
                {inputScoreShow ? <InputScore strings={strings} score={score} setScore={setScore} hideInput={hideInput} /> : null}
                {inputScoreShow ? <SendSubjects strings={strings} isAlert={props.isAlert} setALert={props.setALert}
                    hideAnim={props.hideAnim} setHideAnim={props.setHideAnim}
                    fullSubj={fullSubj} score={score} setShowLast={setShowLast}
                    hideInput={hideInput} setHideInput={setHideInput} /> : null}
                <div className="chosenSubjects-input-branches-subjects">
                    {showLast ? <ChosenSubjesAndScore strings={strings} setTittleIndex={setTittleIndex} setShowResult={setShowResult} isChanged={isChanged} setChanged={setChanged} setShowLast={setShowLast} isResult={isResult} firstSubj={firstSubj} secondSubj={secondSubj}
                        score={score} hideSubjList={hideSubjList} setHideSubjList={setHideSubjList}
                        setShow={setShow} setToggle={setToggle}
                        hideFirst={hideFirst} setHideFirst={setHideFirst}
                        setHideInput={setHideInput} setFirstSujb={setFirstSujb} /> : null}
                    {!hideHeader ? startButton : null}
                    {showLast ? <BranchesAndProfs strings={strings} isChanged={isChanged} setIsResult={setIsResult} setLoading={setLoading} isLoading={isLoading} branchOrProf={branchOrProf} setBrOrPr={setBrOrPr} fullSubj={fullSubj} setGrantsProf={setGrantsProf} hideBranchesAndProfs={hideBranchesAndProfs} setHideBrAndPr={setHideBrAndPr}
                        setArea={setArea} setShowResult={setShowResult} setAllGrantsBranch={setAllGrantsBranch}
                        score={score} qouta={qouta} setQouta={setQouta} /> : null}
                </div>
                {isShowResult ? <ShowResult strings={strings} area={area} allgrantsBranch={allgrantsBranch} grantsProf={grantsProf} /> : null}
            </div>
        </div>
    )
}
export default Calc;