import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import './inputScore.css';






function InputScore(props) {
    const {strings} = props;
    const desktoInput = <div className="input-group mb-3 input-score-text">
        <input type="text" onChange={(e) => { changeScore(e) }} className="form-control" placeholder={strings.inputScoreText} aria-label="Recipient's username" aria-describedby="basic-addon2" />
        <div className="input-group-append">
        </div>
    </div>;

    const mobInput = <div className="range-mobile">
        <h5>{props.score}</h5>
        <input type="range" className="form-range" value={props.score} min="50" max="140" step="1" id="customRange3" onChange={(e) => { changeScore(e) }}></input>
    </div>;

    const changeScore = (e) => {
        props.setScore(e.target.value)    
    };

    const inputScoreName = cn('input-score', {
        'hide-input-score': props.hideInput
    })
    const isMob = window.innerWidth <= 768 ? true : false;
    return (<div className={inputScoreName}>
        <h3>{strings.inputScore}</h3>
        {isMob ? mobInput : desktoInput}

    </div>)

}
export default InputScore;