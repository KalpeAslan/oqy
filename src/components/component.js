import React, { useState,useEffect} from 'react';
import Navbar from './navbar/navbar.js';
import Main from './main/main.js';
import Footer from './footer/footer.js';
import cn from 'classnames';
import LocalizedStrings from 'react-localization';
import getPostBodyByLang from './main/bodyTranslate.js'

import './components.css'





function Component() {

    const strings = new LocalizedStrings({
        kz: {
            mainHeaderTittle: "Сіздің грантқа түсуге көмектесеміз.",
            mainHeaderDescriptio: "Бейіндік пәндеріңізді,балыңызды, грантқа түсетін орнын таңдаңыз",
            chosenSubjectsInputBranchesSubjects: "Пәнді таңда",
            backButtonSubjectIndexFirst: "Бірінші бейіндік пәніңді таңда",
            backButtonSubjectIndexSecond: "Екінші бейіндік пәніңді таңда",
            inputScore: "Өз баллыңды енгіз",
            inputScoreText: "ЕНТ балыңды енгіз",
            btnSuccess: "Келесі қадам",
            chosenDesc: "Сіз таңдаған пәндер",
            chosenDescScore: "Сіз алған балл",
            mainBranches: "Сала",
            mainProfs: "Мамандық",
            branchesIsEmpty: 'Басқа сала жоқ:(',
            profsIsEmpty: 'Басқа мамандық жоқ:(',
            formCheckLabel: "Ауыл квотасы",
            btnGetResult: "Қорытындыны көру",
            mainGrantsPagesHeaders: "Сіздің мамандық бойынша грантыныз",
            alert: '50-140 дейін енгізіңіз',
            calc: 'Грант табу',
            studyTitle: 'Дайындық',
            test: 'ҰБТ тест',
            professions: 'Мамандықтар',
            universities: 'Университеттер',
            about: 'Проект туралы',
            blogDesc: 'Пайдалы посттар',
            calcDesc: 'ҰБТға дайындық материалдар',
            studyTitleDesc: 'ҰБТға дайындық материалдар',
            testDesc: 'ҰБТ тест',
            professionsDesc: '175 мамандық туралы ақпарат',
            universitiesDesc: '196 университет турады ақпарат',
            studyPage:'Жақында грант алу одан есе жеңіл болады',
            testPage: 'Жақында ҰБТдан тест тапсыру одан есе жеңіл болады',
            profsPage: 'Жақында мамандық таңдау одан есе жеңіл болады',
            universPage: 'Жақында университет таңдау одан есе жеңіл болады',
            error: 'Белгісіз парақ'
        },
        ru: {
            mainHeaderTittle: "Поможем вам поступить на грант.",
            mainHeaderDescriptio: "Выберите профильные предметы,балл и место для поступления на грант",
            chosenSubjectsInputBranchesSubjects: "Выберите предметы",
            backButtonSubjectIndexFirst: "Выбери первый профильный предмет",
            backButtonSubjectIndexSecond: "Выбери второй профильный предмет",
            inputScore: "Введите свой балл",
            inputScoreText: "Введи баллы по ЕНТ",
            btnSuccess: "Следующий шаг",
            chosenDesc: "Выбранные предметы",
            chosenDescScore: "Ваш балл",
            mainBranches: "Отрасль",
            mainProfs: "Специальность",
            formCheckLabel: "Сельская квота",
            btnGetResult: "Получить результат",
            mainGrantsPagesHeaders: "Грант по вашей специальности",
            alert: 'Введите балл 50-140',
            calc: 'Найти грант',
            studyTitle: 'Подготовка',
            test: 'ЕНТ тест',
            professions: 'Специальности',
            universities: 'Университеты',
            about: 'О проекте',
            blogDesc: 'Полезные посты каждый день!',
            calcDesc: 'Проверь возможность поучения гранта',
            studyTitleDesc: 'Материалы для подготовки к ЕНТ',
            testDesc: 'Пробные тесты по ЕНТ',
            professionsDesc: 'Узнай о 175 спецальностей',
            universitiesDesc: 'Вся информация о 196 ВУЗах',
            studyPage:'Скоро получить грант станет еще легче',
            testPage: 'Скоро сдавать ЕНТ станет еще легче',
            profsPage: 'Скоро выбрать специальность станет еще легче',
            universPage: 'Скоро выбрать университет станет еще легче',
            error: 'Неизвестная страница'
        }
    });


    const [language, setLanguage] = useState('kz');
    const [hideFooter, setHideFooter] = useState(false);
    const [hideAnim, setHideAnim] = useState(false);
    const [isAlert, setALert] = useState(false);
    strings.setLanguage(language)

    const alertName = cn('alert alert-warning', {
        'show-alert': isAlert,
    });

    const alert = <div className={alertName} role="alert">
        {strings.alert}
    </div>

    const [isOutideActive,setOutsideActive] = useState(false);

    const [postBody, setPostBody] = useState([]);

    const [postBodyOrig,setPostBodyOrig] = useState([]);

    
    useEffect(()=>{
        const isKz = language === 'kz';
        setPostBody(getPostBodyByLang(isKz,postBodyOrig))
    },[language])



   
    return (
        <div>
            
            <Navbar strings={strings} setOutsideActive={setOutsideActive} setLanguage={setLanguage} />
            {isAlert ? alert : null}
            <Main postBodyOrig={postBodyOrig} setPostBodyOrig={setPostBodyOrig} setPostBody={setPostBody} postBody={postBody} isOutideActive={isOutideActive} strings={strings} isAlert={isAlert} setALert={setALert} hideAnim={hideAnim}
                    setHideAnim={setHideAnim} setHideFooter={setHideFooter} />
            {!hideFooter ? <Footer strings={strings}/> : null}
        </div>
    )
}

export default Component;