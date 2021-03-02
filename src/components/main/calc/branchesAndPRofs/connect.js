import axios from 'axios';

const url = 'http://localhost:4000/';
class Connect{
    constructor(url){
        this.branches = [];
        this.profs = [];
        this.grants = [];
        this.url = url;
    }

    async setBranches(subjects){
        const uri = this.url + 'branches/postBranches';
        this.result = false
        await axios.post(uri,subjects)
        .then(data=>{
            this.branches = data.data;
            console.log('setted');
            this.result = true;
        })
        .catch(e=>{
            console.log(e)
            return false
        })
        return this.result;
    }

    getBranches(){
        return this.branches;
    }

    async setProfs(subjects){
        const uri = this.url + 'profs/postProfs';
        this.result = false

        await axios.post(uri,subjects)
        .then(data=>{
            this.profs = data.data;
            this.result = true;
        })
        .catch(e=>{
            console.log(e)
            return false
        })
        return this.result;
    }

    getProfs(){
        return this.profs;
    }

  

    async getGrantsByProfs(profs,score){
        const uri = this.url + '';
        const result = {
            profs,
            score
        }
        axios.get(uri,result)
        .then(data=>{
            this.grants = data.data;
        })
        .catch(e=>{
            console.log(e)
        })
        return await this.grants;
    }

}


export default new Connect(url);