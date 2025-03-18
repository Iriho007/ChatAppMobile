import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const registerForPushNotifications = async () => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    await AsyncStorage.setItem('pushToken', token.data);

    return token.data;
  } catch (error) {
    console.error('Error registering for push notifications:', error);
  }
};

export const setupNotifications = () => {
  Notifications.addNotificationReceivedListener(handleNotification);
  Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
};

const handleNotification = (notification) => {
  // Handle received notification
};

const handleNotificationResponse = (response) => {
  // Handle notification response
};