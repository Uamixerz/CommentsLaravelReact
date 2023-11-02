const initState = {
    isAuth: false,
    user: undefined
};

export const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_USER': {
            const user = action.payload;
            return {
                isAuth: true,
                user
            };
        }
        case 'LOGOUT_USER': {
            return {
                isAuth: false
            };
        }
        default: {
            return state;
        }
    }
};
