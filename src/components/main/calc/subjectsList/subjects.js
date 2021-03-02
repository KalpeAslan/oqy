import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import './subjects.css';
import subjAllFunction from './subjectsList.js';

function Subjects(props) {

    const {strings} = props;
    const subjAll = subjAllFunction(strings.getLanguage());
    const firstSwitch = cn('list-group subjects-list', {
        'ul-switch-next': props.toggle ? true : false,
        'ul-switch-back': !props.toggle ? true : false,
        'hide-first': props.hideFirst ? true : false,
    });

    const keysSubjAll = Object.keys(subjAll);
    const [firstSubj, setFirstSujb] = useState('none');
    const [secondSubject, setSecondSubj] = useState('none');
    const chosenAndNot = {
        notChosen: "list-group-item subject-list-item",
        chosen: "active list-group-item subject-list-item"
    };
    let firstSubjects = keysSubjAll.map((key, i) => {
        const chosenOrNot = subjAll[key].short === firstSubj ? chosenAndNot.chosen : chosenAndNot.notChosen;
        return (<li onClick={() => { togglerNext(subjAll[key]) }} key={i} className={chosenOrNot}>
            <img className="subject-desc-icon subject-icon" src={subjAll[key].icon} alt={subjAll[key].name} />
            <p className="subject-desc-icon subject-desc" >{subjAll[key].name}</p>
        </li>)
    });

    let filtred = () => {
        if (firstSubj === 'none') return null;
        return keysSubjAll.map((key, i) => {
            const chosenOrNot = subjAll[key].short === secondSubject ? chosenAndNot.chosen : chosenAndNot.notChosen;
            const li = <li onClick={() => { togglerToRes(subjAll[key]) }} key={i} className={chosenOrNot}>
                <img className="subject-desc-icon subject-icon" src={subjAll[key].icon} alt={subjAll[key].name} />
                <p className="subject-desc-icon subject-desc" >{subjAll[key].name}</p>
            </li>;
            if (subjAll[key].share.includes(firstSubj)) {
                return li;
            }
        });
    };
    filtred = filtred();




    const togglerNext = (target) => {
        const elem = document.querySelector('.subject-slider');
        if (elem) {
            elem.scrollTo(0,0);
            if(window.innerWidth <= 768) {
                elem.scrollTop = `0px`;
            }
        }
        props.setTittleIndex(2);
        props.setToggle(!props.toggle);
        setFirstSujb(target.short);
        props.changeHeight(false);
        props.setFirstSujb({
            name: target.name,
            icon: target.icon
        });
        setTimeout(() => {
            props.setHideFirst(true)
        }, 1000);
    };

    const togglerBack = () => {
        props.setTittleIndex(1);
        props.setToggle(!props.toggle);
        setTimeout(() => {
            props.setHideFirst(false)
        }, 1000);

    };
    useEffect(() => {
        props.setFullSubj({
            full: firstSubj + secondSubject,
            reversed: secondSubject + firstSubj
        });
    }, [secondSubject]);





    const listName = cn("subjects-list-buttons", {
        "subjects-list-hide": props.hideSubjList,
    });

    const togglerToRes = (target) => {
        if (props.isChanged) {
            props.setShowLast(true)
            props.setChanged(!props.isChanged)
        }
        props.setHideFooterChild(false)
        props.setTittleIndex(null)
        props.setIsResult(false);
        props.setLoading(true);
        setSecondSubj(target.short);
        props.setHideSubjList(true)
        props.setInputScoreShow(true);
        props.setHideBrAndPr(false);
        props.setShowResult(false);

        props.setSecondSubj({
            name: target.name,
            icon: target.icon
        });
        props.setShow(false);
    };



    const backButton = <svg onClick={togglerBack} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
    </svg>;

const tittleDescription = props.tittleIndex === 1 ? <h5>{strings.backButtonSubjectIndexFirst}</h5> : props.tittleIndex === 2 ? <h5>{strings.backButtonSubjectIndexSecond}</h5> : null;
    return (
        <div className={listName}>
            <div className="back-button-subject-index">
                {props.toggle ? backButton : null}
                {props.tittleIndex !== null ? tittleDescription : null}
            </div>
            <div className="subject-slider">
                <div className="subjects-first-second">
                    <ul className={firstSwitch}>
                        {firstSubjects}
                    </ul>
                    <ul className={firstSwitch + ' second-subjects-filtered'}>
                        {filtred}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Subjects;