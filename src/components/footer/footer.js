import React, { useState,useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import Link from 'react-router-dom/Link';
import './footer.css'




function Footer(props) {
  const [pathName,setPathName] = useState(window.location.pathname);
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
          isActive: pathName=== '/blog' ? true : false,
          icon: <i className={`bi bi-house-door ${pathName=== '/blog' ? 'active-icon' : null}`}></i>,
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

      }
  }

  const keys = Object.keys(cards);
  return (
    <nav className="navbar-footer">
      <ul className="navbar-nav nav-footer-group">
        {keys.map(key => {
          return <Link onClick={() => {}} to={cards[key].src}>
            <li class="nav-item nav-footer-item">
              {cards[key].icon}
              <a class="nav-link" href="#">{cards[key].title}</a>
            </li>
          </Link>
        })}
      </ul>
    </nav>
  )
}

export default Footer;