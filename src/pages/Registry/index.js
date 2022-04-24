import React from 'react';
import DatePicker from 'react-datepicker';
import {
  Formik, Form, Field, useFormikContext, useField,
} from 'formik';
import * as Yup from 'yup';

import {
  Title, TextInput, Alert, InputWrapper, Button,
} from '@mantine/core';

import { showNotification } from '@mantine/notifications';

import { AlertCircle } from 'tabler-icons-react';

import 'react-datepicker/dist/react-datepicker.css';

import { useNavigate } from 'react-router-dom';
import axios from '../../services/api';
// import Loading from '../../components/Loading';

function TextInputField({ ...props }) {
  return (
    <TextInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

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

function Registry() {
  const titlePage = 'Registry Schedule';

  const navigate = useNavigate();

  const registrySchedule = async (values) => {
    const dateTimeS = JSON.stringify(values.dateTime);
    const dateT = dateTimeS.substring(1, dateTimeS.length - 1); // take quotes

    const dateBirthS = JSON.stringify(values.birthDate);
    const dateB = dateBirthS.substring(1, dateBirthS.length - 1); // take quotes

    const schedule = {
      name: values.name,
      dateTime: dateT,
      birthDate: values.birthDate ? dateB : JSON.stringify(values.birthDate),
      finished: false,
    };

    if (!values.birthDate) {
      delete (schedule.birthDate);
    }

    try {
      await axios.post('/schedule', schedule);
      showNotification({
        message: 'Schedule created with success',
        title: `Success ${values.dateTime.toLocaleDateString()}`,
      });
      navigate('/schedule');
    } catch {
      showNotification({
        message: 'Not was possible create Schedule',
        title: 'Error! Check availability!',
        color: 'red',
      });
    }
  };

  const scheduleSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    dateTime: Yup.date()
      .min(new Date()),

    birthDate: Yup.date()
      .max(new Date()),
  });

  return (
    <>

      <Title>{titlePage}</Title>

      <Formik
        initialValues={{
          name: '',
          dateTime: new Date().setMilliseconds(0),
          birthDate: '',
        }}
        validationSchema={scheduleSchema}
        onSubmit={(values) => {
        // same shape as initial values
          // console.log(values);
          // console.log(JSON.stringify(values.dateTime));
          registrySchedule(values);
        }}
      >
        {({ errors }) => (

          <Form>
            <InputWrapper mt={16} required label="Schedule date and hour">
              <Field
                as={DatePickerField}
                required
                name="dateTime"
                dateFormat="dd/MM/yyyy"
                showTimeSelect
                inline
              />
              {errors.dateTime ? (
                <Alert icon={<AlertCircle size={16} />} title="Error!" color="red">
                  Invalid date and time
                </Alert>
              ) : null}
            </InputWrapper>

            <Field
              mt={16}
              as={TextInputField}
              required
              name="name"
              label="Name"
              placeholder="Your name"
            />
            {/* {errors.name && touched.name ? (
            <div>{errors.name}</div>
          ) : null} */}

            <InputWrapper mt={16} label="Birthdate">
              <Field
                as={DatePickerField}
                name="birthDate"
                dateFormat="dd/MM/yyyy"
              />
            </InputWrapper>

            <Button mt={8} type="submit">{titlePage}</Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Registry;
