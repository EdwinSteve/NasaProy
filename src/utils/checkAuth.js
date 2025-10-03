export const checkAuth = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/auth/check", {
      credentials: "include"
    });

    const result = await response.json();
    return result.authenticated === true;
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
};