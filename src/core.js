
const f = (runs,resolution) => {return {runs,resolution}};

export const available_designs = {
    2: [f(4,"full")],
    3: [f(4,"III"),f(8,"full")],
    4: [f(8,"IV"),f(16,"full")],
    5: [f(8,"III"),f(16,"V"),f(32,"full")],
    6: [f(8,"III"),f(16,"IV"),f(32,"VI"),f(64,"full")],
    7: [f(8,"III"),f(16,"IV"),f(32,"IV"),f(64,"VII"),f(128,"full")],
    8: [f(16,"IV"),f(32,"IV"),f(64,"V"),f(128,"VIII")],
    9: [f(16,"III"),f(32,"IV"),f(64,"IV"),f(128,"VI")],
    10: [f(16,"III"),f(32,"IV"),f(64,"IV"),f(128,"V")],
    11: [f(16,"III"),f(32,"IV"),f(64,"IV"),f(128,"V")],
    12: [f(16,"III"),f(32,"IV"),f(64,"IV"),f(128,"IV")],
    13: [f(16,"III"),f(32,"IV"),f(64,"IV"),f(128,"IV")],
    14: [f(16,"III"),f(32,"IV"),f(64,"IV"),f(128,"IV")],
    15: [f(16,"III"),f(32,"IV"),f(64,"IV"),f(128,"IV")],
};
export var getDesignData = (factors,options) => {
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
    const nruns = options.runs;
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
export var calc_main_effects = (data) => {
    let effects = {};
    for(let i=0;i<data.length;i++){
        let d = data[i];
        let cfi = 0;
        const k = Object.keys(d);
        while(k.indexOf(words[cfi])>-1){
            if(!effects[words[cfi]]){
                effects[words[cfi]] = 0;
            }
            effects[words[cfi]] += parseInt(""+d[words[cfi]])*parseFloat(""+d.response)/4;
            cfi++;
        }
    }
    return effects;
}
export const words = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";