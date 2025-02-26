import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import CameraCard from "./Components/CameraCard/CameraCard"
import { CameraStatus } from "@/interfaces/Camera"
import { Plus } from "lucide-react"
import { useCamera } from "@/contexts/CameraContext"

export default function Home() {
    const { cameras, addCamera } = useCamera();

    const handleAddCamera = () => {
        const newCamera = {
            id: Date.now().toString(),
            status: CameraStatus.Idle,
            ip: '',
            port: null,
            file: null,
            preview: null
        };
        addCamera(newCamera);
    };

    return (
        <div className="container mx-auto p-4 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <Button onClick={handleAddCamera} >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Camera
                </Button>
            </div>

            <ScrollArea className="whitespace-nowrap">
                <div className="flex w-[700px] gap-4 pb-4">
                    {cameras.map((camera) => (
                        <CameraCard key={camera.id} camera={camera} />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

