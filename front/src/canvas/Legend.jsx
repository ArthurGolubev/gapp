import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_GRAPH } from '../gql/query'

const Legend = () => {

    const { data } = useQuery(GET_ALL_GRAPH)
    let nodeTypes = []
    if(data){
        data.getDb.nodes.forEach(node => {
            let type = node.properties['Тип']
            if(!nodeTypes.includes(type)){
                nodeTypes.push(type)
            }
        })
        console.log('nodeTypes ->', nodeTypes)
    }
    return <div className='card'>
        <div className='card-body'>
            <ol>
                
            </ol>
        </div>
    </div>
}

export default Legend