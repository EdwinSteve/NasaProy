import { useEffect, useMemo, useState } from "react";
import "./Styles/Loader.css";

export default function GalleryLoader({
  text,
  messages,           
  rotateMs = 1200,         
}) {
  const steps = useMemo(
    () =>
      (messages && messages.length > 0)
        ? messages
        : [
            "Loading moon images",
            "Fetching metadata",
            "Stitching mega-tiles",
            "Generating AI descriptions",
            "Indexing lunar features",
            "Mapping selenographic coords",
          ],
    [messages]
  );

  const [i, setI] = useState(0);

  useEffect(() => {
    if (text) return; // modo fijo, no rotar
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % steps.length);
    }, rotateMs);
    return () => clearInterval(id);
  }, [text, steps.length, rotateMs]);

  const displayText = text ?? steps[i];

  return (
    <div className="loader-overlay" role="status" aria-live="polite" aria-busy="true">
      <div className="loader-core">
        <div className="spinner" />
        <p key={i} className="loader-text loader-text-fade">{displayText}</p>
      </div>
    </div>
  );
}
