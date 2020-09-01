import axios from "axios";

const API_URL = 'https:/ipfs.infura.io/ipfs/';

class IPFS {
  getData(hash) {
    return axios
      .get(API_URL + hash)
      .then(response => {
        return response.data;
      });
  }

}

export default new IPFS();