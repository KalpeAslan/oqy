
class ProfDB {
    constructor() {
        this.branches = [];
        this.profs = [];
        this.profsByBranches = [];
        this.subj = '';
        this.score = 95;
        this.db = {};
    }

    setAllBranches(dbFull, score) {
        let db = Object.keys(dbFull)[1];
        db = dbFull[db];
        this.db = db;
        this.branches = Object.keys(db);
        this.score = score;
    }

    getAllBranches() {
        return this.branches; //Object DB by subject
    }

    setSubject(subjects){
        const subjectsList =  ["ГеоБио", "Творч", "ФизМат", "БиоХим", "ГеоИст", "КазКЛит", "РусРЛит", 
                                "ИноИст", "КазЛит/РусЛит", "МатГео", "ИстЧоп", "ФизХим", "ГеоИно"];
        this.subj =  subjectsList.includes(subjects.full) ? subjects.full : subjects.reversed;
    }


    setProfsByBraches(chosenBranches, isQouta) {
        
        const res = chosenBranches.reduce((acc, branch, i) => {
            for (const codeIn in this.db[branch]) {
                const qoutaOrMin = isQouta ? 'minWithQuota' : 'min';
                for (const code in this.db[branch]) {
                    if (this.db[branch][code].quotes.length !== 0) {
                        for (const univerIn in this.db[branch][code].quotes) {
                            const key = Object.keys(this.db[branch][code].quotes[univerIn])[0];
                            const univer = this.db[branch][code].quotes[univerIn][key];
                            univer.name = univer.name.replace('[dot]','.')
                            if (Number(univer[qoutaOrMin]) <= this.score) {
                                if (acc[code] !== undefined) {
                                    acc[code].univers.push(univer);
                                } else {
                                    acc[code] = {
                                        code: this.db[branch][code].code,
                                        name: this.db[branch][code].name,
                                        minScores: [univer.min],
                                        minScoresWithQouta: [univer.minWithQuota],
                                        univers: [univer]
                                    };
                                }
                            }
                        }
                    } else {
                        if (Number(this.db[branch][code][qoutaOrMin]) <= Number(this.score)) {
                            acc[this.db[branch][code].code] = {
                                code: this.db[branch][code].code,
                                name: this.db[branch][code].name,
                                min: this.db[branch][code].min,
                                minWithQuota: this.db[branch][code].minWithQuota
                            }
                        }
                    }
                }
            }
            return acc;

        }, {});
        this.profsByBranches = res;
    }


    getProfsByBraches() {
        return this.profsByBranches;
    }

  


    setAllProfs(dbFull) {
        
        this.profs = dbFull;

        
    }

    getAllProfs() {
        return this.profs;
    }

    getFiltredProfs(chosenProfs, score, isQouta) {
        
        return chosenProfs.reduce((acc, prof) => {
            if(prof === undefined) return acc;
            const minScoreKey = isQouta ? 'minWithQuota' : 'min';
            if (prof.quotes.length !== 0) {
                const univers = prof.quotes;
                univers.forEach(univer => {
                    const key = Object.keys(univer)[0];
                    const minScore = univer[key][minScoreKey];
                    if (Number(minScore) <= score) {
                        if(acc.length === 0 || acc[acc.length-1].code !== prof.code){
                            const res = {
                                code: prof.code,
                                name: prof.name,
                                min: [],
                                minWithQuota: [],
                                univers: []
                            };
                            const key = Object.keys(univer)[0];
                            univer[key].name = univer[key].name.replace('[dot]','.');
                            res.univers.push(univer)
                            acc = [...acc, res]
                        } else {
                            acc[acc.length-1].min.push(univer[key].min);
                            acc[acc.length-1].minWithQuota.push(univer[key].minWithQuota);
                            acc[acc.length-1].univers.push(univer);
                        }
                    }
                });
            } else {
                if(Number(prof[minScoreKey]) <= score){
                    const res = {
                        code: prof.code,
                        name: prof.name,
                        min: prof.min,
                        minWithQuota: prof.minWithQuota,
                        univers: []
                    };
                    acc = [...acc,res];
                }
            }
            return acc;
        }, [])
       
    }


}
export default new ProfDB();