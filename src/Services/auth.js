export const registerUser = async (email, pass) => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, pass })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Registration failed:", error);
    return null;
  }
};

export const loginUser = async (email, pass) => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, pass })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};


export const logoutUser = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/auth/logout");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Logout failed:", error);
    return null;
  }
};
