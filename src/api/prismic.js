import { getEndpoint, createClient } from '@prismicio/client';
import fetch from 'node-fetch';
export { predicate } from '@prismicio/client';

const { PRISMIC_REPO_NAME, PRISMIC_API_TOKEN } = process.env;
const endpoint = getEndpoint(PRISMIC_REPO_NAME);

const routes = [
  {
    type: 'homepage',
    path: '/'
  },
  {
    type: 'projects_page',
    path: '/projects'
  },
  {
    type: 'project',
    path: '/project/:uid'
  }
];

const client = createClient(endpoint, {
  accessToken: PRISMIC_API_TOKEN,
  routes,
  fetch
});

export { client };
