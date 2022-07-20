import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { selectNodeTo } from '../reactiveVariables/rVar'
import AddLink from './AddLink'
import AddNode from './AddNode'
import RemoveNode from './RemoveNode'

const CanvasNavbar = () => {
    return <div className='card'>
        
        <ul className='nav nav-tabs'>
            <li className='nav-item'>
                <Link to="add-node" className='nav-link'>Add Node</Link>
            </li>
            <li className='nav-item'>
                <Link to="add-link" className='nav-link'>Add Link</Link>
            </li>
            <li className='nav-item'>
                <Link to="remove-node" onClick={()=>selectNodeTo('remove-node')} className='nav-link'>Remove node</Link>
            </li>
        </ul>

        <Routes >
            <Route path="add-node" element={<AddNode />}/>
            <Route path="add-link" element={<AddLink />}/>
            <Route path="remove-node" element={<RemoveNode />}/>
        </Routes>
    </div>
}


export default CanvasNavbar