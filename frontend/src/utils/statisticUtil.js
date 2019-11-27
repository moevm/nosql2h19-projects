import axios from "axios";

export default class StatisticUtil {
    static async getClosestDeadlines() {
        return await axios.get("http://localhost:5000/statistic/closest-deadlines");
    }

    static async getEmployeeRating() {
        return await axios.get("http://localhost:5000/statistic/employee-rating");
    }
}