import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import CameraCard from "./Components/CameraCard/CameraCard"
import Camera from "@/interfaces/Camera"
import { Plus } from "lucide-react"

export default function Home() {
    const [cameras, setCameras] = useState<Camera[]>([
        {
            id: "1",
            status: "idle",
            ip: "192.168.1.100",
            file: null,
            preview: null,
        },
    ])

    const generateIP = () => {
        const firstOctet = Math.floor(Math.random() * 256)
        const secondOctet = Math.floor(Math.random() * 256)
        const thirdOctet = Math.floor(Math.random() * 256)
        const fourthOctet = Math.floor(Math.random() * 256)
        return `${firstOctet}.${secondOctet}.${thirdOctet}.${fourthOctet}`
    }

    const addCamera = () => {
        const newCamera: Camera = {
            id: Date.now().toString(),
            status: "idle",
            ip: generateIP(),
            file: null,
            preview: null,
        }
        setCameras([...cameras, newCamera])
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <Button onClick={addCamera} >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Camera
                </Button>
            </div>

            <ScrollArea className="whitespace-nowrap">
                <div className="flex flex-row-2 w-max space-x-4 py-4">
                    {cameras.map((camera) => (
                        <CameraCard key={camera.id} camera={camera} />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

