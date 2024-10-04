import { useState, useEffect } from 'react'
import useJobs from './hooks/useJobs'
import DataTable from './components/DataTable';

import './App.css'

function App() {
  const { loading, error, data, maxPages, fetchJobs } = useJobs();

  const userColumns = [
    {
      label: 'ID',
      key: 'id',
    },
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Age',
      key: 'age',
    },
    {
      label: 'Occupation',
      key: 'occupation',
    }
  ]
// useMemo on the table
// page, count, (sort, filter)

  return (
    <>
      <div className="status-container">
        Status:&nbsp;
        {loading && <div> Loading...</div>}
        {error && <div> Something went wrong</div>}
        
      </div>
      <DataTable
        data={data}
        maxPages={maxPages}
        columns={userColumns}
        fetchData={fetchJobs}/>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  )
}

export default App
