import { useMutation, useReactiveVar } from '@apollo/client'
import React from 'react'
import { REMOVE_NODE } from '../gql/mutations'
import { nodeToRemove } from '../reactiveVariables/rVar'
import Node from './Node'


const RemoveNode = () => {

    const nodeToRemoveSub = useReactiveVar(nodeToRemove)
    const [removeNode] = useMutation(REMOVE_NODE)    
    
    return <div>
        {nodeToRemoveSub?.id && <Node node={nodeToRemoveSub} />}
        <button type='button' className='btn btn-success btn-success-sm'
            onClick={()=>removeNode({variables: {nodeId: nodeToRemoveSub.id}})}
            // onClick={()=>console.log(nodeToRemoveSub)}
        >REMOVE</button>
    </div>
}

export default RemoveNode