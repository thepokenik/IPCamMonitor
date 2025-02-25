export default interface Camera {
    id: string
    status: CameraStatus
    ip: string
    file: File | null
    preview: string | null
}

export enum CameraStatus {
    Idle = 'idle',
    Streaming = 'streaming'
}