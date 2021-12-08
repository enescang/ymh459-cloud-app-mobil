
const initialState = {
	account: null,
	profile: null,
	access_token: null,
	profile_token: null,
	login_complate: false,
	selectedLanguage: null,
	translater: () => { },
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case "AUTH_RESTORE":
			return payload;
		case "LOGIN":
			return { ...state, ...payload };
		case "UPDATE_PROFILE":
			return { ...state, profile: { ...payload } };
		case "COMPLETE_LOGIN":
			return { ...state, login_complate: true };
		case "ACCOUNT":
			return { ...state, account: payload.account, access_token: payload.access_token };
		case "LANGUAGE":
			return { ...state, translater: payload.translater, selectedLanguage: payload.language };
		case "LOGOUT":
			return initialState;
		default:
			break;
	}
	return state;
};

export { reducer };
