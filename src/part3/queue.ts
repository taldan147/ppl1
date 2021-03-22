import { State, bind } from "./state";
import * as R from "ramda";

export type Queue = number[];

export const enqueue = (x : number) : State<Queue, undefined> =>{
    return (initialState : Queue)=>[R.append(x,initialState),undefined];
};

export const dequeue = (initialState : Queue) : [Queue, number]=>{
    return [R.remove(0,1,initialState),initialState[0]];
};

export const queueManip = (initialState : Queue) : [Queue, number] =>{
    return dequeue(bind(dequeue, (x : number) => bind(enqueue(x*2), ()=>enqueue(x/3)))(initialState)[0])
};