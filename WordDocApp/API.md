# Word Doc Mobile App - API Documentation

## Storage API

The storage module provides functions for managing documents in local storage.

### Functions

#### `loadDocuments()`
Loads all documents from AsyncStorage.

**Returns:** `Promise<Array<Document>>`

**Example:**
```javascript
import {loadDocuments} from './src/utils/storage';

const documents = await loadDocuments();
console.log(documents);
```

#### `saveDocument(document)`
Saves or updates a document in AsyncStorage.

**Parameters:**
- `document` (Object): Document object to save
  - `id` (string): Unique identifier
  - `title` (string): Document title
  - `content` (string): Document content
  - `lastModified` (number): Timestamp of last modification

**Returns:** `Promise<boolean>` - true if successful

**Example:**
```javascript
import {saveDocument} from './src/utils/storage';

const document = {
  id: '123',
  title: 'My Document',
  content: 'This is the content',
  lastModified: Date.now()
};

const success = await saveDocument(document);
```

#### `deleteDocument(documentId)`
Deletes a document from AsyncStorage.

**Parameters:**
- `documentId` (string): ID of the document to delete

**Returns:** `Promise<boolean>` - true if successful

**Example:**
```javascript
import {deleteDocument} from './src/utils/storage';

const success = await deleteDocument('123');
```

#### `getDocument(documentId)`
Retrieves a specific document by ID.

**Parameters:**
- `documentId` (string): ID of the document to retrieve

**Returns:** `Promise<Document|null>` - Document object or null if not found

**Example:**
```javascript
import {getDocument} from './src/utils/storage';

const document = await getDocument('123');
```

## Components

### FormattingToolbar

A toolbar component that provides text formatting options.

**Props:**
- `isBold` (boolean): Whether bold formatting is active
- `isItalic` (boolean): Whether italic formatting is active
- `isUnderline` (boolean): Whether underline formatting is active
- `fontSize` (number): Current font size
- `onBoldPress` (function): Callback when bold button is pressed
- `onItalicPress` (function): Callback when italic button is pressed
- `onUnderlinePress` (function): Callback when underline button is pressed
- `onIncreaseFontSize` (function): Callback when increase font size button is pressed
- `onDecreaseFontSize` (function): Callback when decrease font size button is pressed

**Example:**
```javascript
import FormattingToolbar from './src/components/FormattingToolbar';

<FormattingToolbar
  isBold={isBold}
  isItalic={isItalic}
  isUnderline={isUnderline}
  fontSize={fontSize}
  onBoldPress={() => setIsBold(!isBold)}
  onItalicPress={() => setIsItalic(!isItalic)}
  onUnderlinePress={() => setIsUnderline(!isUnderline)}
  onIncreaseFontSize={() => setFontSize(fontSize + 2)}
  onDecreaseFontSize={() => setFontSize(fontSize - 2)}
/>
```

## Screens

### DocumentListScreen

Main screen that displays a list of all documents.

**Features:**
- Search documents by title
- View document preview
- Delete documents
- Create new document (FAB button)
- Navigate to document editor

**Navigation Params:** None

### DocumentEditorScreen

Screen for creating and editing documents.

**Features:**
- Edit document title
- Edit document content
- Format text (bold, italic, underline, font size)
- Save document
- Share document
- Word and character count

**Navigation Params:**
- `document` (Object|null): Document to edit, or null for new document
  - `id` (string): Document ID
  - `title` (string): Document title
  - `content` (string): Document content
  - `lastModified` (number): Last modification timestamp

## Data Models

### Document

```javascript
{
  id: string,           // Unique identifier (timestamp)
  title: string,        // Document title
  content: string,      // Document content (plain text)
  lastModified: number  // Timestamp of last modification
}
```

## Navigation Structure

```
App
├── DocumentList (Initial Route)
│   └── Create/Select Document → DocumentEditor
└── DocumentEditor
    └── Save → Back to DocumentList
```

## Styling

All components use StyleSheet.create() for styling. Colors follow Material Design guidelines:

- Primary Color: #2196F3 (Blue)
- Error Color: #f44336 (Red)
- Text Primary: #333
- Text Secondary: #666
- Text Hint: #999
- Background: #f5f5f5
- Card Background: #fff

## Dependencies

### Main Dependencies
- `react`: 18.2.0
- `react-native`: 0.72.0
- `@react-navigation/native`: ^6.1.6
- `@react-navigation/stack`: ^6.3.16
- `@react-native-async-storage/async-storage`: ^1.19.0
- `react-native-share`: ^9.4.0
- `react-native-vector-icons`: ^10.0.0

### Supporting Libraries
- `react-native-gesture-handler`: For navigation gestures
- `react-native-reanimated`: For smooth animations
- `react-native-safe-area-context`: For safe area handling
- `react-native-screens`: For native screen optimization
