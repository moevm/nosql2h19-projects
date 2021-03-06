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

    static async getProject(id) {
        return await axios.get("http://localhost:5000/project/get", {params: {id: id}})
    }

    static async addProject(project) {
        return await axios.post("http://localhost:5000/project/create", project)
    }

    static async updateProject(project) {
        return await axios.post("http://localhost:5000/project/update", project)
    }

    static async deleteProject(id) {
        return await axios.post("http://localhost:5000/project/delete", {_id: id})
    }

    static async addProjectParticipant(participant) {
        return await axios.post("http://localhost:5000/project/create-participant", participant)
    }

    static async updateProjectParticipant(participant) {
        return await axios.post("http://localhost:5000/project/update-participant", participant)
    }

    static async deleteProjectParticipant(participant) {
        return await axios.post("http://localhost:5000/project/delete-participant", participant)
    }

    static async getProjectParticipant(projectId, participantId) {
        return await axios.get("http://localhost:5000/project/get-participant", {
                params: {projectId, participantId}
            }
        )
    }

    static async addProjectTask(task) {
        return await axios.post("http://localhost:5000/project/create-task", task)
    }

    static async updateProjectTask(task) {
        return await axios.post("http://localhost:5000/project/update-task", task)
    }

    static async deleteProjectTask(task) {
        return await axios.post("http://localhost:5000/project/delete-task", task)
    }

    static async getProjectTask(projectId, taskId) {
        return await axios.get("http://localhost:5000/project/get-task", {
                params: {projectId, taskId}
            }
        )
    }

}