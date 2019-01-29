var getDesignData = (factors,options) => {
    let data = [];
    const sample = (n) => {
        let r = [];
        for(let i=0;i<n;i++){
            r.push(-1);
        }
        for(let i=0;i<n;i++){
            r.push(1);
        }
        return r;
    }
    const nruns = options.nruns;
    let coef = factors-Math.log(nruns)/Math.log(2);
    for(let i=0;i<nruns;i++){
        let obj = {n:i};
        for(let j=0;j<factors-coef;j++){
            let s = sample(2**j);
            let next = s[i%s.length];
            obj[words[j]]=next;
        }
        data.push(obj);
    }
    return data;
}
const words = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
module.exports = {
    getDesignData,
    words,
};