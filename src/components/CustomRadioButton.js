
import React from 'react'
import { RadioButton } from 'react-native-paper';


export default function CustomRadioButton() {
    const [checked, setChecked] = React.useState('first');
    return (
        <RadioButton
            value="first"
            status={ checked === 'first' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('first')}
        />
    )
}