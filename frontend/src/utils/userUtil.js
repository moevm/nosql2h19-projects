import axios from 'axios';

export default class UserUtil {
    static async getUserList(fio){
        return await axios.get("http://localhost:5000/user/list", {params: {fio: (fio !== "" ? fio : undefined)}})
    }

    static async getUser(id){
        return await axios.get("http://localhost:5000/user/get", {params: {id: id}})
    }

    static async addUser(user){
        return await axios.post("http://localhost:5000/user/create", user)
    }

    static async updateUser(user){
        return await axios.post("http://localhost:5000/user/update", user)
    }

    static async deleteUser(id){
        return await axios.post("http://localhost:5000/user/delete", {_id: id})
    }
}