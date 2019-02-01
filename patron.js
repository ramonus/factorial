class Patron{
    constructor(gen){
        this.input_generators = null;
        if(Array.isArray(gen)){
            //if it is an array of generators
            this.input_generators = gen;
        }else{
            this.input_generators = [gen];
        }
    }
    _def_rel(){
        for(let i=0;i>this.input_generators.length;i++){
            let g = this.input_generators[i];
            let a = g.split("=");
            let b = a[1];
            a = a[0];
            //a=b
            //I=ab
        }
    }
}
const simplify = (s) => {
    let ns = s.toUpperCase();
    ns = ns.split("").sort().join("");
    let fs = "";
    for(let i=0;i<ns.length-1;i+=1){
        let a = ns[i],b = ns[i+1];
        if(a===b){
            fs += "I";
        }else{
            fs += a+b;
        }
    }
    console.log(fs);
}

// var p = new Patron(["D=AB","E=AC"]);
simplify("abdsbade");