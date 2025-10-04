import MediaCard from '../Components/MediaCard';
import ContainerMediaCard from '../Components/ContainerMediaCard';
import Greet from '../Components/Greet';
import Filter from '../Components/Filter';
import Paginator from '../Components/Paginator';
import { useEffect, useMemo, useState } from 'react';
import { fetchDatasets } from '../Services/datasets';
import { fetchUserFavorites } from '../Services/favorites';
import { useLocation } from 'react-router-dom';

export default function Gallery() {

  const location = useLocation();
  const isFavorites = useMemo(() => location.pathname.startsWith('/favorites'), [location.pathname]);

  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const [filters, setFilters] = useState({ limit: 12 });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState(0);


  useEffect(() => {
    setPage(1);
    loadData({ page: 1, limit, ...filters });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavorites]);

  useEffect(() => {
    loadData({ page, limit, ...filters });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  async function loadData(params) {
    try {
      setLoading(true);
      setErr(null);

      if (isFavorites) {
        // not sending filters on favorites atm
        const res = await fetchUserFavorites({
          page: params.page ?? page,
          limit: params.limit ?? limit,
        });

        if (!res || !Array.isArray(res.identifiers_fav)) {
          throw new Error('Formato inválido desde /favorites');
        }

        setDatasets(res.identifiers_fav);
        setPage(typeof res.page === 'number' ? res.page : (params.page ?? page));
        setLimit(typeof res.limit === 'number' ? res.limit : (params.limit ?? limit));
        setTotalPage(typeof res.totalPages === 'number' ? res.totalPages : 1);
        setTotalData(typeof res.total === 'number' ? res.total : res.identifiers_fav.length);
      } else {
        // send filters to general gallery
        const result = await fetchDatasets(params || {});
        if (!result || !Array.isArray(result.data)) {
          throw new Error('Formato inválido desde /gallery');
        }

        setDatasets(result.data);
        if (typeof result.page === 'number') setPage(result.page);
        if (typeof result.limit === 'number') setLimit(result.limit);
        if (typeof result.totalPage === 'number') setTotalPage(result.totalPage);
        if (typeof result.totalData === 'number') setTotalData(result.totalData);
      }
    } catch (error) {
      console.error(error);
      setErr(error.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  }

  function handleApplyFilters(nextFilters) {
    // go back to page 1 when applying new filters
    setFilters(nextFilters);
    setPage(1);
    setLimit(nextFilters.limit ?? limit);
    loadData({ ...nextFilters, page: 1, limit: nextFilters.limit ?? limit });
  }

  return (
    <>
      <Greet
        title={isFavorites ? 'Your favorite images!' : 'Cosmic Gallery'}
        message={
          isFavorites
            ? <>Here you will see the images you marked as favorites. 🛰️</>
            : <>Explore stunning images captured by NASA missions across the cosmos.<br />
               Each card represents a unique glimpse into the universe.</>
        }
      />

      <Filter initialFilters={filters} onApply={handleApplyFilters} />

      {loading && <p style={{opacity:.8}}>Cargando…</p>}
      {err && <p style={{color:'#f87171'}}>Error: {err}</p>}

      <ContainerMediaCard>
        {datasets.map((item) => (
          <MediaCard key={item._id || item.identifier} data={item} />
        ))}
      </ContainerMediaCard>

      {/* paginator on the bottom */}
      <Paginator
        page={page}
        limit={limit}
        totalPage={totalPage}
        totalData={totalData}
        disabled={loading}
        onPageChange={(p) => setPage(p)}
        onLimitChange={(l) => {
          // changing page size resets to first
          setLimit(l);
          setPage(1);
          loadData({ ...filters, page: 1, limit: l });
        }}
      />
    </>
  );
}
