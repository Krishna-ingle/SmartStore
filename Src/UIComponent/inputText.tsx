import React from 'react';
import { TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';

type prop = {
    // ✅ EXISTING PROPS (keep exactly the same)
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    secureTextEntry?: boolean;
    onFocus?: () => void;
    editable?: boolean;
    
    // ✅ NEW PROPS - ALL OPTIONAL with ? mark
    multiline?: boolean;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    maxLength?: number;
    numberOfLines?: number;
    textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
    returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
    onSubmitEditing?: () => void;
    blurOnSubmit?: boolean;
}

const InputText: React.FC<prop> = ({ 
  // ✅ EXISTING PROPS
  value, 
  onChangeText, 
  placeholder,
  secureTextEntry = false,
  onFocus,
  editable = true,
  
  // ✅ NEW PROPS with DEFAULT VALUES (this prevents breaking changes)
  multiline = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  maxLength = undefined,
  numberOfLines = 1,
  textAlignVertical = 'center',
  returnKeyType = 'done',
  onSubmitEditing = undefined,
  blurOnSubmit = true,
}) => {
  return (
    <TextInput
      style={[
        styles.input,
        multiline && styles.multilineInput,
      ]}
      // ✅ EXISTING PROPS
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onFocus={onFocus}
      editable={editable}
      
      // ✅ NEW PROPS - only pass if they have values
      multiline={multiline}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      maxLength={maxLength}
      numberOfLines={numberOfLines}
      textAlignVertical={textAlignVertical}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      blurOnSubmit={blurOnSubmit}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '85%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  multilineInput: {
    height: 80,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
});

export default InputText;
