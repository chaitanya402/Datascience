import {
  loadDocuments,
  saveDocument,
  deleteDocument,
  getDocument,
} from '../src/utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('Storage Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadDocuments', () => {
    it('should return an empty array when no documents exist', async () => {
      AsyncStorage.getItem.mockResolvedValue(null);
      const documents = await loadDocuments();
      expect(documents).toEqual([]);
    });

    it('should return parsed documents when they exist', async () => {
      const mockDocuments = [
        {id: '1', title: 'Test Doc', content: 'Content', lastModified: 123},
      ];
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockDocuments));
      const documents = await loadDocuments();
      expect(documents).toEqual(mockDocuments);
    });

    it('should return empty array on error', async () => {
      AsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));
      const documents = await loadDocuments();
      expect(documents).toEqual([]);
    });
  });

  describe('saveDocument', () => {
    it('should add a new document', async () => {
      AsyncStorage.getItem.mockResolvedValue('[]');
      const newDoc = {
        id: '1',
        title: 'New Doc',
        content: 'Content',
        lastModified: 123,
      };

      const result = await saveDocument(newDoc);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@WordDocApp:documents',
        JSON.stringify([newDoc]),
      );
      expect(result).toBe(true);
    });

    it('should update an existing document', async () => {
      const existingDoc = {
        id: '1',
        title: 'Old Title',
        content: 'Old Content',
        lastModified: 100,
      };
      const updatedDoc = {
        id: '1',
        title: 'New Title',
        content: 'New Content',
        lastModified: 200,
      };

      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([existingDoc]));

      const result = await saveDocument(updatedDoc);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@WordDocApp:documents',
        JSON.stringify([updatedDoc]),
      );
      expect(result).toBe(true);
    });

    it('should return false on error', async () => {
      AsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));
      const result = await saveDocument({id: '1'});
      expect(result).toBe(false);
    });
  });

  describe('deleteDocument', () => {
    it('should remove a document by id', async () => {
      const documents = [
        {id: '1', title: 'Doc 1', content: 'Content 1', lastModified: 100},
        {id: '2', title: 'Doc 2', content: 'Content 2', lastModified: 200},
      ];

      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(documents));

      const result = await deleteDocument('1');

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@WordDocApp:documents',
        JSON.stringify([documents[1]]),
      );
      expect(result).toBe(true);
    });

    it('should return false on error', async () => {
      AsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));
      const result = await deleteDocument('1');
      expect(result).toBe(false);
    });
  });

  describe('getDocument', () => {
    it('should return a document by id', async () => {
      const documents = [
        {id: '1', title: 'Doc 1', content: 'Content 1', lastModified: 100},
        {id: '2', title: 'Doc 2', content: 'Content 2', lastModified: 200},
      ];

      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(documents));

      const result = await getDocument('2');

      expect(result).toEqual(documents[1]);
    });

    it('should return null when document not found', async () => {
      AsyncStorage.getItem.mockResolvedValue('[]');
      const result = await getDocument('999');
      expect(result).toBeNull();
    });

    it('should return null on error', async () => {
      AsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));
      const result = await getDocument('1');
      expect(result).toBeNull();
    });
  });
});
