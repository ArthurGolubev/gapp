import { useMutation, useReactiveVar } from '@apollo/client'
import React from 'react'
import { REMOVE_LINK } from '../gql/mutations'
import { linkToRemove } from '../reactiveVariables/rVar'
import Node from './Node'


const RemoveLink = () => {

    const linkToRemoveSub = useReactiveVar(linkToRemove)
    const [removeLink] = useMutation(REMOVE_LINK)
    
    return <div>
        {/* {linkToRemoveSub?.id && <Node node={linkToRemoveSub} />} */}
        <button type='button' className='btn btn-success btn-success-sm'
            onClick={()=>removeLink({variables: {linkId: linkToRemoveSub.id}})}
        >REMOVE</button>
    </div>
}

export default RemoveLink