import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { selectNodeTo, sourceNode, targetNode } from '../reactiveVariables/rVar'
import Node from './Node'
import Link from './Link'

const AddLink = () => {

    const sourceNodeSub = useReactiveVar(sourceNode)
    const targetNodeSub = useReactiveVar(targetNode)
    return <div className='row'>

        { sourceNodeSub?.id ? (
            <Node node={sourceNodeSub} /> ) : (
            <div class="alert alert-primary" role="alert">
                Source <div className='btn btn-primary btn-sm' onClick={()=>selectNodeTo("source")}>+</div>
            </div>)
        }

        <div className='col'>
            ----
        </div>

        <div className='col-3'>
            <Link />
        </div>

        <div className='col'>
            ----
        </div>

        { targetNodeSub?.id ? (
            <Node node={targetNodeSub} /> ) : (
            <div class="alert alert-primary" role="alert">
                Target <button className='btn btn-primary btn-sm' onClick={()=>selectNodeTo("target")}>+</button>
            </div>)
        }

    </div>
}

export default AddLink