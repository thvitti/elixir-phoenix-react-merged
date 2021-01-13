import config from '../config';

const URL_VIDEOS = `${config.URL_BACKEND}/videos`;

function create( objetoVideo ) {
    

  return fetch(`${URL_VIDEOS}?_embed=videos`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json',},
    body: JSON.stringify(objetoVideo),
  })
    .then(async (serverResp) => {

            if (serverResp.ok) {

                const resp = await serverResp.json();

                return resp;
            }

            throw new Error('Cannot fetch data');

        })
}

export default {
    create,
}
