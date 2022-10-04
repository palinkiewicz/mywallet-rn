import { getPaletteSync, deviceSupportsMaterialYou } from '@assembless/react-native-material-you';
import { DefaultTheme } from 'react-native-paper';

const palette = getPaletteSync();

/**
 * Most of the colors are from the palette and are set according to the https://m3.material.io/libraries/mdc-android/color-theming rules.
 * Some colors are not from the palette, but they still follow the same rules (they are just constant colors).
 * Commented colors are those I wasn't able to get from getPaletteSync().
 */
const getUpdatedColors = () => {
    if (deviceSupportsMaterialYou()) {
        return {
            background: palette.system_neutral1[1],
            elevation: {
                level0: 'transparent',
                level1: palette.system_neutral1[1],
                level2: palette.system_neutral1[2],
                level3: palette.system_neutral1[3],
                level4: palette.system_neutral1[4],
                level5: palette.system_neutral1[5],
            },
            error: '#b3261e',
            errorContainer: '#f9dedc',
            inverseOnSurface: palette.system_neutral1[11],
            inversePrimary: palette.system_accent1[4],
            inverseSurface: palette.system_neutral1[2],
            onBackground: palette.system_neutral1[11],
            onError: '#ffffff',
            onErrorContainer: '#410e0b',
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
            surfaceTint: palette.system_accent1[8] + '14',
            tertiary: palette.system_accent3[8],
            tertiaryContainer: palette.system_accent3[3]
        }
    }

    let surfaceTint = DefaultTheme.colors.primary.split(',');
    surfaceTint[3] = ' 0.08)';
    surfaceTint = surfaceTint.join(',')

    return {
        surfaceTint: surfaceTint,
    }
}

export const DynamicLightTheme = {
    ...DefaultTheme,
    ...{
        colors: {
            ...DefaultTheme.colors,
            ...getUpdatedColors(),
        },
    },
};
