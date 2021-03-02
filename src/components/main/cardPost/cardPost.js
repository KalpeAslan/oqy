import React, {useEffect} from 'react';
import getPostBodyByLang from '../bodyTranslate.js'
import './cardPost.css';




function CardPost(props) {
    const { postBody } = props;
    let body = Boolean(postBody.isHtml) ? <p className="card-text blog-card-body" dangerouslySetInnerHTML={{__html:postBody.body}}></p> :  <p className="card-text blog-card-body" >{postBody.body}</p>
   
    useEffect(()=>{
        props.setPostBody(getPostBodyByLang(props.isKz,props.postBodyOrig))
    },[])
    const card = <div className="blog-post-card-parent">
        <div className='card blog-post-card-open'>
            <img className="card-img-top" src={postBody.img} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">{postBody.title}</h5>
                <p className="card-text">{postBody.desc}</p>
                {body}
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{postBody.tags}</li>
                <li className="list-group-item">{postBody.time}</li>
            </ul>
            <div className="card-body">
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
        </div>
    </div>
   
    return card
}
export default CardPost;