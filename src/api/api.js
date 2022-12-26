export const loginUser = async () => {
  // const params = {
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify({
  //     email: 'rider@gmail.com',
  //     password: 123456,
  //   }),
  // };
  //  fetch('http://45.77.60.11/api/login', params)
  //   .then(response => response.json())
  //   .then(data => {
  //     return data;
  //   });
};

export const Base_Url = 'http://45.77.60.11/api';

export const approvedOrder = async (params, data) => {
  const rawResponse = await fetch(`http://45.77.60.11/api${params}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const content = await rawResponse.json();

  return content;
};

export const updateProfileapi = async data => {
  const rawResponse = await fetch(`http://45.77.60.11/api/rider-update`, {
    method: 'POST',
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  });
  const content = await rawResponse.json();

  return content;
};

export const onlineOffline = async data => {
  const rawResponse = await fetch(`http://45.77.60.11/api/maintain-status`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const content = await rawResponse.json();

  return content;
};
