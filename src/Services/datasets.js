export const fetchDatasets = async ({
  page = 1,
  limit = 5,
  title,
  mission,
  created_at,
  created_at_from,
  created_at_to,
  center_latitude,
  center_longitude
}) => {
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);

  if (title) params.append("title", title);
  if (mission) params.append("mission", mission);
  if (created_at) params.append("created_at", created_at);
  if (created_at_from) params.append("created_at_from", created_at_from);
  if (created_at_to) params.append("created_at_to", created_at_to);
  if (center_latitude) params.append("center_latitude", center_latitude);
  if (center_longitude) params.append("center_longitude", center_longitude);

  try {
    const response = await fetch(`http://localhost:4000/api/v1/data?${params.toString()}`);
    if (!response.ok) throw new Error("Error en la petición");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al obtener datasets:", error);
    return null;
  }
}