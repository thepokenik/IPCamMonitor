// Tauri Imports
import { open } from '@tauri-apps/plugin-dialog';

// Cameras Context
import Camera from "@/interfaces/Camera"
import { useCamera } from "@/contexts/CameraContext"
import { addCameraApi } from "@/services/camera"
import { CameraStatus } from "@/interfaces/Camera"

// UI Components
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

// Icons
import { Upload, Play, Square, Trash, Focus } from "lucide-react"

interface CameraCardProps {
    camera: Camera
}

const CameraCard: React.FC<CameraCardProps> = ({ camera }) => {
    const { removeCamera, updateCamera } = useCamera();

    const handleSelectFile = async () => {
        try {
            const selected = await open({
                multiple: false,
            });

            if (selected) {
                updateCamera(camera.id, { preview: selected });
            }
        } catch (error) {
            console.error("Error selecting file:", error);
        }
    };

    const handleAddCamera = async () => {
        try {
            if (!camera.preview || !camera.port) {
                throw new Error("Both video preview and port are required");
            }

            const data = await addCameraApi(camera);

            updateCamera(camera.id, { status: CameraStatus.Streaming });
            console.log(data);
        } catch (err) {
            console.error("Error starting camera:", err);
            updateCamera(camera.id, { status: CameraStatus.Error });
        }
    };

    const handleOpenCamera = () => {
        try {
            window.open(`http://localhost:${camera.port}`, "_blank");
        } catch (err) {
            console.error("Error opening camera:", err);
        }
    }

    const handleRemoveCamera = () => {
        try {
            removeCamera(camera);
            console.log("Camera removed successfully.");
        } catch (err) {
            console.error("Error stopping camera:", err);
        }
    };

    return (
        <Card key={camera.id} className="flex-none w-[calc(70%-8px)] ">
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Camera {camera.id}</CardTitle>
                    <Badge variant={camera.status === CameraStatus.Streaming ? "default" : "secondary"} className="capitalize">
                        {camera.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="relative aspect-video">
                    {camera.preview ? (
                        <img
                            src={"https://placehold.co/600x400"}
                            alt={`Camera ${camera.id} preview`}
                            className="w-full h-full object-cover rounded"
                        />
                    ) : (
                        <div>

                            <Button
                                variant="outline"
                                className="absolute w-full h-full"
                                onClick={handleSelectFile}
                            >
                                Select your files
                                <Upload className="w-8 h-8" />
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="grid gap-2 p-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Enter the Port Number"
                        value={camera.port || ""}
                        onChange={(e) => updateCamera(camera.id, { port: parseInt(e.target.value) })}
                    />
                    <Input
                        placeholder="Enter the FPS"
                        value={camera.fps || ""}
                        onChange={(e) => updateCamera(camera.id, { fps: parseInt(e.target.value) })}
                    />
                    <Button
                        disabled={!camera.port || !camera.preview}
                        onClick={handleAddCamera}
                    >
                        {camera.status === "streaming" ? (
                            <Square />
                        ) : (
                            <Play />
                        )}
                    </Button>
                    <Button
                        disabled={camera.status !== CameraStatus.Streaming}
                        variant="secondary"
                        onClick={handleOpenCamera}
                    >
                        <Focus />
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleRemoveCamera}
                    >
                        <Trash />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default CameraCard;