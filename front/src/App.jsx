import React from 'react'
import Canva from './canvas/Canva';
import CanvasNavbar from './canvas/CanvasNavbar';
import Legend from './canvas/Legend';



const App = () => {
    
    return <div>
        <CanvasNavbar />
        <Legend />
        <Canva />
    </div>
}

export default App