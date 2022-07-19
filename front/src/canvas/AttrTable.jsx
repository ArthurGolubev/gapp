import React from 'react'



const AttrTable = ({extraAttr}) => {

    console.log(extraAttr)

    return <table className='table'>
        <thead>
            <tr>
                <th>#</th>
                <th>Название Атрибута</th>
                <th>Значение Атрибута</th>
            </tr>
        </thead>
        <tbody>
            {
                extraAttr.map((item, index) => {
                    return <tr key={'attr-' + index}>
                        <th scope="row">{index+1}</th>
                        <td>{item.name}</td>
                        <td>{item.value}</td>
                    </tr>
                })
            }
        </tbody>
</table>
}

export default AttrTable