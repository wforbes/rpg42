export const Routes = {
	PUBLIC: {
		HOME: "/",
	},
	AUTH: {
		LOGIN: "/login",
		SIGNUP: "/signup",
	},
	PROTECTED: {
		GAME: "/game",
	},
	API: {
		BASE: "/api",
		AUTH: {
			VERIFY_SESSION: "/auth/verify-session",
			SIGN_UP: "/auth/sign-up",
			LOGIN: "/auth/login",
			LOGOUT: "/auth/logout",
		}
	}
};