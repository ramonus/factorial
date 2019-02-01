class Patron{
    constructor(gen){
        this.input_generators = null;
        if(Array.isArray(gen)){
            //if it is an array of generators
            this.input_generators = gen;
        }else{
            this.input_generators = [gen];
        }
        this.relation_definition = this._def_rel();
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
        return relation_definition;
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

var p = new Patron(["D=AB","E=AC"]);
console.log("Relació de definició:",p.relation_definition_str());
// simplify("abdsbade");