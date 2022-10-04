import { SCREENS_NAMES } from '../constants';
import { SignInScreen, SignUpScreen } from './Authentication';
import HomeScreen from './Home';

// Screens' data, used by Navigators
export const AUTH_SCREENS = [
    {
        name: SCREENS_NAMES.sign_in,
        component: SignInScreen,
    },
    {
        name: SCREENS_NAMES.sign_up,
        component: SignUpScreen,
    },
];

export const MAIN_SCREENS = [
    {
        name: SCREENS_NAMES.home,
        component: HomeScreen,
        onDrawer: {
            icon: 'home-outline',
        },
    },
];