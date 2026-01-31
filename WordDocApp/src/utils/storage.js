import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@WordDocApp:documents';

export const loadDocuments = async () => {
  try {
    const documentsJson = await AsyncStorage.getItem(STORAGE_KEY);
    if (documentsJson) {
      return JSON.parse(documentsJson);
    }
    return [];
  } catch (error) {
    console.error('Error loading documents:', error);
    return [];
  }
};

export const saveDocument = async (document) => {
  try {
    const documents = await loadDocuments();
    const existingIndex = documents.findIndex(doc => doc.id === document.id);
    
    if (existingIndex >= 0) {
      documents[existingIndex] = document;
    } else {
      documents.push(document);
    }
    
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    return true;
  } catch (error) {
    console.error('Error saving document:', error);
    return false;
  }
};

export const deleteDocument = async (documentId) => {
  try {
    const documents = await loadDocuments();
    const filteredDocuments = documents.filter(doc => doc.id !== documentId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredDocuments));
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
};

export const getDocument = async (documentId) => {
  try {
    const documents = await loadDocuments();
    const document = documents.find(doc => doc.id === documentId);
    return document || null;
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
};
