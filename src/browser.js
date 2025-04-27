import api from "./api";
import auth from "./auth";
import memo from "./auth/memo";
import broadcast from "./broadcast";
import config from "./config";
import formatterFactory from "./formatter";
import utils from "./utils";

const formatter = formatterFactory(api);

const steem = {
  api,
  auth,
  memo,
  broadcast,
  config,
  formatter,
  utils
};

if (typeof window !== "undefined") {
  window.steem = steem;
}

if (typeof global !== "undefined") {
  global.steem = steem;
}

export default steem;
