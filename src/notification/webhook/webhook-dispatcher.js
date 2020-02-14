process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const fetch = require('node-fetch');

const send = async (endpoints, site) => endpoints
  .map(edp => fetchApi(edp, site)
  .then((data) => console.info('WebPush sent with success', data))
  .catch((err) => console.error('Error to send WebPush', err)))

const fetchApi = (edp, site) => {
  // TODO: Melhorar
  const jsonBody = site.toJSON()
  if (edp.method.toUpperCase() != 'GET' && edp.method.toUpperCase() != 'HEAD') { 
    return fetch(edp.url, { 
      method: edp.method.toUpperCase(), 
      body: JSON.stringify(jsonBody),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  } else {
    var url = new URL(edp.url)
    Object.keys(jsonBody).forEach(key => url.searchParams.append(key, jsonBody[key]))
    return fetch(url)
  }
}


module.exports = {
  send
}
