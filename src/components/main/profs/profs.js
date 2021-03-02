import img from './flame-graduation.png';
import './profs.css';

export default function Profs(props){
    return <div className="container-profs-page">
    <img src={img} alt=""/>
<h1>{props.strings.profsPage}</h1>
</div>
}