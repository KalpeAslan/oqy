import img from './clip-distance-education.png';
import './study.css'
function Study(props){
    return <div className="container-study-page">
        <img src={img} alt=""/>
        <h1>{props.strings.studyPage}</h1>
    </div>
}
export default Study;