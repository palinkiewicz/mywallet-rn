export const SCREEN_NAMES = {
    HOME: 'Home',
    SIGN_IN: 'Welcome',
    SIGN_UP: 'Sign up',
};

export const DRAWER_ITEMS = {
    [SCREEN_NAMES.HOME]: {
        name: SCREEN_NAMES.HOME,
        icon: 'home-outline',
    },
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

export const AUTH_FORM_ERROR_INITIAL_STATE = {
    email: { active: false, msg: '' },
    password: { active: false, msg: '' },
    confirmPassword: { active: false, msg: '' },
};
