import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FormattingToolbar = ({
  isBold,
  isItalic,
  isUnderline,
  fontSize,
  onBoldPress,
  onItalicPress,
  onUnderlinePress,
  onIncreaseFontSize,
  onDecreaseFontSize,
}) => {
  return (
    <View style={styles.toolbar}>
      <TouchableOpacity
        style={[styles.button, isBold && styles.activeButton]}
        onPress={onBoldPress}>
        <Icon name="format-bold" size={24} color={isBold ? '#fff' : '#333'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isItalic && styles.activeButton]}
        onPress={onItalicPress}>
        <Icon
          name="format-italic"
          size={24}
          color={isItalic ? '#fff' : '#333'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isUnderline && styles.activeButton]}
        onPress={onUnderlinePress}>
        <Icon
          name="format-underlined"
          size={24}
          color={isUnderline ? '#fff' : '#333'}
        />
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity style={styles.button} onPress={onDecreaseFontSize}>
        <Icon name="remove" size={24} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onIncreaseFontSize}>
        <Icon name="add" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 4,
  },
  activeButton: {
    backgroundColor: '#2196F3',
  },
  separator: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
  },
});

export default FormattingToolbar;
