export const requestRecoveryCode = async (email) => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/recovery/generate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Recovery code request failed:", error);
    return null;
  }
};

export const resetPassword = async (email, newPass, recoveryCode) => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/recovery", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, newPass, recoveryCode })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Password reset failed:", error);
    return null;
  }
};