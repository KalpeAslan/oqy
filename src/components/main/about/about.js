import React, { useState} from 'react';
import Link from 'react-router-dom/Link';
import cn from 'classnames';
import './about.css';
import vector from './vector-creator.png'
function About(props) {

    const {strings} = props
    const titleBody = <div className="about-title-body">
        <img src={vector} alt="" />
        <h1>Сіздің грантқа түсуіңізге көмектесеміз</h1>
    </div>




    const cards = {
        home: {
            title: 'Блог',
            desc: strings.blogDesc,
            icon: <i class="bi bi-house-door"></i>,
            src: '/blog'
        },
        calc: {
            title: strings.calc,
            desc: strings.calcDesc,
            icon: <i class="bi bi-calculator"></i>,
            src: '/'
        },
        study: {
            title: strings.studyTitle,
            desc: strings.studyTitleDesc,
            icon: <i class="bi bi-lightning"></i>,
            src: '/study'
        },
        test: {
            title: strings.test,
            desc: strings.testDesc,
            icon: <i class="bi bi-check-square"></i>,
            src: '/'

        },
        profs: {
            title: strings.professions,
            desc: strings.professionsDesc,
            icon: <i class="fas fa-user-graduate"></i>,
            src: '/'

        },
        univers: {
            title: strings.universities,
            desc: strings.universitiesDesc,
            icon: <i class="fas fa-university"></i>,
            src: '/'

        }
    };
    const [hoverElem, setHoverElem] = useState('none');

    const keys = Object.keys(cards)
    const ul = <ul className="about-card-group">
        {keys.map((key, i) => {
            const card = cards[key];

            const cardName = cn('card', {
                'card-hover-active': hoverElem === i
            });

            const cardConst = <li className='about-card-item' key={i} onMouseOut={() => { setHoverElem('none') }} onMouseOver={() => { setHoverElem(i) }}>
                    <Link to={card.src}>
                    <div className={cardName} style={{ width: "18rem" }}>
                        <div className="card-body card-body-title" >
                            <span className="about-card-title">
                                {card.icon}
                                <h5>{card.title}</h5>
                            </span>
                            <p className="card-text">{card.desc}</p>
        <a href="#" className="btn btn-primary about-button-font">{card.title}</a>
                        </div>
                    </div>
                    </Link>
            </li>
            return cardConst
        })}
    </ul>;





    return <div className="about-page">
        {titleBody}
        {ul}
    </div>
}

export default About;