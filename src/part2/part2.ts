import { assert } from "chai";
import * as R from "ramda";
import { partialRight } from "ramda";
import { splitWhen } from "ramda";

const stringToArray = R.split("");

const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];

const notEqual= (value:string) => R.compose(R.not,R.equals(value));
 
const isVowel = (char : string) : boolean =>{
    return vowels.filter((a)=>a===char).length === 0 ? false : true;
};





/* Question 1 */
export const countVowels = (str : string):number =>{
    return stringToArray(str).map((a : string) => isVowel(a) ? 1 : 0).reduce((acc : number,curr : number)=> acc + curr, 0);
} ;

const mapToCounts = (orig : string[], counts : number[]) : number[] =>{
    if (orig.length===0)
        return counts;
    const newCounts = R.append(R.reduceWhile((acc : number, a : string) => a ===orig[0], R.inc, 0, orig), counts);
    return mapToCounts(R.remove(0, newCounts[newCounts.length-1], orig), newCounts);
};

/* Question 2 */
export const runLengthEncoding = (str : string):string =>{
    const strArr = stringToArray(str);
    const uniqStrings = R.dropRepeats(strArr);
    const g = R.join('',R.unnest(R.zip(uniqStrings, mapToCounts(strArr, []))).filter((a : string | number)=> typeof(a)!=='number' || a!==1))
    return g;
};


const parentheses = ['{', '}', '(', ')', '[', ']'];

const isParentheses = (char : string) : boolean =>{
    return parentheses.filter((a)=>a===char).length === 0 ? false : true;
};

const isPair = (left : string ,right: string) : boolean =>{
    return left ==='{' ? right === '}' ? true : false : left ==='[' ? right === ']' ? true : false : left ==='(' ? right === ')' ? true : false: false;
}

const isOpen = (bracket : string) : boolean =>{
    return bracket ==='{' || bracket ==='[' || bracket ==='(';
}

const isPairedRecursion = (parArr : string[], myStack : string[], ind : number) : boolean =>{
    if (ind === parArr.length)
        return myStack.length !==0 ? false : true;
    if (isOpen(parArr[ind]))
        return isPairedRecursion(parArr, R.append(parArr[ind], myStack), ind+1);
    return myStack.length===0 ? false : isPair(myStack[myStack.length-1],parArr[ind]) && isPairedRecursion(parArr, R.remove(myStack.length-1,1, myStack), ind+1);
}

/* Question 3 */
export const isPaired = (str : string) : boolean => {
    const parArr = stringToArray(str).filter((a : string)=> isParentheses(a));
    return isPairedRecursion(parArr, [], 0);
};