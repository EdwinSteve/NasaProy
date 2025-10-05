import missions from "../assets/missions"
import ContainerMediaCard from "../Components/ContainerMediaCard"
import MediaMissions from "../Components/MediaMissions"
import Greet from "../Components/Greet"

const GalleryMissions = () => {
  return (
    <>
      <Greet title="NASA Missions" message={<>This page is dedicated to showcasing the most iconic lunar missions in history, offering a gateway for general<br/> audiences to learn more about NASA’s exploration of the Moon.  </>} />
      <ContainerMediaCard>
        {Object.entries(missions).map(([key, value]) => (
          <MediaMissions key={key} data={value}/>
        ))}
      </ContainerMediaCard>
    </>
  )
}

export default GalleryMissions