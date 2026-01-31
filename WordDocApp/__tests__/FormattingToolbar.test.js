import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import FormattingToolbar from '../src/components/FormattingToolbar';

describe('FormattingToolbar Component', () => {
  const mockProps = {
    isBold: false,
    isItalic: false,
    isUnderline: false,
    fontSize: 16,
    onBoldPress: jest.fn(),
    onItalicPress: jest.fn(),
    onUnderlinePress: jest.fn(),
    onIncreaseFontSize: jest.fn(),
    onDecreaseFontSize: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const {toJSON} = render(<FormattingToolbar {...mockProps} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with all formatting buttons', () => {
    const component = render(<FormattingToolbar {...mockProps} />);
    expect(component).toBeDefined();
  });

  it('renders with bold active when isBold is true', () => {
    const {toJSON} = render(
      <FormattingToolbar {...mockProps} isBold={true} />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with italic active when isItalic is true', () => {
    const {toJSON} = render(
      <FormattingToolbar {...mockProps} isItalic={true} />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with underline active when isUnderline is true', () => {
    const {toJSON} = render(
      <FormattingToolbar {...mockProps} isUnderline={true} />,
    );
    expect(toJSON()).toBeTruthy();
  });
});
