import { useState } from 'react';
import './styles/MediaCard.css';
import { Heart, Satellite, CalendarDaysIcon, Tag, ArrowRight } from 'lucide-react';

export default function MediaCard({ data }) {
  const [liked, setLiked] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const SRC_NULL = '/img_not_found.webp';
  const COLOR_LIKE = '#ff3c6d';

  return (
    <article className={`card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
      <div className='card-inner'>
        <div className='card-front'>
          <div className='cabezera-card'>
            <h2>{data.title}</h2>
            <button className='heart-btn' onClick={(e) => { e.stopPropagation(); setLiked(!liked)} }>
              <Heart color={liked ? COLOR_LIKE : 'currentColor'} 
                fill={liked ? COLOR_LIKE : 'none'} />
            </button>
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
          <img className='sticker-mission' src='/stickers/apollo11.png' />
          <p>
            The Apollo 11 mission was a historic milestone whose main objective was to land humans on the Moon and return them safely to Earth. It was the first time humanity set foot on another celestial body, marking a turning point in space exploration.
          </p>

          <p>
            This image shows a micrograph of lunar sample 10017, collected during the Apollo 11 mission. The sample is a hornfelsed basalt, a type of volcanic rock that has undergone thermal metamorphism—likely caused by intense heat from meteorite impacts or solar exposure on the Moon’s surface.
          </p>
        </div>
      </div>
    </article>
  );

  function redirect() {
    window.open(data.url, "_blank");
  }
}
