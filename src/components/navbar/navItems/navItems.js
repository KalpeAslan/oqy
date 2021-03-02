import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Link from 'react-router-dom/Link'
import './navItems.css';








function NavItems(props) {

    const [pathName, setPathName] = useState(window.location.pathname);
    const history = useHistory();


    useEffect(() => {
        return history.listen((location) => {
            setPathName(location.pathname);
        })
    }, [history])

    const { strings } = props;
    const cards = {
        home: {
            title: 'Блог',
            desc: strings.blogDesc,
            isActive: pathName === '/blog' ? true : false,
            icon: <i className={`bi bi-house-door ${pathName === '/blog' ? 'active-icon' : null}`}></i>,
            src: '/blog'
        },
        calc: {
            title: strings.calc,
            desc: strings.calcDesc,
            isActive: pathName === '/' ? true : false,
            icon: <i className={`bi bi-calculator ${pathName === '/' ? 'active-icon' : null}`}></i>,
            src: '/'
        },
        study: {
            title: strings.studyTitle,
            desc: strings.studyTitleDesc,
            isActive: pathName === '/study' ? true : false,
            icon: <i className={`bi bi-lightning ${pathName === '/study' ? 'active-icon' : null}`}></i>,
            src: '/study'
        },
        test: {
            title: strings.test,
            desc: strings.testDesc,
            isActive: pathName === '/test' ? true : false,
            icon: <i className={`bi bi-check-square ${pathName === '/test' ? 'active-icon' : null}`}></i>,
            src: '/test'

        },
        profs: {
            title: strings.professions,
            desc: strings.professionsDesc,
            isActive: pathName === '/profs' ? true : false,
            icon: <i className={`fas fa-user-graduate ${pathName === '/profs' ? 'active-icon' : null}`}></i>,
            src: '/profs'

        },
        univers: {
            title: strings.universities,
            desc: strings.universitiesDesc,
            isActive: pathName === '/univers' ? true : false,
            icon: <i className={`fas fa-university ${pathName === '/univers' ? 'active-icon' : null}`}></i>,
            src: '/univers'
        },
        univers: {
            title: strings.about,
            desc: strings.aboutDesc,
            isActive: pathName === '/about' ? true : false,
            icon: <i className={`bi bi-question-circle ${pathName === '/about' ? 'active-icon' : null}`}></i>,
            src: '/about'
        },
        telegram: {
            title: 'Telegram Bot',
            isActive:  false,
            icon: <i className={`bi bi-telegram`}></i>,
            src: '/telegram'
        },
        github:{
            title: 'Github',
            isActive:  false,
            icon: <i className={`bi bi-github`}></i>,
            src: '/github'
        }
    }


    const keys = Object.keys(cards);


    return (
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                {keys.map(key => {
                    const card = cards[key];
                    return <Link onClick={() => { props.setOutsideActive(false) }} to={card.src}>
                        <li className="nav-item">
                            {card.icon}
                            <a className={`nav-link ${card.isActive ? 'active-icon' : null}`} href="#">{card.title}</a>
                        </li>
                    </Link>
                })}
            </ul>
        </div>
    )
}

export default NavItems;