import { useEffect, useMemo, useState } from 'react';
import { buildApiUrl, formatFieldValue, normalizeApiResponse } from './api';

function ResourceView({
  resourceName,
  endpointExample,
  title,
  description,
  columns,
  emptyMessage,
}) {
  const endpoint = buildApiUrl(resourceName);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function fetchResource() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();

        if (!ignore) {
          setRows(normalizeApiResponse(payload));
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(fetchError.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchResource();

    return () => {
      ignore = true;
    };
  }, [endpoint, refreshKey]);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return rows;
    }

    return rows.filter((row) =>
      columns.some((column) => {
        const rawValue = column.value ? column.value(row) : row[column.key];
        return formatFieldValue(rawValue).toLowerCase().includes(normalizedQuery);
      })
    );
  }, [columns, query, rows]);

  const tableColumnCount = columns.length + 1;
  const resultLabel = `${filteredRows.length} result${filteredRows.length === 1 ? '' : 's'}`;

  return (
    <section className="card resource-card shadow-lg">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row align-items-lg-start justify-content-between gap-4 mb-4">
          <div>
            <span className="badge rounded-pill text-bg-primary-subtle resource-badge mb-3">
              {resourceName}
            </span>
            <h1 className="resource-title display-6 fw-bold mb-2">{title}</h1>
            <p className="text-secondary mb-3 resource-description">{description}</p>
            <a
              className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover resource-endpoint"
              href={endpoint}
              target="_blank"
              rel="noreferrer"
            >
              API endpoint
            </a>
            {endpointExample && (
              <p className="small text-muted mb-0 mt-2">
                Codespaces example: {endpointExample}
              </p>
            )}
          </div>

          <div className="resource-summary card border-0 shadow-sm">
            <div className="card-body p-3">
              <p className="text-uppercase text-muted small fw-semibold mb-1">Dataset</p>
              <h2 className="h4 mb-1">{resultLabel}</h2>
              <p className="text-muted mb-0">Searchable, consistent tables shared across every resource screen.</p>
            </div>
          </div>
        </div>

        <form className="row g-3 align-items-end mb-4" onSubmit={(event) => event.preventDefault()}>
          <div className="col-12 col-lg-7">
            <label htmlFor={`${resourceName}-search`} className="form-label fw-semibold">
              Search {title.toLowerCase()}
            </label>
            <input
              id={`${resourceName}-search`}
              type="search"
              className="form-control form-control-lg"
              placeholder="Filter rows by any visible field"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-6 col-lg-2 d-grid">
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              onClick={() => setQuery('')}
            >
              Reset
            </button>
          </div>
          <div className="col-6 col-lg-3 d-grid">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => setRefreshKey((currentKey) => currentKey + 1)}
            >
              Refresh data
            </button>
          </div>
        </form>

        {loading && <div className="alert alert-light border mb-0">Loading {title.toLowerCase()}...</div>}
        {!loading && error && <div className="alert alert-danger mb-0">{error}</div>}
        {!loading && !error && (
          <>
            <div className="table-responsive resource-table-wrap">
              <table className="table table-hover align-middle resource-table mb-0">
                <thead className="table-light">
                  <tr>
                    {columns.map((column) => (
                      <th key={column.key} scope="col">
                        {column.label}
                      </th>
                    ))}
                    <th scope="col" className="text-end">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.length > 0 ? (
                    filteredRows.map((row, index) => (
                      <tr key={row.id || `${resourceName}-${index}`}>
                        {columns.map((column) => {
                          const rawValue = column.value ? column.value(row) : row[column.key];
                          const renderedValue = column.render
                            ? column.render(rawValue, row)
                            : formatFieldValue(rawValue);

                          return <td key={column.key}>{renderedValue}</td>;
                        })}
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setSelectedRow(row)}
                          >
                            View details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={tableColumnCount} className="text-center py-5 text-muted">
                        {rows.length > 0 ? 'No rows match the current search.' : emptyMessage}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {selectedRow && (
              <>
                <div className="modal fade show d-block resource-modal" tabIndex="-1" role="dialog" aria-modal="true">
                  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content border-0 shadow-lg">
                      <div className="modal-header">
                        <div>
                          <h2 className="modal-title h4 mb-1">{title} details</h2>
                          <p className="text-muted small mb-0">Expanded row information from the API response.</p>
                        </div>
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => setSelectedRow(null)}
                        />
                      </div>
                      <div className="modal-body p-0">
                        <div className="table-responsive">
                          <table className="table table-striped mb-0">
                            <thead className="table-light">
                              <tr>
                                <th scope="col">Field</th>
                                <th scope="col">Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(selectedRow).map(([field, value]) => (
                                <tr key={field}>
                                  <th scope="row" className="text-capitalize">{field.replaceAll('_', ' ')}</th>
                                  <td>{formatFieldValue(value)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setSelectedRow(null)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-backdrop fade show" onClick={() => setSelectedRow(null)} />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default ResourceView;