import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Play, Square, Trash } from "lucide-react"
import { useState } from "react"

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

import Camera from "@/interfaces/Camera"

interface CameraCardProps {
    camera: Camera
}

const CameraCard: React.FC<CameraCardProps> = ({ camera }) => {
    const [cameras, setCameras] = useState<Camera[]>([]);

    const handleFileUpload = (id: string, file: File) => {
        const preview = URL.createObjectURL(file)
        setCameras(
            cameras.map((camera) =>
                camera.id === id
                    ? {
                        ...camera,
                        file,
                        preview,
                        status: "idle",
                    }
                    : camera,
            ),
        )
    }

    const toggleStream = (id: string) => {
        setCameras(
            cameras.map((camera) =>
                camera.id === id
                    ? {
                        ...camera,
                        status: camera.status === "idle" ? "streaming" : "idle",
                    }
                    : camera,
            ),
        )
    }

    const removeCamera = (id: string) => {
        setCameras(cameras.filter((camera) => camera.id !== id))
    }

    return (
        <Card key={camera.id} className="overflow-hidden">
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Camera {camera.id}</CardTitle>
                    <Badge variant={camera.status === "streaming" ? "default" : "secondary"} className="capitalize">
                        {camera.status}
                    </Badge>
                </div>
                <div className="text-sm text-muted-foreground">IP: {camera.ip}</div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="relative aspect-video bg-muted">
                    {camera.preview ? (
                        <img
                            src={camera.preview || "/placeholder.svg"}
                            alt={`Camera ${camera.id} preview`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div>
                            <FilePond allowMultiple={true} credits={false} />
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="grid gap-2 p-4">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                            const input = document.createElement("input")
                            input.type = "file"
                            input.accept = "image/*,video/*"
                            input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement).files?.[0]
                                if (file) {
                                    handleFileUpload(camera.id, file)
                                }
                            }
                            input.click()
                        }}
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Media
                    </Button>
                    <Button
                        variant="default"
                        disabled={!camera.file}
                        onClick={() => toggleStream(camera.id)}
                    >
                        {camera.status === "streaming" ? (
                            <Square />
                        ) : (
                            <Play />
                        )}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => removeCamera(camera.id)}
                    >
                        <Trash />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default CameraCard;