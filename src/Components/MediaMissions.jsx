import { useNavigate } from "react-router-dom";
import "./Styles/MediaMissions.css"

const MediaMissions = ({ data }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/gallery?mission=${encodeURIComponent(data.title)}`);
  }

  return (
    <article className="media-missions">
      <img className="mission-img" src={data.url_badge}/>
      <div className="mission-info">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
      <button onClick={() => handleRedirect()} className="btn-redirect">Go</button>
    </article>
  )
}

export default MediaMissions