import React from 'react'
import Input from './Input'
import SelectObject from './SelectObject'
import Textarea from './Textarea'
import Select from './Select'
const FormControl = (props) => {
    const { control, ...rest } = props

    switch(control) {
        case 'input' : return <Input {...rest}/>    
        case "textarea": return <Textarea {...rest}/>
        case "select": return <Select {...rest}/>
        case "selectobject": return <SelectObject {...rest}/>
        default : return null
    }
}

export default FormControl