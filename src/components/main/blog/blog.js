import React, { useState, useEffect } from 'react';
import Link from 'react-router-dom/Link';
import cn from 'classnames';
import './blog.css';
import blogApi from './blogApi.js';





function Blog(props) {

    const [posts, setPosts] = useState([]);

    const [isCardExists, setCardExists] = useState('none');
    const [hoverElem, setHoverElem] = useState('none');
    const [pages, setPages] = useState({ start: 0, end: 2 });
    const { strings } = props;

    const blogCardClick = async (limit) => {
        setCardExists('loading');
        const cardBody = await blogApi(limit);
        try {
            if (cardBody.length === 0) {
                setCardExists(false)
                setDbEmpty(true);
                return;
            }
            const postsBefore = posts;
            postsBefore.push(cardBody);
            setPosts(postsBefore.flat());
            props.setPostBody(cardBody);
            props.setPostBodyOrig(cardBody);
            setCardExists(true);
            setIsEnd(true);
        } catch (e) {
            console.log(e)
            window.location.pathname = '/error'
            return;
        }
    }
    const [isDbEmpty, setDbEmpty] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        blogCardClick(pages);
    }, [pages])

    window.addEventListener('scroll', (e) => {
        if (isEnd) return;
        const elem1 = document.documentElement.scrollHeight;
        const elem2 = document.documentElement.scrollTop;
        const eq = document.documentElement.clientHeight;

        if (elem1 - elem2 === eq) {
            setIsEnd(true);
            if (!isDbEmpty) {
                setPages({ start: pages.start + 2, end: pages.end + 2 });
            }
        }

    })


    const postCards = <div className="blog-post-cards">
        {props.postBody.map((postRaw, i) => {
            const postName = cn('card blog-post-card', {
                'blog-post-hover-active': i === hoverElem,
                'blog-post-hover-out': hoverElem.out && hoverElem.index === i
            });

            
            return <Link to={`/blog/${postRaw.id}`}>
                <div class={postName} onMouseOver={() => setHoverElem(i)} onMouseOut={() => setHoverElem({ out: true, index: i })}>
                    <img class="card-img-top" src={postRaw.img} alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">{props.isKz ? postRaw.titleKz : postRaw.titleRu}</h5>
                        <p class="card-text">{props.isKz ? postRaw.descKz :  postRaw.descRu}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Dapibus ac facilisis in</li>
                        <li class="list-group-item">Vestibulum at eros</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>
            </Link>
        })}
    </div>;

    const loading = <div className="spinner-border text-primary blog-spinner" role="status">
    </div>

    return <div className="blog-body">
        {isCardExists === 'loading' ? loading : null}
        {postCards}
    </div>
}

export default Blog;
