import axios from 'axios';


const blogApi = async (from,tags=[])=>{
    const url = 'http://localhost:4000/blog/card';
    try{
        const card = await axios.post(url,JSON.stringify(from))
                    .then(data=>data)
                    .catch(e=>console.log(e));
        console.log(card)
        if(!card.data) return [];
        return card.data;
    } catch(e){
        console.log(e);
    }
}
export default blogApi;