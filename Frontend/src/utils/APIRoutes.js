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
  getSignature: `${host}/chief-warden/get-signature`,
  uploadNotice: `${host}/chief-warden/upload-notice`,
  resolveComplaint: `${host}/chief-warden/resolve-complaint`,
  
  messMenu: `${host}/general/mess-menu`,
  getNotices: `${host}/general/get-notices`,
  getPendingComplaints: `${host}/general/get-pending-complaints`,
  getResolvedComplaints: `${host}/general/get-resolved-complaints`,
  getAverageRating: `${host}/general/get-average-rating`,
  getWeeklyRatings: `${host}/general/get-weekly-ratings`,
  getHostelName: `${host}/general/get-hostel-name`,
  
  joinHostel: `${host}/student/join-hostel`,
  raiseComplaint: `${host}/student/raise-complaint`,
  likeComplaint: `${host}/student/like-complaint`,
  dislikeComplaint: `${host}/student/dislike-complaint`,
  submitRating: `${host}/student/submit-rating`,
  leaveHostel: `${host}/student/leave-hostel`,
};

export default APIRoutes;