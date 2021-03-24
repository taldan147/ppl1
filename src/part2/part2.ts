import { assert } from "chai";
import * as R from "ramda";
import { partialRight } from "ramda";
import { splitWhen } from "ramda";

const stringToArray = R.split("");

//for question 1

const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];

const countVowelsPipe = R.pipe(
    R.map((a: string) => vowels.includes(a) ? 1 : 0),
    R.reduce((acc: number, curr: number) => acc + curr, 0));

//for question 2

const mapToCounts = (orig : string[], counts : number[]) : number[] =>{
    if (orig.length===0)
        return counts;
    const newCounts = R.append(R.reduceWhile((acc : number, a : string) => a ===orig[0], R.inc, 0, orig), counts);
    return mapToCounts(R.remove(0, newCounts[newCounts.length-1], orig), newCounts);
};

//for question 3

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


/* Question 1 */
export const countVowels = (str: string): number => {
    return countVowelsPipe(stringToArray(str));
};

/* Question 2 */
export const runLengthEncoding = (str: string): string => {
    //drops the uniques and counts how many of each letterare in a row (maptoCounts)
    //then zips the arrays together
    //then unnests them and then filters and joins
    //the filter makes sure if there was only one letter repeating to not include it's count
    //and finally returns
    return R.join('',R.unnest(R.zip(R.dropRepeats(stringToArray(str)),mapToCounts(stringToArray(str), [])))
        .filter((a: string | number) => typeof (a) !== 'number' || a !== 1));

};

/* Question 3 */
export const isPaired = (str : string) : boolean => {
    return isPairedRecursion(stringToArray(str).filter((a : string)=> isParentheses(a)), [], 0);
};