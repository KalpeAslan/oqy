import React, { useEffect, useState } from 'react';
import NavMob from './navMob/navMob.js';
import DropdownMenu from './dropdownDesktop/dropdownMenu.js'
import { useHistory } from 'react-router-dom';
import './navbar.css';

function Navbar(props) {

    const history = useHistory()

    const [isAbout,setAbout] = useState(false);
    useEffect(() => {
        return history.listen((location) => {
            if(location.pathname === '/about'){
                setAbout(true)
                return;
            };
            setAbout(false)
        })
    }, [history])
    useEffect(()=>{
        if(window.location.pathname === '/about') setAbout(true);
    },[]);


 
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-header">
            {isAbout === true ?  null: <NavMob setOutsideActive={props.setOutsideActive} strings={props.strings}/>}
            <a className="navbar-brand" href="#">OQY</a>
            <DropdownMenu setLanguage={props.setLanguage} />

        </nav>
    )
}

export default Navbar;