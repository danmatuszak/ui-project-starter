import { jobs } from '../data/data';

export const getJobs = (page: number, countPerPage: number) => {
  const start = (page - 1) * countPerPage;
  const end = start + countPerPage;
  const maxPages = Math.ceil(jobs.length / countPerPage);

  return new Promise((resolve) => {
    setTimeout(() => {
      // fetch(url + page={page})
      resolve({ data: jobs.slice(start, end), maxPages });
    }, 300)
  })
}