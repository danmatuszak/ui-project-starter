import { useState, useEffect } from 'react';
import { UserDataType } from '../types/types'
type Column = {
  label: string;
  key: string;
}

type ItemType = {
  id: number;
  [key: string]: any; // Allow dynamic keys
};

// gen columns here


// useMemo on every single row, anything data dependent,
  // multi nested elemetns
    // everything rerendered on data change

// loading and error states: suspense if time allows

// function paginateData<T>(
//   data: Array<T>,
//   page: number,
//   pageSize: number,
// ) {
//   const start = (page - 1) * pageSize;
//   const end = start + pageSize;


// }

// const Row = useMemo(
//   <tr key={item.id}>
//     {columns.map(({ key }) => (
//       <td key={`${key + item.id}`}>{item[key]}</td>
//     ))}
//   </tr>
// )

export default function DataTable<
  T extends { id: number },
>({
  data,
  columns,
  fetchData,
  maxPages,
 }: {
  data: Array<T>,
  columns: Column[],
  fetchData: (page: number, count: number) => void,
  maxPages: number,
}) {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.count('page')
    fetchData(page, pageSize);
  }, [fetchData, page, pageSize])

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th key={key}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: T) => (
            <tr key={item.id}>
              {columns.map(({ key }) => (
                <td key={`${key + item.id}`}>{(item as ItemType)[key]}</td>
              ))}
            </tr>
            // <Row key={item.id} columns={columns} itemData={item} />
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <select
          aria-label="Page size"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
        </select>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span> Page: {page} of {maxPages} </span>
        <button
          disabled={page === maxPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  )
}