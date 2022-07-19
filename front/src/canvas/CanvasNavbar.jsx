import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import AddLink from './AddLink'
import AddNode from './AddNode'

const CanvasNavbar = () => {
    return <div className='card'>
        
        <ul className='nav nav-tabs'>
            <li className='nav-item'>
                <Link to="add-node" className='nav-link'>Add Node</Link>
            </li>
            <li className='nav-item'>
                <Link to="add-link" className='nav-link'>Add Link</Link>
            </li>
        </ul>

        <Routes >
            <Route path="add-node" element={<AddNode />}/>
            <Route path="add-link" element={<AddLink />}/>
        </Routes>
    </div>
}


export default CanvasNavbar