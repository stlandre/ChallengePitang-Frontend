import React from 'react';
import {
  TextInput,
} from '@mantine/core';

function TextInputField({ ...props }) {
  return (
    <TextInput
        // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

export default TextInputField;
