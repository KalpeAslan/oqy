import React, { useState, useRef, useEffect } from 'react';
import NavItems from '../navItems/navItems.js';
import cn from 'classnames';
import UseOutsideClick from '../useOutsideOfClick.js';
import './navMob.css'


function NavMob(props) {
    const ref = useRef();
    const [isHide, setHide] = useState(true);
    const [toggle, setToggle] = useState(false);
    const [temp, setTemp] = useState(true);
    const [isActive, setActive] = useState(false);
    const name = cn('navMob', {
        'animation-show': !isHide ? true : false,
        'hideNav': toggle ? false : true,
        'hidden-responsive': temp ? true : false,
    });
    const nameForButton = cn('navbar-toggler', {
        'hidden-responsive': isHide ? false : true
    })
    const windowInnerWidth = window.innerWidth

    UseOutsideClick(ref, () => {

        if (windowInnerWidth <= 1300 && windowInnerWidth >=750 && isActive) {
            setHide(true);
            props.setOutsideActive(!toggle)
            setToggle(!toggle);
            setTimeout(() => {
                setTemp(true);
                setActive(false);
            }, 500);
        }
    });
    const changeHide = () => {

        if (isHide === false && isActive === true && temp === false) {
            if (windowInnerWidth <= 1300){
                props.setOutsideActive(!toggle)
            }
            setHide(true);
            setToggle(!toggle);
            setTimeout(() => {
                setTemp(true);
                setActive(false);
            }, 500);
        } else {
            if (windowInnerWidth <= 1300){
                props.setOutsideActive(!toggle)
            }
            setActive(!isActive);
            setHide(!isHide);
            setToggle(!toggle);
            setTemp(!temp);
        }

    }
  

    const { isAbout } = props;

    const navVert = !isAbout ? <div className={name} >
        <NavItems strings={props.strings} setOutsideActive={props.setOutsideActive}/>
    </div> : null;


    return <div ref={ref} className="navMob-Parent">
        {!isAbout ? <div>
            <button ref={ref} onClick={changeHide} className={nameForButton} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </div> : null}
        {isActive ? navVert : null}
    </div>


}

export default NavMob;