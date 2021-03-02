import'./error.css';
import img from './mirage-page-not-found.png'



export default function Error(props){
    return <div className="container-error-page">
    <img src={img} alt=""/>
<h1>{props.strings.error}</h1>
</div>
}