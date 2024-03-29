export const SCREENS_NAMES = {
    sign_in: 'Welcome',
    sign_up: 'Sign up',
    home: 'Home',
    accounts: 'Accounts',
    addAccount: 'Add account',
    editAccount: 'Edit account',
    accountHistory: 'Account history',
    addAccountHistory: 'Add account history',
    editAccountHistory: 'Edit history record',
};

export const AUTH_MODES = {
    SIGN_IN: 'sign-in',
    SIGN_UP: 'sign-up',
};

export const AUTH_SCREENS_TEXTS = {
    [AUTH_MODES.SIGN_IN]: {
        WELCOME: 'Welcome to myWallet',
        GOOGLE: 'Sign in with Google',
        INSTEAD_LABEL: "Don't have an account?",
        INSTEAD_BUTTON: 'Sign up now',
    },
    [AUTH_MODES.SIGN_UP]: {
        WELCOME: 'Sign up to myWallet',
        GOOGLE: 'Sign up with Google',
        INSTEAD_LABEL: 'Already have an account?',
        INSTEAD_BUTTON: 'Sign in instead',
    },
};

export const SELECTABLE_ICONS = [
    'wallet',
    'currency-usd',
    'bank',
    'piggy-bank',
    'account',
    'account-supervisor',
    'atm',
    'basket',
    'book',
    'cart',
    'cloud',
    'cookie',
    'trending-up',
    'wrench'
];
