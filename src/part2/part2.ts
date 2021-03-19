import { assert } from "chai";
import * as R from "ramda";
import { splitWhen } from "ramda";

const stringToArray = R.split("");

const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];

const notEqual= (value:string) => R.compose(R.not,R.equals(value));
 
const isVowel = (char : string) : boolean =>{
    return vowels.filter((a)=>a===char).length === 0 ? false : true;
};

const mapToCounts = (orig : string[], counts : number[]) : number[] =>{
    if (orig.length===0)
        return counts;
    const newCounts = R.append(R.reduceWhile((acc : number, a : string) => a ===orig[0], R.inc, 0, orig), counts);
    return mapToCounts(R.remove(0, newCounts[newCounts.length-1], orig), newCounts);
};



/* Question 1 */
export const countVowels = (str : string):number =>{
    return stringToArray(str).map((a : string) => isVowel(a) ? 1 : 0).reduce((acc : number,curr : number)=> acc + curr, 0);
} ;

/* Question 2 */
export const runLengthEncoding = (str : string):string =>{
    const strArr = stringToArray(str);
    const uniqStrings = R.dropRepeatsWith(R.equals, strArr);
    // const shit=R.zip(uniqStrings, mapToCounts(strArr, []));
    // console.log(shit);
    // const shit3=R.unnest(shit);
    // console.log(shit3);
    // const shit2=shit3.filter((a:any)=> typeof(a) ==="number"?a=a.toString():a=a);
    // console.log(shit2);
    // console.log(R.join(shit2));
    // return R.join(shit2);
    const g = R.join('',R.unnest(R.zip(uniqStrings, mapToCounts(strArr, []))).filter((a : string | number)=> typeof(a)!=='number' || a!==1))
    console.log(g);
    return g;
};

/* Question 3 */
export const isPaired = undefined;