import * as React from 'react';
import { Text } from 'react-native';

export function SnigletText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'sniglet' }]} />;
}
