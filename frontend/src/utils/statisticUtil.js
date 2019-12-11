import axios from "axios";

export default class StatisticUtil {
    static async getClosestDeadlines() {
        return await axios.get("http://localhost:5000/statistic/closest-deadlines");
    }

    static async getEmployeeRating() {
        return await axios.get("http://localhost:5000/statistic/employee-rating");
    }

    static async getChartData(formData) {
        const {data} = await axios.get("http://localhost:5000/statistic/tasks-chart", {
            params: formData
        });
        let _labels = [];
        let _data = [];
        data.forEach(d => {
            _labels.push(d.field);
            _data.push(d.value);
        });
        return {labels: _labels, data: _data};
    }
}