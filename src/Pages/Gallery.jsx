import MediaCard from '../Components/MediaCard';
import ContainerMediaCard from '../Components/ContainerMediaCard';
import Greet from '../Components/Greet';
import Filter from '../Components/Filter';
import Paginator from '../Components/Paginator';
import { useEffect, useState } from 'react';
import { fetchDatasets } from '../Services/datasets';

export default function Gallery() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const [filters, setFilters] = useState({ limit: 12 });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState(0);


  useEffect(() => {
    loadData({ ...filters, page, limit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  useEffect(() => {
    // initial load
    loadData({ ...filters, page, limit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadData(params) {
    try {
      setLoading(true);
      setErr(null);
      const result = await fetchDatasets(params || {});
      if (!result || !Array.isArray(result.data)) {
        throw new Error('Invalid data format from API');
      }
      setDatasets(result.data);
      if (typeof result.page === "number") setPage(result.page);
      if (typeof result.limit === "number") setLimit(result.limit);
      if (typeof result.totalPage === "number") setTotalPage(result.totalPage);
      if (typeof result.totalData === "number") setTotalData(result.totalData);
    } catch (error) {
      console.error(error);
      setErr(error.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  }

  function handleApplyFilters(nextFilters) {
    // Reinicia a la primera página al cambiar filtros
    setFilters(nextFilters);
    setPage(1);
    setLimit(nextFilters.limit ?? limit);
    loadData({ ...nextFilters, page: 1, limit: nextFilters.limit ?? limit });
  }

  return (
    <>
      <Greet title={'Cosmic Gallery'} message={<>
        Explore stunning images captured by NASA missions across the cosmos.<br />
        Each card represents a unique glimpse into the universe.
      </>}/>

      <Filter initialFilters={filters} onApply={handleApplyFilters} />

      {loading && <p style={{opacity:.8}}>Cargando…</p>}
      {err && <p style={{color:'#f87171'}}>Error: {err}</p>}

      <ContainerMediaCard>
        {datasets.map((item) => (
          <MediaCard key={item._id || item.identifier} data={item} />
        ))}
      </ContainerMediaCard>

      {/* Paginación al final de la galería */}
      <Paginator
        page={page}
        limit={limit}
        totalPage={totalPage}
        totalData={totalData}
        disabled={loading}
        onPageChange={(p) => setPage(p)}
        onLimitChange={(l) => {
          // cambiar tamaño de página reinicia a la primera
          setLimit(l);
          setPage(1);
          loadData({ ...filters, page: 1, limit: l });
        }}
      />
    </>
  );
}
