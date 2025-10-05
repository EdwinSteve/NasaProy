import './Styles/Map.css'
import { useMemo } from "react";

const Map = ({ tilesUrl, width, height }) => {
  const iframeSrc = useMemo(() => {
    const params = new URLSearchParams({ tilesUrl, width, height });
    return `/map.html?${params.toString()}`;
  }, []);

  return (
    <div className='container-iframe'>
      <h2>Titulo</h2>
      <iframe
        src={iframeSrc}
        style={{ border: "none" }}
        title="Map"
        />
      <p>Description...</p>
    </div>
  );
};

export default Map;
