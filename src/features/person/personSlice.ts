import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export interface PersonState{
    person:{nome:string,idade:number},
    listPerson:Array<any>;
} 
export const selectCount = (state: RootState) => state.person.listPerson;
export const initialState:PersonState = {
    person:{nome:'',idade:0},
    listPerson:new Array<any>()
}
export const listPerson:Array<any> = new Array<any>()

export const personSlice = createSlice({
    name:'person',
    initialState,
    reducers:{
        add: (state,action) =>{
            state.person.nome = action.payload.nome
            state.person.idade = action.payload.idade
            state.listPerson.push(state.person)
        },
        remove:(state,action)=>{
            state.listPerson = state.listPerson.filter(x => x.nome != action.payload)
        }
    }
})
export const {add, remove} = personSlice.actions
export default personSlice.reducer