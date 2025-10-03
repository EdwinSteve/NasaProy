import { useCallback, useEffect, useMemo, useState } from "react";
import "./Styles/Filters.css";

/**
 * Filter component for gallery datasets.
 * - Button to open/close a horizontal panel.
 * - Supported fields: mission, title, created_at, created_at_from, created_at_to,
 *   center_latitude, center_longitude, limit.
 *
 * Props:
 *  - initialFilters: object with initial filters (e.g., { limit: 12 })
 *  - onApply: (filters) => void  // callback to apply filters
 */
export default function Filter({ initialFilters = {}, onApply }) {
  const [open, setOpen] = useState(false);

  const [mission, setMission] = useState(initialFilters.mission ?? "");
  const [title, setTitle] = useState(initialFilters.title ?? "");
  const [createdAt, setCreatedAt] = useState(initialFilters.created_at ?? "");
  const [createdFrom, setCreatedFrom] = useState(initialFilters.created_at_from ?? "");
  const [createdTo, setCreatedTo] = useState(initialFilters.created_at_to ?? "");
  const [lat, setLat] = useState(
    initialFilters.center_latitude ?? (initialFilters.center_latitude === 0 ? 0 : "")
  );
  const [lng, setLng] = useState(
    initialFilters.center_longitude ?? (initialFilters.center_longitude === 0 ? 0 : "")
  );
  const [limit, setLimit] = useState(initialFilters.limit ?? 12);

  // If exact date is used, disable range; if range is set, disable exact date.
  const rangeDisabled = useMemo(() => Boolean(createdAt), [createdAt]);
  const exactDisabled = useMemo(() => Boolean(createdFrom || createdTo), [createdFrom, createdTo]);

  const close = useCallback(() => setOpen(false), []);
  const openDrawer = useCallback(() => setOpen(true), []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") close();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);
  
  function handleClearDates() {
    setCreatedAt("");
    setCreatedFrom("");
    setCreatedTo("");
  }

  function handleClearAll() {
    setMission("");
    setTitle("");
    setCreatedAt("");
    setCreatedFrom("");
    setCreatedTo("");
    setLat("");
    setLng("");
    setLimit(12);
  }

  function clampNumberOrEmpty(v, min, max) {
    if (v === "" || v === null || v === undefined) return "";
    const n = Number(v);
    if (Number.isNaN(n)) return "";
    return Math.max(min, Math.min(max, n));
  }

  function buildFiltersForAPI() {
    const f = {};
    if (mission) f.mission = mission.trim();
    if (title) f.title = title.trim();
    if (createdAt) f.created_at = createdAt; // YYYY-MM-DD format
    if (!createdAt) {
      if (createdFrom) f.created_at_from = createdFrom;
      if (createdTo) f.created_at_to = createdTo;
    }
    if (lat !== "" && !Number.isNaN(Number(lat))) f.center_latitude = Number(lat);
    if (lng !== "" && !Number.isNaN(Number(lng))) f.center_longitude = Number(lng);
    if (limit) f.limit = Number(limit);
    return f;
  }

  function handleApply() {
    const filters = buildFiltersForAPI();
    onApply?.(filters);
    setOpen(false);
  }

  // Soft validations on blur
  function onBlurLat() {
    const v = clampNumberOrEmpty(lat, -90, 90);
    setLat(v);
  }
  function onBlurLng() {
    const v = clampNumberOrEmpty(lng, -180, 180);
    setLng(v);
  }
  function onBlurLimit() {
    const v = clampNumberOrEmpty(limit, 1, 100);
    setLimit(v || 12);
  }

  // Sync when initialFilters change (optional)
  useEffect(() => {
    if (!initialFilters) return;
    setMission(initialFilters.mission ?? "");
    setTitle(initialFilters.title ?? "");
    setCreatedAt(initialFilters.created_at ?? "");
    setCreatedFrom(initialFilters.created_at_from ?? "");
    setCreatedTo(initialFilters.created_at_to ?? "");
    setLat(
      initialFilters.center_latitude ?? (initialFilters.center_latitude === 0 ? 0 : "")
    );
    setLng(
      initialFilters.center_longitude ?? (initialFilters.center_longitude === 0 ? 0 : "")
    );
    setLimit(initialFilters.limit ?? 12);
  }, [initialFilters]);

  return (
    <>
      {/* Fixed floating button in the bottom right corner */}
      <button
        className="filter-fab"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="filters-drawer"
        onClick={open ? close : openDrawer}
      >
        {open ? "✖ Close" : "🔍 Filters"}
      </button>

      {/* Overlay */}
      <div
        className={`filter-overlay ${open ? "show" : ""}`}
        onClick={close}
        aria-hidden={!open}
      />

      {/* Drawer */}
      <aside
        id="filters-drawer"
        className={`filters-drawer ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Search filters"
      >
        <header className="drawer-header">
          <h3>Filters</h3>
          <button className="icon-btn" onClick={close} aria-label="Close filters">✖</button>
        </header>

        <div className="drawer-content">
          <div className="filter-field">
            <label htmlFor="mission">Mission</label>
            <input
              id="mission"
              type="text"
              placeholder="Apollo 11, LRO LROC…"
              value={mission}
              onChange={(e) => setMission(e.target.value)}
            />
          </div>

          <div className="filter-field">
            <label htmlFor="title">Title (contains)</label>
            <input
              id="title"
              type="text"
              placeholder="crater, mare, ridge…"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="filter-field">
            <label htmlFor="createdAt">Exact date</label>
            <input
              id="createdAt"
              type="date"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              disabled={exactDisabled}
              title={exactDisabled ? "There is an active range" : ""}
            />
          </div>

          <div className="filter-field">
            <label>Date range</label>
            <div className="filter-dates">
              <input
                type="date"
                value={createdFrom}
                onChange={(e) => setCreatedFrom(e.target.value)}
                disabled={rangeDisabled}
                title={rangeDisabled ? "Exact date is active" : ""}
                placeholder="From"
              />
              <span className="date-sep">→</span>
              <input
                type="date"
                value={createdTo}
                onChange={(e) => setCreatedTo(e.target.value)}
                disabled={rangeDisabled}
                title={rangeDisabled ? "Exact date is active" : ""}
                placeholder="Until"
              />
            </div>
          </div>

          <div className="filter-field">
            <label htmlFor="lat">Latitude (°)</label>
            <input
              id="lat"
              type="number"
              step="0.01"
              min={-90}
              max={90}
              placeholder="-90 a 90"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              onBlur={onBlurLat}
            />
          </div>

          <div className="filter-field">
            <label htmlFor="lng">Longitude (°)</label>
            <input
              id="lng"
              type="number"
              step="0.01"
              min={-180}
              max={180}
              placeholder="-180 a 180"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              onBlur={onBlurLng}
            />
          </div>

          <div className="filter-field w-narrow">
            <label htmlFor="limit"># of images</label>
            <input
              id="limit"
              type="number"
              min={1}
              max={40}
              step={1}
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              onBlur={onBlurLimit}
            />
          </div>
        </div>

        <footer className="drawer-footer">
          <button type="button" className="btn-secondary" onClick={handleClearDates}>
            Clear dates
          </button>
          <button type="button" className="btn-secondary" onClick={handleClearAll}>
            Clear all
          </button>
          <button type="button" className="btn-primary" onClick={handleApply}>
            Apply
          </button>
        </footer>
      </aside>
    </>
  );
}