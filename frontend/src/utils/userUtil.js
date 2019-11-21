import axios from 'axios';

export default class UserUtil {
    static async getUserList(fio){
        return await axios.get("http://localhost:5000/user/list", {params: {fio: (fio !== "" ? fio : undefined)}})
    }
}