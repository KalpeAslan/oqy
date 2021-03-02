import img from './college-students-university-education-concept-people-illustration_169479-534.webp';
import './univers.css';

export default function Univers(props){
    return <div className="container-univers-page">
    <img src={img} alt=""/>
<h1>{props.strings.universPage}</h1>
</div>
}