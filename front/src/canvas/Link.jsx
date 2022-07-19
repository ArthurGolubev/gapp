import { useMutation, useReactiveVar } from '@apollo/client'
import React, { useState } from 'react'
import { ADD_LINK } from '../gql/mutations'
import { possibleLinkNames, sourceNode, targetNode } from '../reactiveVariables/rVar'
import AttrTable from './AttrTable'
import ExtraAttr from './ExtraAttr'

const Link = () => {

    const possibleLinkNamesSub = useReactiveVar(possibleLinkNames)
    const sourceNodeSub = useReactiveVar(sourceNode)
    const targetNodeSub = useReactiveVar(targetNode)
    const [addLinkMutation] = useMutation(ADD_LINK)
    // TODO Запрос на получения всех линков у нода-источника и нода-цели - добавить в select
    
    // TODO Создать связь, протестировать сам механизм
    const [state, setState] = useState({
        selectedLinkName: '',
        customLinkName: '',
        extraAttribute: [],
        validation: ' '
    })

    

    const checkValidAndSand = () => {
        let linkName = state.customLinkName || state.selectedLinkName
        if(linkName){
            addLinkMutation({variables: {
                sourceId: sourceNodeSub.id,
                targetId: targetNodeSub.id,
                linkName: state.customLinkName ? state.customLinkName : state.selectedLinkName,
                extraAttr: state.extraAttribute
            }})
            setState({
                selectedLinkName: '',
                customLinkName: '',
                extraAttribute: [],
                validation: ' '
            })
            document.querySelector("#link-name").value = -1 
            document.querySelector("#custom-link-name").value = ''
        } else {
            setState({
                ...state,
                validation: " is-invalid",
            })
        }
    }



    return <div className='card'>
        <div className='card-header'>

            <div className='col'>
                {/* link name select */}
                <select defaultValue="-1" className='form-select form-select-sm mt-1' disabled={state?.customLinkName} id="link-name"
                    onChange={e => setState({...state, selectedLinkName: possibleLinkNamesSub[e.target.value]})} >
                    <option value={-1}>Доступные связи...</option>
                    { possibleLinkNamesSub.length > 0 && possibleLinkNamesSub.map((item, index) => <option value={index}>{item}</option>)}
                </select>
            </div>
        
            <div className='col-2'>
                либо
            </div>
        
            <div className='col'>
                {/* node label input */}
                <div className='input-group input-group-sm mt-1'>
                    <input type='text' className={'form-control' + state.validation.link} placeholder='Введите название связи...' id="custom-link-name"
                        onChange={e => setState({...state, customLinkName: e.target.value})}
                    />
                </div>
            </div>
        </div>


        
        {/* 2. Дополнительные аттрибуты связи */}
        <ExtraAttr state={state} setState={setState} />
        {state.extraAttribute.length > 0 && <AttrTable extraAttr={state?.extraAttribute} />}


        <button className='btn btn-succes btn-success-sm' onClick={()=>checkValidAndSand()}>ADDLINK</button>
    </div>
}

export default Link