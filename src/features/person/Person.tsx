import {BaseSyntheticEvent, HTMLInputTypeAttribute, InputHTMLAttributes, SyntheticEvent, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCount, add} from "./personSlice";

export function Person(){
    const personSlice = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const [person,setPerson] = useState({
        nome:'',
        idade:0
    });
    const nome = useRef<HTMLInputElement>(null);
    const savePerson = ()=>{
        dispatch(add(person))
        clearInputs()
        nome.current?.focus()
    }
    const handleInputChange = (e:BaseSyntheticEvent)=>{
        const {name,value} = e.target;
        setPerson({...person,[name]:value});
    }
    const clearInputs = ()=>{
       setPerson({nome:'',idade:0})
    }
    return(
        <div>
            <input name="nome" value={person.nome} onChange={handleInputChange} ref={nome}/>
            <input name="idade" value={person.idade} onChange={handleInputChange}/>
            <input type="submit" value={'Salvar'} onClick={savePerson}/>
                    <table>
                        <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                        </tr>
                        </thead>
                        <tbody>
            {
                personSlice.map(x=>
                            <tr>
                                <td>{x.nome}</td>
                                <td>{x.idade}</td>
                            </tr>)}
                </tbody>
                </table>
        </div>
    )
}