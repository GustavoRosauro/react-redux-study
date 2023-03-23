import { BaseSyntheticEvent, HTMLInputTypeAttribute, InputHTMLAttributes, SyntheticEvent, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCount, add, PersonState, remove } from "./personSlice";
import {Table,Space} from 'antd'
import { ColumnsType } from "antd/es/table";
import Column from "antd/es/table/Column";

export function Person() {
    const personSlice = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const [person, setPerson] = useState({
        nome: '',
        idade: 0
    });
    const nome = useRef<HTMLInputElement>(null);
    const savePerson = () => {
        dispatch(add(person))
        clearInputs()
        nome.current?.focus()
    }
    const DeleteRow = (nome:string)=>{
        dispatch(remove(nome));
    }
    const handleInputChange = (e: BaseSyntheticEvent) => {
        const { name, value } = e.target;
        setPerson({ ...person, [name]: value });
    }
    const clearInputs = () => {
        setPerson({ nome: '', idade: 0 })
    }
    const colums: ColumnsType<PersonState> = [
        {
            title:'Name',
            dataIndex:'nome',
            key:'nome'
        },
        {
            title:'Age',
            dataIndex:'idade',
            key:'idade'
        },
        {
            title:"Action",
            key:'action',
            render:(_:any,record:any)=>(
                <Space size='middle'>
                    <a onClick={() => DeleteRow(record.nome)}>Delete</a>
                </Space>
            )

        }
    ]
    return (
        <div>
            <input name="nome" value={person.nome} onChange={handleInputChange} ref={nome} />
            <input name="idade" value={person.idade} onChange={handleInputChange} />
            <input type="submit" value={'Salvar'} onClick={savePerson} />
            <Table columns={colums} dataSource={personSlice}/>
        </div>
    )
}