import { getPaletteSync, deviceSupportsMaterialYou } from '@assembless/react-native-material-you';
import { DefaultTheme } from 'react-native-paper';

const palette = getPaletteSync();

// The colors that are commented are the colors I wasn't able to get from the getPaletteSync()
const getUpdatedColors = () => {
    if (deviceSupportsMaterialYou()) {
        return {
            background: palette.system_neutral1[1],
            // error
            // errorContainer
            inverseOnSurface: palette.system_neutral1[11],
            inversePrimary: palette.system_accent1[4],
            inverseSurface: palette.system_neutral1[2],
            onBackground: palette.system_neutral1[11],
            // onError
            // onErrorContainer
            onPrimary: palette.system_accent1[0],
            onPrimaryContainer: palette.system_accent1[11],
            onSecondary: palette.system_accent2[0],
            onSecondaryContainer: palette.system_accent2[11],
            onSurface: palette.system_neutral1[11],
            // onSurfaceDisabled
            onSurfaceVariant: palette.system_neutral2[9],
            onTertiary: palette.system_accent3[0],
            onTertiaryContainer: palette.system_accent3[11],
            outline: palette.system_neutral2[7],
            primary: palette.system_accent1[8],
            primaryContainer: palette.system_accent1[3],
            secondary: palette.system_accent2[8],
            secondaryContainer: palette.system_accent2[3],
            surface: palette.system_neutral1[1],
            // surfaceDisabled
            surfaceVariant: palette.system_neutral2[3],
            tertiary: palette.system_accent3[8],
            tertiaryContainer: palette.system_accent3[3]
        }
    }

    return {}
}

export const MaterialYouTheme = {
    ...DefaultTheme,
    ...{
        colors: {
            ...DefaultTheme.colors,
            ...getUpdatedColors(),
        },
    },
};
