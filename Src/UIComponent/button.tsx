import { color } from '@cloudinary/url-gen/qualifiers/background';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import colors from '../Asset/Colors/colors';
type Props = {
  title: string;
  onPress: () => void;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  textColor?: string;
};

const Button: React.FC<Props> = ({
  title,
  onPress,
  width = '85%',
  height = 50,
  backgroundColor = colors.gradientColorone,
  textColor = colors.white,
  
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          width: width,
          height: height,
          backgroundColor: backgroundColor,
          alignSelf: 'center',
        } as ViewStyle,
      ]}
    >
      <Text style={[styles.text, { color: textColor } as TextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Button;
