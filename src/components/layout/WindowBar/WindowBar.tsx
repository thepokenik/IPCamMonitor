import { useEffect, useState } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { X, View } from 'lucide-react';
import { Button } from '@/components/ui/button';

import SettingsModal from './Components/Settings/Settings';

const WindowBar = () => {
    const [appWindow, setAppWindow] = useState<ReturnType<typeof getCurrentWindow> | null>(null);

    useEffect(() => {
        setAppWindow(getCurrentWindow());
    }, []);

    const closeWindow = () => {
        console.log('Closing window...'); // Check if this logs
        try {
            appWindow?.close();
        } catch (error) {
            console.error('Error closing window:', error);
        }
    };

    return (
        <div data-tauri-drag-region className="flex w-full" style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}>
            <div className="flex gap-2 items-center w-full">
                <View className="text-primary" />
                <div className="text-lg font-semibold">Visage</div>
            </div>
            <div className="flex justify-end w-full">
                <SettingsModal />
                <Button onClick={closeWindow} variant="ghost" size="icon" className="hover:text-primary">
                    <X />
                </Button>
            </div>
        </div>
    );
};

export default WindowBar;
