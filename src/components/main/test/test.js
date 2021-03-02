import './test.css';
import img from './clip-school-meditation.png'

export default function Test(props){
    return <div className="container-test-page">
            <img src={img} alt=""/>
<h1>{props.strings.testPage}</h1>
        </div>
}