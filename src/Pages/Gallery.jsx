import MediaCard from '../Components/MediaCard';
import ContainerMediaCard from '../Components/ContainerMediaCard';
import Greet from '../Components/Greet';
import { useEffect, useState } from 'react';
import { fetchDatasets } from '../Services/datasets';

export default function Gallery() {
  const [datasets, setDatasets] = useState([]);
  const filters = { limit: 12 }

  useEffect(() => {
    loadData(filters);
  }, []); 

  async function loadData(filters) {
    const result = await fetchDatasets({ limit: filters.limit });
    result ? setDatasets(result.data) : console.error("Failed to fetch datasets");
  }

  return (
    <>
      <Greet title={'Cosmic Gallery'} message={<>
        Explore stunning images captured by NASA missions across the cosmos.<br />
        Each card represents a unique glimpse into the universe.
      </>}/>
      <ContainerMediaCard>
        {datasets.map((item) => (
          <MediaCard key={item._id} data={item} />
        ))}
      </ContainerMediaCard>
    </>
  );
}
