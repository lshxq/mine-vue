import axios from "axios";
import cookies from "js-cookie";
import _ from "lodash";

const publicPath = "/mine";

let mockEnabled = false;

const ajax = (params) => {
  if (!params) {
    return false;
  }
  const prom = new Promise(function (res, rej) {
    params.headers = params.headers || {};
    params.headers["x-request-id"] =
      params.headers["x-request-id"] || new Date().getTime();

    if (!params.url && params.api) {
      params.url = `/api/${params.api}`;
    }

    axios(params)
      .then((data) => {
        res(data);
      })
      .catch((error) => {
        if (params.mock && mockEnabled) {
          setTimeout(() => {
            const returnedHeader = {
              "x-request-id": params.headers["x-request-id"],
            };
            if (typeof params.mock == "function") {
              res({
                data: params.mock(),
                error,
                headers: returnedHeader,
              });
            } else {
              res({
                data: params.mock,
                error,
                headers: returnedHeader,
              });
            }
          }, 1000);
        } else {
          rej(error);
        }
      });
  });
  return prom;
};

axios.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    const status = _.get(error, "response.status");
    if ("401" === `${status}`) {
      clearSession();
    }

    return Promise.reject(error);
  }
);

let token = "";
const getToken = () => {
  if (!token) {
    token = cookies.get("token");
  }
  return token;
};
const setToken = (tokenPassed) => {
  token = tokenPassed;
  if (token) {
    cookies.set("token", token);
  } else {
    cookies.remove("token");
  }
};
let user = null;
const setUser = (uu) => {
  user = uu;
};

const clearSession = () => {
  setToken(null);
  setUser(null);
  location.href = `${publicPath}/login`;
};

let constant = null;

const loadJS = (url) => {
  return new Promise((res, rej) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          res();
        }
      };
    } else {
      //其他浏览器
      script.onload = res;
      script.onerror = rej;
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  });
};

export default {
  publicPath,
  loadJS,

  getConst() {
    return new Promise((res, rej) => {
      if (constant) {
        res(constant);
      } else {
        ajax({
          api: "system/const",
        })
          .then((resp) => {
            constant = _.get(resp, "data");
            res(constant);
          })
          .catch(rej);
      }
    });
  },
  moneyRate(dingjia, shoujia) {
    const delta = dingjia - shoujia;
    const rate = delta / dingjia;
    const value = Math.floor((1 - rate) * 100) / 10;
    return value;
  },

  saveSession(token, user) {
    setToken(token);
    setUser(user);
  },

  user() {
    return new Promise((res, rej) => {
      if (user) {
        res(user);
      } else {
        ajax({
          api: "user/token/parse",
        })
          .then((resp) => {
            user = _.get(resp, "data");
            console.log(user);
            res(user);
          })
          .catch((ex) => rej(ex));
      }
    });
  },
  isAdmin() {
    const username = _.get(user, "username", false);
    return username === "admin";
  },
  clearSession,
  setToken,
  getToken,

  numberFormat,
  ajax,
  getMemberInfoById(id) {
    return ajax({
      api: `member/${id}`,
    });
  },
};

Date.prototype.format = function (fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

function numberFormat(number, decimals, dec_point, thousands_sep) {
  if (decimals) {
    number = parseFloat(number).toFixed(decimals); //转化为Float浮点型 并保留指定小数位
  }
  dec_point = dec_point ? dec_point : ".";
  thousands_sep = thousands_sep ? thousands_sep : ",";
  var source = String(number).split(".");
  source[0] = source[0].replace(
    new RegExp("(\\d)(?=(\\d{3})+$)", "ig"),
    "$1" + thousands_sep
  );
  return source.join(dec_point);
}
