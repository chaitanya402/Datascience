import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {loadDocuments, deleteDocument} from '../utils/storage';

const DocumentListScreen = ({navigation}) => {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadDocs();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadDocs();
    });
    return unsubscribe;
  }, [navigation]);

  const loadDocs = async () => {
    const docs = await loadDocuments();
    setDocuments(docs);
  };

  const handleDeleteDocument = (docId) => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this document?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteDocument(docId);
            loadDocs();
          },
        },
      ],
    );
  };

  const handleCreateNew = () => {
    navigation.navigate('DocumentEditor', {
      document: null,
    });
  };

  const handleOpenDocument = (doc) => {
    navigation.navigate('DocumentEditor', {
      document: doc,
    });
  };

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderDocument = ({item}) => (
    <TouchableOpacity
      style={styles.documentItem}
      onPress={() => handleOpenDocument(item)}>
      <View style={styles.documentInfo}>
        <Icon name="description" size={40} color="#2196F3" />
        <View style={styles.documentText}>
          <Text style={styles.documentTitle}>{item.title}</Text>
          <Text style={styles.documentDate}>
            {new Date(item.lastModified).toLocaleDateString()}
          </Text>
          <Text style={styles.documentPreview} numberOfLines={2}>
            {item.content.substring(0, 100)}...
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteDocument(item.id)}>
        <Icon name="delete" size={24} color="#f44336" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search documents..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {filteredDocuments.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="description" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No documents yet</Text>
          <Text style={styles.emptySubtext}>
            Create your first document to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredDocuments}
          renderItem={renderDocument}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={handleCreateNew}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  listContainer: {
    padding: 10,
  },
  documentItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  documentInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  documentText: {
    marginLeft: 15,
    flex: 1,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  documentDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  documentPreview: {
    fontSize: 14,
    color: '#999',
  },
  deleteButton: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default DocumentListScreen;
