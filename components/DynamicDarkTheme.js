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
            background: palette.system_neutral1[11],
            elevation: {
                level0: 'transparent',
                level1: palette.system_neutral2[11],
                level2: palette.system_neutral2[10],
                level3: palette.system_neutral2[9],
                level4: palette.system_neutral2[8],
                level5: palette.system_neutral2[7],
            },
            error: '#F2B8B5',
            errorContainer: '#8C1D18',
            inverseOnSurface: palette.system_neutral1[10],/////////////////
            inversePrimary: palette.system_accent1[8],
            inverseSurface: palette.system_neutral1[2],///////////////////
            onBackground: palette.system_neutral1[3],
            onError: '#601410',
            onErrorContainer: '#F9DEDC',
            onPrimary: palette.system_accent1[10],
            onPrimaryContainer: palette.system_accent1[3],
            onSecondary: palette.system_accent2[10],
            onSecondaryContainer: palette.system_accent2[3],
            onSurface: palette.system_neutral1[3],
            onSurfaceDisabled: palette.system_neutral1[5],
            onSurfaceVariant: palette.system_neutral2[4],
            onTertiary: palette.system_accent3[10],
            onTertiaryContainer: palette.system_accent3[3],
            outline: palette.system_neutral2[6],
            primary: palette.system_accent1[4],
            primaryContainer: palette.system_accent1[9],
            secondary: palette.system_accent2[4],
            secondaryContainer: palette.system_accent2[9],
            surface: palette.system_neutral1[11],
            surfaceDisabled: palette.system_neutral1[9],
            surfaceVariant: palette.system_neutral2[9],
            surfaceTint: palette.system_accent1[4] + '14',
            tertiary: palette.system_accent3[4],
            tertiaryContainer: palette.system_accent3[9],
        }
    }

    return {
        background: '#1C1B1F',
        elevation: {
            level0: 'transparent',
            level1: '#28262c',
            level2: '#333039',
            level3: '#35313e',
            level4: '#383247',
            level5: '#3a324d',
        },
        error: '#F2B8B5',
        errorContainer: '#8C1D18',
        inverseOnSurface: '#313033',
        inversePrimary: '#6750A4',
        inverseSurface: '#E6E1E5',
        onBackground: '#E6E1E5',
        onError: '#601410',
        onErrorContainer: '#F9DEDC',
        onPrimary: '#371E73',
        onPrimaryContainer: '#EADDFF',
        onSecondary: '#332D41',
        onSecondaryContainer: '#E8DEF8',
        onSurface: '#E6E1E5',
        onSurfaceDisabled: '#D6D1D5',
        onSurfaceVariant: '#CAC4D0',
        onTertiary: '#492532',
        onTertiaryContainer: '#FFD8E4',
        outline: '#938F99',
        primary: '#D0BCFF',
        primaryContainer: '#4F378B',
        secondary: '#CCC2DC',
        secondaryContainer: '#4A4458',
        surface: '#1C1B1F',
        surfaceDisabled: '#5C5B5F',
        surfaceVariant: '#49454F',
        surfaceTint: '#D0BCFF14',
        tertiary: '#EFB8C8',
        tertiaryContainer: '#633B48',
    }
}

export const DynamicDarkTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...getUpdatedColors(),
    }
};
