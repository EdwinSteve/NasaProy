import { useState } from 'react';
import './styles/MediaCard.css';
import { Heart, Satellite, CalendarDaysIcon, Tag, ArrowRight } from 'lucide-react';

export default function MediaCard({ data }) {
  const [liked, setLiked] = useState(false);
  const SRC_NULL = '/img_not_found.webp';
  const COLOR_LIKE = '#ff3c6d';

  return (
    <article className='card'>
      <div className='cabezera-card'>
        <h2>{data.title}</h2>
        <button className='heart-btn' onClick={() => setLiked(!liked)}>
          <Heart color={liked ? COLOR_LIKE : 'currentColor'} 
            fill={liked ? COLOR_LIKE : 'none'} />
        </button>
      </div>

      <span className='card-mission'>
        <Satellite />
        Mission: {data.mission}
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
      
      <button onClick={redirect}>
        Ver mas
        <ArrowRight />
      </button>
    </article>
  );

  function redirect() {
    window.open(data.url, "_blank");
  }
}
