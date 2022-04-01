export const api = "http://127.0.0.1:8000";

export const formulario = (url, data, method, callback) => {
  fetch(`${api}/${url}`, {
    method,
    cache: 'no-cache',
    mode: 'cors',
    body: data,
    headers: {},
  }).then(async response => {
    const estado = response.status;
    const resp = await response.json();
    callback(null, estado, resp);
  }).catch(error => callback(error));
};

export const consulta = (url, data = null, method = null, callback) => {
  const parametros = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (method) parametros.method = method;
  if (data) parametros.body = JSON.stringify(data);

  fetch(`${api}/${url}`, parametros)
    .then(async response => {
      const estado = response.status;
      const resp = await response.json();
      callback(null, estado, resp)
    }).catch(error => callback(error));
}

export const crear_form_data = (data) => {
  return new Promise((resolve) => {
    const key = Object.keys(data);
    const formData = new FormData();
    key.forEach((key) => formData.append(key, data[key]));
    resolve(formData);
  });
};
