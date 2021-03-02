import React, {useEffect} from 'react';
import cn from 'classnames';
import './senSubject.css';

function checkToNumber(number) {
    const num = number / 1;
    if (isNaN(num) || !(num >= 50 && num <= 140)) return false;
    return true;
}



function SendSubjects(props) {
    


    const toggle = ()=>{

        if(checkToNumber(props.score)){
            console.log(props.fullSubj)
            props.setShowLast(true);
            props.setHideInput(true);
        } else {
            props.setALert(true);
        }
    };

    useEffect(async () => {
        if (props.isAlert) {
            setTimeout(() => {
                props.setALert(false);
            }, 3000);
        }

    }, [props.isAlert])




    const name = cn('btn btn-success',{
        'btn-success-hide': props.hideInput ? true : false
    });
return <button onClick={toggle} type="button" className={name}>{props.strings.btnSuccess}</button>
    
}

export default SendSubjects;