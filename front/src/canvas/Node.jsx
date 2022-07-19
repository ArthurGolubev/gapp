import React from 'react'
import AttrTable from './AttrTable'

const Node = ({node}) => {

    const extraAttr = (node) => {
        let extrAtt = []
        for (let prop in node['properties']){
            extrAtt.push({name: [prop], value: node['properties'][prop]})
        }
        return extrAtt
    }


    return <div className='col-3'>
        <div className='card' style={{'backgroundColor': node.color}}>
            <div className='card-header'>
                {node['properties']['Название']}
                
            </div>
            <div className='card-body'>
                <h4 className='card-title'>{node.labels[0]}</h4>
                <p className='card-text'>
                    <AttrTable extraAttr={extraAttr(node)} /> 
                </p>
            </div>
        </div>
    </div>
}


export default Node