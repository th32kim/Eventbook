import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker, {DatePickerProps} from 'react-datepicker';


export default function MyDateInput(props: Partial<DatePickerProps>){
    const [field, meta, helpers] = useField(props.name!);
    return(
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error? (
                <Label basic color='red'>{meta.error}</Label>
            ): null}
        </Form.Field>
    )
}