import { useMemo, useState } from "react";
import "./Styles/Paginator.css";

/**
 * Pagination component
 * - First/Previous/Next/Last buttons
 * - Page window with ellipsis for large totals
 * - "Go to page" field
 * - "Items per page" selector
 */
export default function Paginator({
  page = 1,
  limit = 12,
  totalPage = 1,
  totalData = 0,
  onPageChange,
  onLimitChange,
  disabled = false,
  limitOptions = [12, 24, 48, 96],
}) {
  const [goto, setGoto] = useState("");

  const pages = useMemo(() => {
    // Window around the current page (e.g. 2 to the left and right)
    const windowSize = 2;
    const start = Math.max(1, page - windowSize);
    const end = Math.min(totalPage, page + windowSize);
    const arr = [];

    // First page
    if (start > 1) {
      arr.push(1);
      if (start > 2) arr.push("ellipsis-left");
    }
    for (let p = start; p <= end; p++) arr.push(p);
    // Last page
    if (end < totalPage) {
      if (end < totalPage - 1) arr.push("ellipsis-right");
      arr.push(totalPage);
    }
    return arr;
  }, [page, totalPage]);

  const showingFrom = useMemo(() => (totalData === 0 ? 0 : (page - 1) * limit + 1), [page, limit, totalData]);
  const showingTo = useMemo(() => Math.min(page * limit, totalData), [page, limit, totalData]);

  function clampPage(p) {
    if (!p) return 1;
    const n = Number(p);
    if (Number.isNaN(n)) return 1;
    return Math.min(Math.max(1, n), Math.max(1, totalPage));
    // guarantees [1..totalPage] and avoids 0 when totalPage=0
  }

  function gotoPage() {
    const n = clampPage(goto);
    setGoto("");
    if (n !== page) onPageChange?.(n);
  }

  return (
    <div className="paginator">
      <div className="pg-left">
        <span className="pg-range">
          Showing <strong>{showingFrom.toLocaleString()}</strong>–<strong>{showingTo.toLocaleString()}</strong> of{" "}
          <strong>{totalData.toLocaleString()}</strong>
        </span>
      </div>

      <div className="pg-center">
        <button
          className="pg-btn"
          disabled={disabled || page <= 1}
          onClick={() => onPageChange?.(1)}
          aria-label="First page"
          title="First page"
        >
          «
        </button>
        <button
          className="pg-btn"
          disabled={disabled || page <= 1}
          onClick={() => onPageChange?.(page - 1)}
          aria-label="Previous"
          title="Previous"
        >
          ‹
        </button>

        <div className="pg-pages">
          {pages.map((p, idx) =>
            typeof p === "number" ? (
              <button
                key={`${p}-${idx}`}
                className={`pg-num ${p === page ? "active" : ""}`}
                disabled={disabled}
                onClick={() => onPageChange?.(p)}
                aria-current={p === page ? "page" : undefined}
              >
                {p.toLocaleString()}
              </button>
            ) : (
              <span key={`${p}-${idx}`} className="pg-ellipsis">…</span>
            )
          )}
        </div>

        <button
          className="pg-btn"
          disabled={disabled || page >= totalPage}
          onClick={() => onPageChange?.(page + 1)}
          aria-label="Next"
          title="Next"
        >
          ›
        </button>
        <button
          className="pg-btn"
          disabled={disabled || page >= totalPage}
          onClick={() => onPageChange?.(totalPage)}
          aria-label="Last page"
          title="Last page"
        >
          »
        </button>
      </div>

      <div className="pg-right">
        <label className="pg-goto">
          Go to:
          <input
            type="number"
            min={1}
            max={Math.max(1, totalPage)}
            value={goto}
            onChange={(e) => setGoto(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") gotoPage();
            }}
            disabled={disabled || totalPage <= 1}
            placeholder="pag."
          />
          <button className="pg-btn small" onClick={gotoPage} disabled={disabled || totalPage <= 1}>
            Go
          </button>
        </label>

        <label className="pg-limit">
          Per page:
          <select
            value={limit}
            onChange={(e) => onLimitChange?.(Number(e.target.value))}
            disabled={disabled}
          >
            {limitOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
