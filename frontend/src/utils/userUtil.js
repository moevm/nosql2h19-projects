import axios from 'axios';

export default class UserUtil {
    static async getUserList(){
        return await axios.get("http://localhost:5000/user/list")
    }
}