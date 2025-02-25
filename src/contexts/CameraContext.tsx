import Camera from '@/interfaces/Camera';
import { createContext, useReducer, useContext, ReactNode } from 'react';

type Action =
    | { type: 'ADD_CAMERA'; payload: Camera }
    | { type: 'REMOVE_CAMERA'; payload: string }
    | { type: 'UPDATE_CAMERA'; payload: { id: string; data: Partial<Camera> } };

interface CameraState {
    cameras: Camera[];
}

const cameraReducer = (state: CameraState, action: Action): CameraState => {
    switch (action.type) {
        case 'ADD_CAMERA':
            return { cameras: [...state.cameras, action.payload] };
        case 'REMOVE_CAMERA':
            return { cameras: state.cameras.filter(camera => camera.id !== action.payload) };
        case 'UPDATE_CAMERA':
            return {
                cameras: state.cameras.map(camera =>
                    camera.id === action.payload.id ? { ...camera, ...action.payload.data } : camera
                )
            };
        default:
            return state;
    }
};

const initialState: CameraState = {
    cameras: []
};

const CameraContext = createContext<{
    cameras: Camera[];
    addCamera: (camera: Camera) => void;
    removeCamera: (id: string) => void;
    updateCamera: (id: string, data: Partial<Camera>) => void;
} | undefined>(undefined);

export const CameraProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cameraReducer, initialState);

    const addCamera = (camera: Camera) => {
        dispatch({ type: 'ADD_CAMERA', payload: camera });
    };

    const removeCamera = (id: string) => {
        dispatch({ type: 'REMOVE_CAMERA', payload: id });
    };

    const updateCamera = (id: string, data: Partial<Camera>) => {
        dispatch({ type: 'UPDATE_CAMERA', payload: { id, data } });
    };

    return (
        <CameraContext.Provider value={{ cameras: state.cameras, addCamera, removeCamera, updateCamera }}>
            {children}
        </CameraContext.Provider>
    );
};

export const useCamera = () => {
    const context = useContext(CameraContext);
    if (!context) {
        throw new Error('useCamera must be used within a CameraProvider');
    }
    return context;
};
