import React from 'react'
import { ForceGraph2D } from 'react-force-graph'
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client'
import { GET_ALL_GRAPH, GET_POSSIBLE_LINK_NAMES } from '../gql/query';
import { linkToEdit, linkToRemove, nodeToRemove, possibleLinkNames, selectNodeTo, sourceNode, targetNode } from '../reactiveVariables/rVar';

const Canva = () => {
    const { data, error } = useQuery(GET_ALL_GRAPH)
    const selectNodeToSub = useReactiveVar(selectNodeTo)
    

    const [getNodeLinks, ] = useLazyQuery(GET_POSSIBLE_LINK_NAMES, {onCompleted: data => possibleLinkNames(data.getPossibleLinkNames)})
    const selecteNode = (d) => {
        switch (selectNodeToSub) {
            case 'source':
                sourceNode(d)
                getNodeLinks({variables: {nodeId: d.id}})
                break;
            case 'target':
                targetNode(d)
                break;
            case 'remove-node':
                nodeToRemove(d)
                break;
            case 'remove-link':
                console.log('d link remove ->', d)
                linkToRemove(d)
                break;
            case 'info':

                break;
            case 'link-edit':
                console.log('link-edit')
                linkToEdit(d)
                break;
            case 'node-edit':

                break;
            
            default:
                break;
        }
    }


    if (data && !error) {
        return (
            <div className="App">
                <ForceGraph2D
                    // width='400'
                    // backgroundColor='#ff10ff'
                    showNavInfo={true}
                    graphData={data.getDb}
                    nodeLabel={d => `
                        Тип: ${d['properties']['Тип']}\n
                        Название: ${d['properties']['Название']}`
                    }
                    linkLabel={l=>l.id}
                    nodeAutoColorBy={d => d['properties']['Тип']}
                    onNodeClick={d=>selecteNode(d)}
                    onLinkClick={d=>selecteNode(d)}
                    />
            </div>
        )
    }
    return null
}

export default Canva