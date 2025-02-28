import Camera from '@/interfaces/Camera';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const addCameraApi = async (camera: Camera): Promise<any> => {
    const params = {
        video: camera?.preview || '',
        port: (camera?.port ?? '').toString(),
        fps: (camera?.fps ?? 15),
    };

    try {
        const response = await api.get('/start_camera', { params });
        return response.data;
    } catch (error) {
        console.error("Erro ao iniciar a câmera:", error);
        throw error;
    }
};

export const removeCameraApi = async (camera: Camera): Promise<any> => {
    const params = {
        video: camera?.preview || '',
        port: (camera?.port ?? '').toString(),
    };

    try {
        const response = await api.get('/stop_camera', { params });
        return response.data;
    } catch (error) {
        console.error("Erro ao parar a câmera:", error);
        throw error;
    }
};

export default api;
