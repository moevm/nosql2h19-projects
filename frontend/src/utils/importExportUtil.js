import axios from 'axios'

export default class ImportExportUtil {
    static async importDatabase(file) {
        const formData = new FormData();
        formData.append('file', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return await axios.post('http://localhost:5000/import', formData, config)
    }

    static async exportDatabase() {
        window.open('http://localhost:5000/export', '_blank');
    }
}