import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';
import {saveDocument} from '../utils/storage';
import FormattingToolbar from '../components/FormattingToolbar';

const DocumentEditorScreen = ({route, navigation}) => {
  const {document} = route.params || {};
  const [title, setTitle] = useState(document?.title || 'Untitled Document');
  const [content, setContent] = useState(document?.content || '');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
            <Icon name="share" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
            <Icon name="save" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, title, content]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a document title');
      return;
    }

    const doc = {
      id: document?.id || Date.now().toString(),
      title: title.trim(),
      content,
      lastModified: Date.now(),
    };

    await saveDocument(doc);
    Alert.alert('Success', 'Document saved successfully', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  };

  const handleShare = async () => {
    try {
      await Share.open({
        title: title,
        message: `${title}\n\n${content}`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const getTextStyle = () => {
    return {
      fontSize,
      fontWeight: isBold ? 'bold' : 'normal',
      fontStyle: isItalic ? 'italic' : 'normal',
      textDecorationLine: isUnderline ? 'underline' : 'none',
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Document Title"
          placeholderTextColor="#999"
        />
      </View>

      <FormattingToolbar
        isBold={isBold}
        isItalic={isItalic}
        isUnderline={isUnderline}
        fontSize={fontSize}
        onBoldPress={() => setIsBold(!isBold)}
        onItalicPress={() => setIsItalic(!isItalic)}
        onUnderlinePress={() => setIsUnderline(!isUnderline)}
        onIncreaseFontSize={() => setFontSize(Math.min(fontSize + 2, 32))}
        onDecreaseFontSize={() => setFontSize(Math.max(fontSize - 2, 10))}
      />

      <ScrollView style={styles.editorContainer}>
        <TextInput
          style={[styles.contentInput, getTextStyle()]}
          value={content}
          onChangeText={setContent}
          placeholder="Start typing your document..."
          placeholderTextColor="#999"
          multiline
          textAlignVertical="top"
        />
      </ScrollView>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Words: {content.split(/\s+/).filter(w => w.length > 0).length} |
          Characters: {content.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
    marginRight: 10,
  },
  headerButton: {
    marginLeft: 15,
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    padding: 0,
  },
  editorContainer: {
    flex: 1,
    padding: 15,
  },
  contentInput: {
    flex: 1,
    color: '#333',
    lineHeight: 24,
    minHeight: 400,
  },
  statsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  statsText: {
    fontSize: 12,
    color: '#666',
  },
});

export default DocumentEditorScreen;
