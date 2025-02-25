export default interface Camera {
    id: string
    status: "idle" | "streaming"
    ip: string
    file: File | null
    preview: string | null
}