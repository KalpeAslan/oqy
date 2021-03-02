import math from '../icons/Математика.svg';
import phys from '../icons/Физика.svg';
import geog from '../icons/География.svg';
import chem from '../icons/Химия.svg';
import biol from '../icons/Биология.svg';
import eng from '../icons/Ағылшын тілі.svg';
import hist from '../icons/Дүниежүзі тарихы.svg';
import russian from '../icons/Орыс тілі.svg';
import rusL from '../icons/Орыс әдебиеті.svg';
import kazL from '../icons/Қазақ әдебиті.svg';
import kaz from '../icons/Қазақ тілі.svg';
import law from '../icons/Адам.Қоғам.Құқық.svg';
import creat from '../icons/Шығармашылық емтихан.svg';








const subjAll = (lang)=>{
    return  {
        math: {
            name: 'Математика' ,
            short: 'Мат',
            share: ['Физ','Гео'],
            icon: math
        },
        physics: {
            name: 'Физика',
            short: 'Физ',
            share: ['Мат','Хим'],
            icon:phys
        },
        geography: {
            name: 'География',
            short: 'Гео',
            share: ['Мат','Био','Ист','Ино'],
            icon:geog
        },
        chemistiry: {
            name: 'Химия',
            short: 'Хим',
            share: ['Физ','Био'],
            icon:chem
        },
        bio: {
            name: 'Биология',
            short: 'Био',
            share: ['Хим','Гео'],
            icon:biol
        },
        eng: {
            name: lang === 'kz' ? 'Ағылшын тілі' : 'Английский язык',
            short: 'Ино',
            share: ['Ист','Гео'],
            icon:eng
        },
        hist: {
            name: lang === 'kz' ? 'Дүниежүзі тарихы' :  'Всемирная история',
            short: 'Ист',
            share: ['Гео','Чоп','Ино'],
            icon:hist
        },
        russian: {
            name: lang === 'kz' ? 'Орыс тілі' : 'Русский язык',
            short: 'Рус',
            share: ['РЛит'],
            icon:russian
        },
        russianLit: {
            name: lang === 'kz' ? 'Орыс әдебиеті' : 'Русская литература',
            short: 'РЛит',
            share: ['Рус'],
            icon:rusL
        },
        kazakhLit: {
            name: lang === 'kz' ? 'Қазақ әдебиті' : 'Казахская литература',
            short: 'КЛит',
            share: ['Каз'],
            icon:kazL
        },
        kazakh: {
            name: lang === 'kz' ? 'Қазақ тілі' : 'Казахский язык',
            short: 'Каз',
            share: ['КЛит'],
            icon: kaz
        },
        law: {
            name: lang === 'kz' ? 'Адам.Қоғам.Құқық' : 'Человек.Общество.Право' ,
            short: 'Чоп',
            share: ['Ист'],
            icon: law
        },
        creative: {
            name: lang === 'kz' ? 'Шығармашылық емтихан' : 'Творческий экзамен',
            short: 'Творч',
            share: ['Творч'],
            icon: creat
        }
    };
}

export default subjAll;