import { useState } from 'react';
import './styles/MediaCard.css';
import { Satellite, CalendarDaysIcon, Tag, ArrowRight } from 'lucide-react';
import missions from '../Assets/missions';

export default function MediaCard({ data }) {
  const [flipped, setFlipped] = useState(false);
  const SRC_NULL = '/img_not_found.webp';
  const missionInfo = missions[data.mission];
  
  return (
    <article className={`card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
      <div className='card-inner'>
        <div className='card-front'>
          <div className='cabezera-card'>
            <h2>{data.title}</h2>
          </div>

          <span className='card-mission'>
            <Satellite />
            {data.mission}
          </span>
          
          <div className='card-tmb'>
            <img src={data.thumbnail_url || SRC_NULL }/>
          </div>
          
          <div className='card-info'>
            <span>
              <CalendarDaysIcon />
              {data.created_at || 'null'}
            </span>
            <span>
              <Tag />
              {data.identifier}
            </span>
          </div>

          <span className='card-pild'>{`Lat: ${data.center_latitude}, Lon: ${data.center_longitude}`}</span>
          
          <button onClick={(e) => { e.stopPropagation(); redirect(); }}>
            See more
            <ArrowRight />
          </button>
        </div>

        <div className='card-back'>
          <img className='sticker-mission' src={missionInfo.url_badge} />
          <p>{missionInfo.description}</p>

          <p>
            Image Description...
          </p>
        </div>
      </div>
    </article>
  );

  function redirect() {
    window.open(data.url, "_blank");
  }
}
