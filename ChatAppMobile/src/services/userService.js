import AsyncStorage from '@react-native-async-storage/async-storage';

export const blockUser = async (userId) => {
  try {
    const blockedUsers = await getBlockedUsers();
    blockedUsers.push(userId);
    await AsyncStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
    return true;
  } catch (error) {
    console.error('Error blocking user:', error);
    return false;
  }
};

export const unblockUser = async (userId) => {
  try {
    const blockedUsers = await getBlockedUsers();
    const updatedList = blockedUsers.filter(id => id !== userId);
    await AsyncStorage.setItem('blockedUsers', JSON.stringify(updatedList));
    return true;
  } catch (error) {
    console.error('Error unblocking user:', error);
    return false;
  }
};

export const getBlockedUsers = async () => {
  try {
    const blockedUsers = await AsyncStorage.getItem('blockedUsers');
    return blockedUsers ? JSON.parse(blockedUsers) : [];
  } catch (error) {
    console.error('Error getting blocked users:', error);
    return [];
  }
};