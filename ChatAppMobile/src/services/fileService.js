import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export const pickDocument = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true
    });

    if (result.type === 'success') {
      const { uri, name, size } = result;
      return { uri, name, size };
    }
    return null;
  } catch (error) {
    console.error('Error picking document:', error);
    return null;
  }
};

export const uploadFile = async (fileUri, fileName) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    // Implement your file upload logic here
    return { url: 'file_url', fileName };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};