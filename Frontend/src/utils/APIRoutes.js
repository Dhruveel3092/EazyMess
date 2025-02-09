const host = "http://localhost:8080";

const APIRoutes = {
  host,
  login: `${host}/auth/login`,
  register: `${host}/auth/register`,
  authCheck: `${host}/auth-check`,
  googleLogin: `${host}/auth/google-login`,
  forgotPassword: `${host}/auth/forgot-password`,
  resetPassword: `${host}/auth/reset-password`,
  chiefWardenRegister: `${host}/auth/chief-warden-register`,
  logout: `${host}/auth/logout`,
  changeMenu: `${host}/chief-warden/change-menu`,
  addAccountant: `${host}/chief-warden/add-accountant`,
  messMenu: `${host}/general/mess-menu`,
  getSignature: `${host}/chief-warden/get-signature`,
  uploadNotice: `${host}/chief-warden/upload-notice`,
};

export default APIRoutes;