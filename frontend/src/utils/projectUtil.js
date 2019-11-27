import axios from 'axios';

export default class ProjectUtil {
    static async getProjectList(name) {
        return await axios.get("http://localhost:5000/project/list",
            {params: {name: (name !== "" ? name : undefined)}})
    }

    static async getProjectParticipants(projectId) {
        return await axios.get("http://localhost:5000/project/participants",
            {params: {id: projectId}})
    }

    static async getProjectTasks(projectId) {
        return await axios.get("http://localhost:5000/project/tasks",
            {params: {id: projectId}})
    }

    // static async getUser(id){
    //     return await axios.get("http://localhost:5000/user/get", {params: {id: id}})
    // }
    //
    // static async addUser(user){
    //     return await axios.post("http://localhost:5000/user/create", user)
    // }
    //
    // static async updateUser(user){
    //     return await axios.post("http://localhost:5000/user/update", user)
    // }
    //
    static async deleteProject(id) {
        return await axios.post("http://localhost:5000/project/delete", {_id: id})
    }
}