import { useMutation, useReactiveVar } from '@apollo/client'
import React, { useState } from 'react'
import { EDIT_LINK } from '../gql/mutations'
import { linkToEdit } from '../reactiveVariables/rVar'

const EditLink = () => {

    const linkToEditSub = useReactiveVar(linkToEdit)
    const [editLink] = useMutation(EDIT_LINK)
    console.log('linkToEditSub ->', linkToEditSub)
    const [state, setState] = useState()
    const send = (index, oldProp) => {
        let attr = document.querySelector("#key-"+index).value
        let value = document.querySelector("#value-"+index).value
        editLink({
            variables: {
                linkId: linkToEditSub.id,
                oldProp: oldProp,
                attr: attr,
                value: value
            }
        })
        setState("")
    }
    return <div className='col-3'>
        <div className='card'>
            <div className='card-header'>
                { linkToEditSub.linkLabel }
            </div>
            <div className='card-body'>
                <div className='input-group mb-3'>
                    <input
                        type="text"
                        className="form-control mb-2"
                        value={linkToEditSub.linkLabel}
                        onChange={(e)=>linkToEdit({...linkToEditSub, linkLabel: e.target.value})}
                    />
                    {
                        linkToEditSub.properties && Object.entries(linkToEditSub.properties).map((p, index) => {
                            return <div className='input-group' key={index}>
                                <input type="text" defaultValue={p[0]} class="form-control" 
                                    id={"key-"+index} disabled={state?.edit !== index} />
                                <input type="text" defaultValue={p[1]} class="form-control"
                                    id={"value-"+index} disabled={state?.edit !== index} />
                                    {
                                        state?.edit == index ? (
                                            <button type="button" className="btn btn-outline-secondary" onClick={() => send(index, p[0])}>save</button>
                                        ) : (
                                            <button type="button" className="btn btn-outline-secondary" onClick={() => setState({edit: index})}>edit</button>
                                        )
                                    }
                                
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
        <button onClick={()=>console.log(linkToEditSub)}>state 2</button>
        <button onClick={()=>console.log("send")}>send</button>
    </div>

}

export default EditLink