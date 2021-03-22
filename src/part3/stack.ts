import { State, bind } from "./state";
import * as R from "ramda";

export type Stack = number[];

export const push = (x : number) : State<Stack, undefined> =>{
    return (initialState : Stack)=>[R.prepend(x,initialState),undefined];
};

export const pop = (initialState : Stack) : [Stack, number]=>{
    return [R.remove(0,1,initialState),initialState[0]];
};

export const stackManip = (initialState : Stack) : [Stack, undefined] =>{
    return bind(pop, (x : number)=>bind(push(x*x), ()=>bind(pop,(y:number)=> push(x+y))))(initialState);
};