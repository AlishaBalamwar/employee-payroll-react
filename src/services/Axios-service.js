import axios from 'axios'

class AxiosService{
    postService(url = '', payload = null, tokenRequired = false, httpOptions = null){
        return axios.post(url, payload, tokenRequired && httpOptions);
    }

    getService(url = '', payload = null, tokenRequired = false, httpOptions = null){
        return axios.post(url, payload, tokenRequired && httpOptions);
    }
}
export default new AxiosService()