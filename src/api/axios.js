import axios from "axios";

const uid = sessionStorage.getItem("uid");

const ajax = axios.create({
  baseURL: "/api/",
  headers: {
    uid
  }
});

function CError(message = "系统错误", code) {
  this.name = "CError";
  this.message = message;
  this.stack = new Error().stack;
}

CError.prototype = Object.create(Error.prototype);
CError.prototype.constructor = CError;

// 制造一个高阶函数完成
function axiosCommon() {
  return async function(url, type, params) {
    const getdata = await ajax({
      method: type,
      url,
      [type.toLowerCase() === "get" ? "params" : "data"]: params
    }).catch(e => {
      throw new CError(e.message, e.response.status);
    });
    if (getdata.data.code === 1) {
      return getdata.data;
    }

    throw new CError(getdata.data.msg, getdata.data.code);
  };
}

export const get = (url, params) => axiosCommon()(url, "get", params);

export const post = (url, params) => axiosCommon()(url, "post", params);