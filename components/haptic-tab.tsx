import * as Haptics from 'expo-haptics';
import type { PressableProps } from 'react-native';
import { Pressable } from 'react-native';

export function HapticTab(props: PressableProps & { children?: React.ReactNode }) {
  const { onPressIn, ...rest } = props;

  return (
    <Pressable
      {...rest}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPressIn?.(ev);
      }}
    />
  );
}
