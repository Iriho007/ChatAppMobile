import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

export default function MessageScheduler({ onSchedule, onCancel }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      onSchedule(selectedDate);
    } else {
      onCancel();
    }
  };

  return (
    <View style={styles.container}>
      <DateTimePicker
        value={date}
        mode="datetime"
        is24Hour={true}
        onChange={onChange}
        minimumDate={new Date()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
  },
});