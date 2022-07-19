import React from 'react'

const ExtraAttr = ({state, setState}) => {


    const addExtraAttr = () => {
        let name = document.querySelector("#extraAttr-name")
        let value = document.querySelector("#extraAttr-value")
        setState({...state, extraAttribute: [...state.extraAttribute, {name: name.value, value: value.value} ]})
        name.value = ''
        value.value = ''
    }


    return <div>
        <p>Поле дополнительного атрибута</p>
        <div>
            <div className='row'>
                <div className='col'>
                    {/* add extra attribute */}
                    <div className='input-group input-group-sm'>
                        {/* <span className='input-group-text'></span> */}
                        <input className='form-control' placeholder='Название атрибута' type='text' id='extraAttr-name'/>
                        {/* <span className='input-group-text'></span> */}
                        <input className='form-control' placeholder='Значение атрибута' type='text' id='extraAttr-value'/>
                        <button className='btn btn-success btn-sm' type='button' onClick={()=>addExtraAttr()}>Добавить атрибут +</button>
                    </div>
                </div>
            </div>
        </div>
        <button onClick={()=>console.log(state)}>STATE</button>
    </div>
}

export default ExtraAttr