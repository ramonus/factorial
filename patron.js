
const words = "ABCDEFGHJKLMNOPQRST";
class Patron{
    constructor(gen){
        this.input_generators = null;
        if(Array.isArray(gen)){
            //if it is an array of generators
            this.input_generators = gen.map(el => el.toUpperCase());
        }else if(typeof gen==='string'){
            this.input_generators = [gen.toUpperCase()];
        }
        this.relation_definition = this._def_rel();
        this.depending_factors = this._get_depending_factors();
    }
    _get_depending_factors(){
        let depending = [];
        for(let i=0;i<this.input_generators.length;i++){
            depending.push(this.input_generators[i].split("=")[0]);
        }
        return depending;
    }
    relation_definition_str(){
        return ["I",...this.relation_definition].join("=");
    }
    _def_rel(){
        let relation_definition = [];
        for(let i=0;i<this.input_generators.length;i++){
            let g = this.input_generators[i];
            let a = g.split("=");
            let b = a[1];
            a = a[0];
            //a=b
            //I=ab
            relation_definition.push(simplify(a+b));
        }
        let all_rel = simplify(relation_definition.join(""));
        if(relation_definition.indexOf(all_rel)==-1){
            relation_definition.push(all_rel);
        }
        return relation_definition;
    }
    _get_max_factor(){
        let max_factor = "A";
        for(let i=0;i<this.relation_definition.length;i++){
            let gen = this.relation_definition[i];
            for(let j=0;j<gen.length;j++){
                if(words.indexOf(gen[j])>words.indexOf(max_factor)){
                    max_factor = gen[j];
                }
            }
        }
        return max_factor;
    }
    _combinations(str){
        let combinations = [];
        for(let i=0;i<str.length;i++){
            for(let j=i;j<str.length;j++){
                let el = simplify(str[i]+str[j]);
                if(el!="I"){
                    combinations.push(el);
                }
            }
        }
        return combinations;
    }
    resolution(){
        return Math.min(...this.relation_definition.map(it=>it.length));
    }
    _main_confusions(){
        let main_confusions = [];
        const max_factor = this._get_max_factor();
        let curr_factor = "A";
        while(words.indexOf(curr_factor)<=words.indexOf(max_factor)){
            let confusions = this._confusions(curr_factor);
            let ci = this.depending_factors.indexOf(confusions[0]);
            if(confusions!=null&ci==-1){
                main_confusions.push(confusions);
            }
            curr_factor = words[words.indexOf(curr_factor)+1];
        }
        return main_confusions;
    }

    _two_factor_confusions(){
        let tfconfusions = [];
        const str = words.slice(0,Math.min(...this.depending_factors.map(e=>words.indexOf(e))));
        const combinations = this._combinations(str);
        for(let i=0;i<combinations.length;i++){
            let confusions = this._confusions(combinations[i]);

            tfconfusions.push(confusions);
        }
        return tfconfusions;
    }
    _contains_factors(str,facts){
        for(let i=0;i<facts.length;i++){
            let letter = facts[i];
            if(str.indexOf(letter)>-1){
                return true;
            }
        }
        return false;
    }
    _confusions(facts){
        let confusions = [simplify(facts)];
        for(let i=0;i<this.relation_definition.length;i++){
            let confu = simplify(facts+this.relation_definition[i]);
            if(!this._contains_factors(confu,facts)){
                confusions.push(confu);
            }
        }
        if(confusions.length>1){
            return confusions;
        }
        return null;
    }
}
const simplify = (s) => {
    let ns = s.toUpperCase();
    ns = ns.split("").sort().join("");
    let fs = "";
    let last_letter = ns[0];
    let same_letter_count = 1;
    let ci = 1;
    while(ci<ns.length){
        if(ns[ci]==last_letter){
            same_letter_count++;
        }else{
            if(same_letter_count%2==0){
                // si és parell
                fs += "I";
            }else{
                // si és imparell
                fs += last_letter;
            }
            same_letter_count = 1;
            last_letter = ns[ci];
        }
        ci++;
    }
    if(same_letter_count%2==0){
        // si és parell
        fs += "I";
    }else{
        // si és imparell
        fs += last_letter;
    }
    // netejem les I si existeix algun terme != I
    for(let i=0;i<fs.length;i++){
        if(fs[i]!="I"){
            while(fs.indexOf("I")>-1){
                fs = fs.replace("I","");
            }
            break;
        }
    }
    return fs;
}

var p = new Patron([
    "F=ABC",
    "G=ADE",
]);
console.log("Relació de definició:","\n\t"+p.relation_definition_str());
console.log("Resolució:",p.resolution());
console.log("Confusions:");
p._main_confusions().forEach(it => {
    console.log("\t"+it.join("+"));
});
p._two_factor_confusions().forEach(it => {
    console.log("\t"+it.join("+"));
});
// simplify("abdsbade");