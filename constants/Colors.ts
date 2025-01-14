/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#3B5E47';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    container: '#fff',
    border: '#e1e1e1',

    tint: tintColorLight,
    tintText: '#E4FFE6',
    tintLight: '#86B38A',

    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    tab: '#eee',
    tabActive: '#d1d1d1',
  },
  dark: {
    text: '#ECEDEE',
    background: 'black',
    container: '#181818',
    border: '#313131',

    tint: tintColorLight,
    tintText: '#E4FFE6',
    tintLight: '#86B38A',

    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    tab: '#222',
    tabActive: '#444',
  },
};
