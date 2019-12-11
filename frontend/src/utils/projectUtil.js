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

    static async getNotProjectParticipants(projectId) {
        return await axios.get("http://localhost:5000/project/not-participants",
            {params: {id: projectId}})
    }

    static async getProjectTasks(projectId) {
        return await axios.get("http://localhost:5000/project/tasks",
            {params: {id: projectId}})
    }

    static async getProject(id){
        return await axios.get("http://localhost:5000/project/get", {params: {id: id}})
    }

    static async addProject(project){
        return await axios.post("http://localhost:5000/project/create", project)
    }

    static async updateProject(project){
        return await axios.post("http://localhost:5000/project/update", project)
    }

    static async deleteProject(id) {
        return await axios.post("http://localhost:5000/project/delete", {_id: id})
    }

    static async addProjectParticipant(participant, projectId){
        return await axios.post("http://localhost:5000/project/create", participant, projectId)
    }

}