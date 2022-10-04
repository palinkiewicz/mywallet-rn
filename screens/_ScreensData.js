import { SCREENS_NAMES } from '../constants';
import { SignInScreen, SignUpScreen } from './Authentication';
import HomeScreen from './Home';
import AccountsScreen from './Accounts';
import AddAccountScreen from './AccountAdd';
import AccountHistoryScreen from './AccountHistory';
import AddAccountHistoryScreen from './AccountHistoryAdd';

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
    {
        name: SCREENS_NAMES.accounts,
        component: AccountsScreen,
        onDrawer: {
            icon: 'wallet-outline',
        },
    },
    {
        name: SCREENS_NAMES.accountHistory,
        component: AccountHistoryScreen,
    },
    {
        name: SCREENS_NAMES.addAccount,
        component: AddAccountScreen,
    },
    {
        name: SCREENS_NAMES.addAccountHistory,
        component: AddAccountHistoryScreen,
    },
];
