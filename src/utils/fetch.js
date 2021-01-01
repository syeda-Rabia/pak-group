export default function fetchData(url) {
  console.log(url);

  try {
    return fetch(configs.baseURL2 + url, {
      headers: {
        // access_control_expose_headers: '*',
        mode: "no-cors",
        apikey: "bf5c13ad90627a19787e42733d6b2bf1",
        password: "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",
        "X-Shopify-Access-Token": "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",
      },
    })
      .then(async (res) => [await res.json(), res.headers])
      .then((res) => {
        // console.log(res)
        return res;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  } catch (error) {
    console.error(error);
    return error;
  }
}

export const fetchNextData = (url) => {
  try {
    return fetch(url, {
      headers: {
        mode: "no-cors",
        apikey: "bf5c13ad90627a19787e42733d6b2bf1",
        password: "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",
        "X-Shopify-Access-Token": "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",
      },
    })
      .then(async (res) => [await res.json(), res.headers])
      .then((res) => {
        // console.log(res)
        return res;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  } catch (error) {
    console.error(error);
    return error;
  }
};
