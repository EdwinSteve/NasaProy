export const fetchUserFavorites = async (
    { page = 1, limit = 10 }
) => {

    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);

    try {
    const response = await fetch(`http://localhost:4000/api/v1/favorites/data?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) throw new Error("Error fetching user favorites");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    return null;
  }
}