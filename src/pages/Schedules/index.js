/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import * as Yup from 'yup';
import {
  Title, Alert, InputWrapper, Button, Space,
} from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';

import 'react-datepicker/dist/react-datepicker.css';

import axios from '../../services/api';
import Loading from '../../components/Loading';
import TableSchedules from '../../components/Table';
import DatePickerField from '../../components/DatePickerField';

function Schedules() {
  const titlePage = 'Search Schedule';

  const [schedules, setSchedules] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [allSchedules, setAllSchedules] = useState(false);

  useEffect(() => {
    const date = (JSON.stringify(new Date())).split('T')[0].replace(/^./, '');
    axios.get(`/schedule/date/${date}`).then((response) => setSchedules(response.data));
  }, []);

  const onSearchSchedule = (url) => {
    setLoading(true);

    setTimeout(async () => {
      await axios.get(url)
        .then((response) => setSchedules(response.data))
        .catch(() => setSchedules([]));
      setLoading(false);
    }, 200);
  };

  const scheduleSchema = Yup.object().shape({
    dateTime: Yup.date(),
  });

  return (
    <>

      <Title>
        {titlePage}
        {' '}
        (
        {schedules.length}
        )
      </Title>

      <Formik
        initialValues={{
          dateTime: (new Date()).setHours(0),
        }}
        validationSchema={scheduleSchema}
        onSubmit={(values) => {
        // same shape as initial values
          // console.log(values);
          // eslint-disable-next-line max-len
          const date = (JSON.stringify(values.dateTime)).split('T')[0].replace(/^./, '');
          // console.log(date);

          onSearchSchedule(`/schedule/date/${date}`);
          setAllSchedules(false);
        }}
      >
        {({ errors, touched }) => (

          <Form>
            <InputWrapper mt={16} required label="Schedule date">
              <Field
                as={DatePickerField}
                required
                name="dateTime"
                dateFormat="dd/MM/yyyy"
                inline
              />
              {errors.dateTime && touched.dateTime ? (
                <Alert icon={<AlertCircle size={16} />} title="Error!" color="red">
                  Invalid date and time
                </Alert>
              ) : null}
            </InputWrapper>

            <Button mt={8} type="submit">{titlePage}</Button>

            <Button ml={8} onClick={() => { onSearchSchedule('/schedule'); setAllSchedules(true); }}>All Schedules</Button>
          </Form>
        )}
      </Formik>

      <Space h="xl" />

      {isLoading ? (<Loading />) : null}

      <Space h="xl" />

      <TableSchedules schedules={schedules} setSchedules={setSchedules} allSchedules={allSchedules} />
    </>
  );
}

export default Schedules;
