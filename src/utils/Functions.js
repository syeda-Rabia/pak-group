import { server_url, token } from "./Config";

const GetRecordFromServer = async (url) => {
  fetch(server_url + url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjc4M2JjNzQxZTcwMTg2NTNkZTk5YjdiMDdjMDFhYTA0ODIwNTdmYzc5OTcxOGVkYWRjMWUzNjhkZjAzNDk5ZWQ3NjVkYWVlYzhjOWE4ZTYiLCJpYXQiOiIxNjEwMTA5NDUzLjU4ODI1NCIsIm5iZiI6IjE2MTAxMDk0NTMuNTg4MjYwIiwiZXhwIjoiMTY0MTY0NTQ1My41NzI1NjUiLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.EcAsb01SH8jjiQIlkTGl22orcs0LuEH7IXq3iC9GBZXbNLqDRWvMnV4ge7GTWtsxrtwBuUhHARvdZ1aYYx7DnuhDtj4r6bbBeEUEkCgkymm_yiJzePxfU2CgdZJYGdkg7UUkowZcf_f-jm4su8KqCJRy8JMApR9FlspRTH_9ef9I2UPNoetn_wz75lKB74wkpEEpR1VIp9et6TReUONB1IfWl7_nUxb8tiIHn4XjKUaNEsJhKelzPPF3njsgyH9jtlVrhqQfhsJkX1E6yZCt-txd4SqBLnQW5fXIlUxflwwtA2lNkMWBRgaGoAIzNNn9m_hftI2XyZv0JnLN6jCoYC2TbpXEKV2Ot6pioXRCJyOIK3gqkwtMOZR-XHEuVsbLh-GPxOqksGx6SZKhaeVV0rhx4vceChILW2PKHyR327QUeKMLrfK6fwH8UGiORGa_HPs3VfTwjLvxSkF_nZsA2TWpFiKBOum2klQ9hxtbX4ogm69dV63OGkzKJHXfsFQTJYOdoz1-xQXVka2yiKCkHRuBV0jsNpW4yqbnADjX2am8ZeSke72g_TcHFH3iv9A4UWRfKIt31S7K6S57P80l5Jc2OpfpWybCBwaEO3PSuP0uoH8RkCmlwMjBCalOcxPWiqiOWx9KSffFMqFJ7gq_-NFccJRlX0X2YDsc4pfyfpg"}`,
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        //  ;
        //  ;
        return result;
      },

      (error) => {
        //  ;
      }
    );
};

export const POST = async (url, formData) => {
  let token = JSON.parse(localStorage.getItem("token"));

  //  ;
  // console.log(
  //   "form data to submit ----------,      ",
  //   JSON.stringify(formData)
  // );

  try {
    return fetch(server_url + url, {
      method: "post",
      // mode: "no-cors",
      crossDomain: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((res) => {
        //  ;
        return res;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  } catch (e) {
    //  ;
    return e;
  }
};

export const GET = async (url) => {
  let token = JSON.parse(localStorage.getItem("token"));
  //  ;

  //  ;

  //  ;

  try {
    return fetch(server_url + url, {
      method: "get",
      // mode: "no-cors",
      crossDomain: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        //  ;
        return res;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  } catch (e) {
    //  ;
    return e;
  }
};

// export default {
//   POST,
//   GET,
// };
