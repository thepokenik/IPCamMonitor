export default interface Camera {
    id: string
    status: CameraStatus
    ip: string | null
    port: number | null
    file: File | Blob | null
    preview: string | null
}

export enum CameraStatus {
    Idle = 'idle',
    Streaming = 'streaming',
    Loading = 'loading',
    Error = 'error'
}