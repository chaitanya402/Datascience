# Word Doc Mobile App

A React Native mobile application for creating, editing, and managing word documents on mobile devices.

## Features

- ✨ Create and edit documents with a clean, intuitive interface
- 📝 Rich text formatting (bold, italic, underline)
- 🔍 Search through your documents
- 💾 Auto-save functionality
- 📤 Share documents with others
- 📱 Works on both iOS and Android
- 🎨 Modern Material Design UI
- 📊 Word and character count

## Prerequisites

Before running this app, make sure you have the following installed:

- Node.js (version 16 or higher)
- npm or yarn
- React Native development environment setup
  - For iOS: Xcode (Mac only)
  - For Android: Android Studio and Android SDK

## Installation

1. Navigate to the WordDocApp directory:
```bash
cd WordDocApp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. For iOS (Mac only), install CocoaPods dependencies:
```bash
cd ios
pod install
cd ..
```

## Running the App

### Android
```bash
npm run android
# or
yarn android
```

### iOS (Mac only)
```bash
npm run ios
# or
yarn ios
```

## Project Structure

```
WordDocApp/
├── App.js                 # Main app component with navigation
├── index.js              # App entry point
├── package.json          # Dependencies and scripts
├── src/
│   ├── components/       # Reusable components
│   │   └── FormattingToolbar.js
│   ├── screens/         # Screen components
│   │   ├── DocumentListScreen.js
│   │   └── DocumentEditorScreen.js
│   └── utils/           # Utility functions
│       └── storage.js   # AsyncStorage helpers
```

## Usage

### Creating a New Document
1. Tap the blue "+" button at the bottom right
2. Enter a title for your document
3. Start typing your content
4. Use the formatting toolbar to style your text
5. Tap the save icon to save your document

### Editing an Existing Document
1. Tap on any document from the list
2. Make your changes
3. Tap the save icon to save

### Deleting a Document
1. Tap the delete icon next to any document
2. Confirm the deletion

### Sharing a Document
1. Open the document you want to share
2. Tap the share icon in the header
3. Choose how you want to share

### Searching Documents
1. Use the search bar at the top of the document list
2. Type to filter documents by title

## Features in Detail

### Document Editor
- **Title Input**: Large, bold title field at the top
- **Formatting Toolbar**: Quick access to text formatting options
  - Bold
  - Italic
  - Underline
  - Increase/Decrease font size
- **Content Area**: Spacious text area for your content
- **Statistics**: Real-time word and character count at the bottom

### Document Management
- **Local Storage**: Documents are saved locally using AsyncStorage
- **Automatic Updates**: Document list updates automatically when you save
- **Last Modified Date**: See when each document was last edited
- **Preview**: See a preview of document content in the list

## Technologies Used

- **React Native**: Cross-platform mobile framework
- **React Navigation**: Navigation library for screen transitions
- **AsyncStorage**: Local data persistence
- **React Native Vector Icons**: Material Design icons
- **React Native Share**: Native sharing capabilities

## Development

### Adding New Features
1. Components go in `src/components/`
2. Screens go in `src/screens/`
3. Utilities go in `src/utils/`

### Testing
```bash
npm test
# or
yarn test
```

## Troubleshooting

### Metro Bundler Issues
If you encounter issues with the Metro bundler:
```bash
npm start -- --reset-cache
```

### Build Issues
Clean the build:
```bash
# Android
cd android && ./gradlew clean && cd ..

# iOS
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
```

## Future Enhancements

- [ ] Cloud synchronization
- [ ] Export to PDF/DOCX
- [ ] More formatting options (lists, headers, colors)
- [ ] Image insertion
- [ ] Collaborative editing
- [ ] Voice-to-text
- [ ] Dark mode

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on the repository.
