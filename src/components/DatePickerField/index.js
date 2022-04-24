import React from 'react';

import DatePicker from 'react-datepicker';
import {
  useFormikContext, useField,
} from 'formik';

function DatePickerField({ ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <DatePicker
        // eslint-disable-next-line react/jsx-props-no-spreading
      {...field}
        // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
}

export default DatePickerField;
