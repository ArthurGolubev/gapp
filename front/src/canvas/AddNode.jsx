import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_NODE } from '../gql/mutations'
import { GET_LIST_NODE_LABELS } from '../gql/query'
import ExtraAttr from './ExtraAttr'
import AttrTable from './AttrTable'


const AddNode = () => {
    const {data: labels} = useQuery(GET_LIST_NODE_LABELS)
    const [addNodeMutation, { data, error}] = useMutation(ADD_NODE)
    const [state, setState] = useState(
        {
            nodeLabel: '',
            customNodeLabel: '',
            nodeName: '',
            nodeType: '',
            extraAttribute: [],
            color: "#ff10ff",
            validation: {
                label: "",
                name: "",
                type: ""
            }
        }
    )

    const checkValidAndSand = () => {
        let valid = true

        let label = state.nodeLabel || state.customNodeLabel
        let name = state.nodeName
        let type = state.nodeType


        
        if(label && name && type){
            addNodeMutation({variables: {
                nodeLabels: state.customNodeLabel ? state.customNodeLabel : state.nodeLabel,
                nodeName: state.nodeName,
                nodeType: state.nodeType,
                extraAttr: state.extraAttribute
            }})
            setState({
                nodeLabel: '',
                customNodeLabel: '',
                nodeName: '',
                nodeType: '',
                extraAttribute: [],
                color: "#ff10ff",
                validation: {
                    label: "",
                    name: "",
                    type: ""
                }
            })
            document.querySelector("#node-label").value = -1 
            document.querySelector("#custom-node-label").value = ''
            document.querySelector("#node-name").value = ''
            document.querySelector("#node-type").value = ''
        } else {
            setState({
                ...state,
                validation: {
                    label: label ? "" : " is-invalid",
                    name: name ? "" : " is-invalid",
                    type: type ? "" : " is-invalid"
                }
            })
        }
    }

    return <div>
        <div className='row'>
            <div className='col'>
                {/* node label select */}
                <select defaultValue="-1" className='form-select form-select-sm mt-1' disabled={state?.customNodeLabel} id="node-label"
                    onChange={e => setState({...state, "nodelabel": labels.getListNodeLabels[e.target.value]})} >
                    <option value={-1}>Выберите ярлык...</option>
                    { labels && labels.getListNodeLabels.map((label, index) => <option value={index}>{label}</option>) }
                </select>
            </div>
            <div className='col-2'>
                либо
            </div>
            <div className='col'>
                {/* node label input */}
                <div className='input-group input-group-sm mt-1'>
                    <input type='text' className={'form-control' + state.validation.label} placeholder='Введите новый ярлык...' id="custom-node-label"
                        onChange={e => setState({...state, "customNodeLabel": e.target.value})}
                    />
                </div>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                {/* node name */}
                <div className='input-group input-group-sm mt-1'>
                    <input className={'form-control' + state.validation.name} placeholder='Название нода' id="node-name"
                        value={state?.nodeName}
                        onChange={e => setState({...state, "nodeName": e.target.value})}
                    />
                </div>
            </div>
            <div className='col'>
                {/* node type */}
                <div className='input-group input-group-sm mt-1'>
                    <input className={'form-control' + state.validation.type} placeholder=' Тип нода' id="node-type"
                        value={state?.nodeType}
                        onChange={e => setState({...state, "nodeType": e.target.value})}
                    />
                </div>
            </div>

        </div>
        
        {/* Поле дополнительного атрибута */}
        <ExtraAttr state={state} setState={setState} />

        {/* Таблица дополнительных атрибутов */}
        { state.extraAttribute.length > 0 && <AttrTable extraAttr={state.extraAttribute} /> }


        <button className='btn btn-danger' onClick={() => checkValidAndSand()}>ADD</button>
        <button className='btn btn-success' onClick={() => console.log('state ->', state)}>state</button>
    </div>
}

export default AddNode