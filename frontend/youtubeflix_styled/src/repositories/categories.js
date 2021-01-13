import config from '../config';

const URL_CATEGORIES = `${config.URL_BACKEND}/categories`;
const URL_CATEGORIES_WITH_VIDEOS = `${URL_CATEGORIES}?_embed=videos`;

function performFetch(url) {
  return fetch(url)
    .then(async (serverResp) => {
      if (serverResp.ok) {
        
        const resp = await serverResp.json();

        return resp;
      }
      throw new Error('Cannot fetch data');
    });
}
function getAllCategoriesWithVideos() {


  return performFetch(URL_CATEGORIES_WITH_VIDEOS);
}

function getAll() {
  return performFetch(URL_CATEGORIES);
}

function create(objetoCategoria) {


  return fetch(`${URL_CATEGORIES}`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(objetoCategoria),
  })
    .then(async (serverResp) => {
      if (serverResp.ok) {

        const resp = await serverResp.json();

        return resp;
      }

      throw new Error('Cannot fetch data');
    });
}

export default {
  getAllCategoriesWithVideos,
  getAll,
  create,
};
