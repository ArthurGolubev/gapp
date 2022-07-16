import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_NODE } from '../gql/mutations'
import { GET_LIST_NODE_LABELS } from '../gql/query'


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

    const addExtraAttr = () => {
        let name = document.querySelector("#extraAttr-name")
        let value = document.querySelector("#extraAttr-value")
        setState({...state, extraAttribute: [...state.extraAttribute, {name: name.value, value: value.value} ]})
        name.value = ''
        value.value = ''
    }

    return <div>
        <div className='row'>
            <div className='col'>
                {/* node label select */}
                <select className='form-select form-select-sm mt-1' disabled={state?.customNodeLabel} id="node-label"
                    onChange={e => setState({...state, "nodelabel": labels.getListNodeLabels[e.target.value]})} >
                    <option selected value={-1}>Выберите ярлык...</option>
                    { labels && labels.getListNodeLabels.map((label, index) => <option value={index}>{label}</option>) }
                </select>
            </div>
            <div className='col-2'>
                либо
            </div>
            <div className='col'>
                {/* node label input */}
                <div className='input-group input-group-sm mt-1'>
                    <input type='text' className={'form-control' + state.validation.label} placeholder='Введите новый ярлык...' id="custom-node-label" invalid
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
        <p>Поле дополнительного атрибута</p>
        <div>
            <div className='row'>
                <div className='col'>
                    {/* add extra attribute */}
                    <div className='input-group input-group-sm'>
                        {/* <span className='input-group-text'></span> */}
                        <input className='form-control' placeholder='Название атрибута' type='text' id='extraAttr-name'/>
                        {/* <span className='input-group-text'></span> */}
                        <input className='form-control' placeholder='Значение атрибута' type='text' id='extraAttr-value'/>
                        <button className='btn btn-success btn-sm' type='button' onClick={()=>addExtraAttr()}>Добавить атрибут +</button>
                    </div>
                </div>
            </div>
        </div>
        {
            state.extraAttribute.length > 0 && <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Название Атрибута</th>
                            <th>Значение Атрибута</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state.extraAttribute.map((item, index) => {
                                return <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.value}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        }
        <button className='btn btn-success' onClick={() => checkValidAndSand()}>ADD</button>
        <button className='btn btn-success' onClick={() => console.log('state ->', state)}>state</button>
    </div>
}

export default AddNode