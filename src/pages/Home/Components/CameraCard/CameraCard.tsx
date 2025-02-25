import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CameraStatus } from "@/interfaces/Camera"
import { Upload, Play, Square, Trash } from "lucide-react"

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

import Camera from "@/interfaces/Camera"
import { useCamera } from "@/contexts/CameraContext"

interface CameraCardProps {
    camera: Camera
}

const CameraCard: React.FC<CameraCardProps> = ({ camera }) => {
    const { removeCamera, updateCamera } = useCamera();

    return (
        <Card key={camera.id} className="flex-none w-[calc(70%-8px)] ">
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Camera {camera.id}</CardTitle>
                    <Badge variant={camera.status === CameraStatus.Streaming ? "default" : "secondary"} className="capitalize">
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
                                    updateCamera(camera.id, { file: file })
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
                        onClick={() => updateCamera(camera.id, { status: camera.status === CameraStatus.Streaming ? CameraStatus.Idle : CameraStatus.Streaming })}
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