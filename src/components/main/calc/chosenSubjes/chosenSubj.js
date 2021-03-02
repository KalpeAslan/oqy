import { useState } from 'react';
import cn from 'classnames';
import './chosenSubj.css';

function ChosenSubjesAndScore(props) {

    const name = cn('main-chosen-subjects-scores', {
        'show-main-chosen-subjects-scores': props.hideSubjList,
        'hide-main-chosen-subjects-scores': props.hideSubjList,
        'hidden': props.isChanged
    });

    const toggleFirst = () => {
        props.setTittleIndex(1);
        props.setShowResult(false);
        props.setChanged(true);
        props.setHideSubjList(!props.hideSubjList);
        props.setShow(true);
        props.setToggle(false);
        // props.setShowLast(false)
        setTimeout(() => {
            props.setHideFirst(false)
        }, 1000);

    }

    const toggleSecond = () => {
        props.setTittleIndex(2);
        props.setShowResult(false);
        props.setChanged(true);
        props.setHideSubjList(!props.hideSubjList);
        props.setShow(true);
        // props.setShowLast(false)

    }

    const backToInput = () => {
        props.setHideInput(false);
        props.setShowLast(false)
    }

    const inputName = cn('list-group-item chosen-scores chosen-list',{
        'disabled': props.isResult
    })
    return <div className={name}>
        <div className="chosen-subjects">
<h5 className="chosen-desc">{props.strings.chosenDesc}</h5>
            <ul className="list-group chosen-subjects-scores" id="chosen-subjects-list">
                <li className="list-group-item chosen-subjects chosen-list" onClick={toggleFirst}>
                    <img className="subject-icon" src={props.firstSubj.icon} alt="" />
                    <p className="subject-desc">{props.firstSubj.name}</p>
                </li>
                <li class="list-group-item chosen-subjects chosen-list" onClick={toggleSecond}>
                    <img className="subject-icon" src={props.secondSubj.icon} alt="" />
                    <p className="subject-desc">{props.secondSubj.name}</p>
                </li>
            </ul>
        </div>
        <div className="chosen-score">
            <h5 className="chosen-desc-score">{props.strings.chosenDescScore}</h5>
            <ul className="list-group chosen-subjects-scores">
                <li className={inputName} onClick={backToInput}>
                    <p className="subject-desc">{props.score}</p>
                </li>
            </ul>
        </div>
    </div>
}

export default ChosenSubjesAndScore;