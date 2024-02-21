import axios from "axios";
import { localPort } from "./constants";

export async function callApiToGetAccountBalance() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${localPort}/user/funds`
  };

  return await axios(config);
}
