import subprocess
from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import sys
import os

if getattr(sys, 'frozen', False):
    script_dir = sys._MEIPASS  
else:
    script_dir = os.path.dirname(os.path.abspath(__file__))

sys.path.append(os.path.join(script_dir, "modules"))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
processes = {}

@app.get("/start_camera")
async def start_camera(video: str = Query(...), port: str = Query(...), fps: int = Query(15)):
    """
        Start a camera server that streams video from a file.

        Args:
            video (str): Path to the video file.
            port (str): Port to run the camera server on.
            fps (int): Frames per second to stream the video at.
    """
    if (video, port) in processes:
        raise HTTPException(status_code=409, detail="Camera server already running")

    camera_server_path = os.path.join(script_dir, "modules", "camera_server.py")
    process = subprocess.Popen(["python", camera_server_path, video, str(port), str(fps)])
    processes[(video, port)] = process

    return JSONResponse({
        "message": "Camera server started",
        "video": video,
        "port": port,
        "pid": process.pid
    })

@app.get("/stop_camera")
async def stop_camera(video: str = Query(...), port: str = Query(...)):
    """
        Stop a camera server that is streaming video from a file.

        Args:
            video (str): Path to the video file.
            port (str): Port the camera server is running on.
    """
    process = processes.get((video, port))
    if process:
        process.kill()
        del processes[(video, port)]
        return JSONResponse({
            "message": "Camera stopped successfully",
            "video": video,
            "port": port
        })
    raise HTTPException(status_code=404, detail="Camera process not found")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)