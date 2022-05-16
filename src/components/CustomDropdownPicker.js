import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CustomDropdownPicker(props) {
    const {placeholder, options, setSelection} = props
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    const [items, setItems] = useState();

    useEffect(()=>{
        let auxValues = []
        if(options){
            options.forEach(option => {
                auxValues.push({
                    label: option.title,
                    value: option.id
                })
            });
        }
        setItems(auxValues)
    }, [options])

    const handleChange = (value) => {
        setSelection(value)
    }


    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={placeholder}
            onChangeValue={(value) => {handleChange(value)}}
            style={{height: '5%'}}
        />
    )
}