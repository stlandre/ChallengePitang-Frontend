/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Table, Switch } from '@mantine/core';
import axios from '../../services/api';

function TableSchedules({ schedules, setSchedules, allSchedules }) {
  useEffect(() => {}, [schedules, allSchedules]);

  // eslint-disable-next-line no-unused-vars
  const onFinished = async (schedule) => {
    const scheduleUpdated = {
      name: schedule.name,
      birthDate: schedule.birthDate,
      dateTime: schedule.dateTime,
      finished: !schedule.finished,
    };

    if (!scheduleUpdated.birthDate) {
      delete (scheduleUpdated.birthDate);
    }

    // const date = (JSON.stringify(scheduleUpdated.dateTime)).split('T')[0].replace(/^./, '');
    const dateUrl = `${new Date(scheduleUpdated.dateTime).toLocaleDateString().split('/')[2]}-${new Date(scheduleUpdated.dateTime).toLocaleDateString().split('/')[1]}-${new Date(scheduleUpdated.dateTime).toLocaleDateString().split('/')[0]}`;

    await axios.put(`/schedule/${schedule.id}`, scheduleUpdated);
    if (allSchedules) {
      axios.get('/schedule').then((response) => setSchedules(response.data));
    } else {
      axios.get(`/schedule/date/${dateUrl}`).then((response) => setSchedules(response.data));
    }
  };

  return (
    <Table highlightOnHover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Hour</th>
          <th>Name</th>
          <th>BirthDate</th>
          <th>Finished</th>
        </tr>
      </thead>
      <tbody>
        {schedules.map((schedule, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={index}>
            <td>{schedule.id}</td>
            <td>{(new Date(schedule.dateTime)).toLocaleDateString()}</td>
            <td>
              {(new Date(schedule.dateTime)).getHours()}
              h
            </td>
            <td>{schedule.name}</td>
            <td>{schedule.birthDate ? (new Date(schedule.birthDate)).toLocaleDateString() : null}</td>
            <td>
              <Switch
                checked={schedule.finished}
                onChange={() => {
                  onFinished(schedule);
                }}
                label="Yes"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableSchedules;
