
const initialState = {
	user: null,
	access_token: null,
	login_complate: false,
	info: {},
	selectedLanguage: null,
	files: [],
	public_key: null,
	private_key: null,
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
		case "USER_VERIFIED":
			return { ...state, user: payload.user, access_token: payload.access_token };
		case "FILE_UPDATED":
			return { ...state, files: payload.files };
		case "INFO_UPDATED":
			return { ...state, info: payload };
		case "SET_KEYS":
			return { ...state, public_key: payload.public, private_key: payload.private };
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
