
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