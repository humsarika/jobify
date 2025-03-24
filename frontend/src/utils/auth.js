export const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // ✅ Returns true if token exists
};


export const logout = (callback) => {
  localStorage.removeItem("token"); 
  localStorage.removeItem("user");  
  window.dispatchEvent(new Event("authChange")); // ✅ Notify navbar to update
  console.log("User logged out successfully");

  if (callback) callback();
};
