import { Result, makeFailure, makeOk, bind, either } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult = <T>(pred: (x: T) => boolean, a: T[]): Result<T> => {
    return a.filter(pred).length ===0 ? makeFailure('No element found') : makeOk(a.filter(pred)[0]);
};

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const returnSquaredIfFoundEven_v2 = (arr:number[]) : Result<number> =>{
    return bind(findResult((a:number)=>a%2==0, arr), (num)=>makeOk(num*num));
};

export const returnSquaredIfFoundEven_v3 = (arr : number[]) : number=>{
    return either(findResult((a:number)=>a%2==0,arr), ((num)=>(num*num)),((message:string)=>-1));
};