import { useEffect, useState } from "react"
import ZoomControl from "../ZoomControl"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type TProps = {
    setScaling: React.Dispatch<React.SetStateAction<[number, number]>>
}

export const RightOperationSidebar = ({ setScaling }: TProps) => {
    const [zoom, setZoom] = useState<number>(100);
    const [flip, setFlip] = useState<boolean>(false)

    useEffect(() => {
        const flipping = flip ? -zoom / 100 : zoom / 100
        setScaling(() => [flipping, flipping])
    }, [flip, setScaling, zoom])

    return <div className="basis-1/3 bg-indigo-100 border-2 border-indigo-400 rounded-md p-4 flex flex-col justify-center shadow-md">
        <div className="space-y-2">
            <label className="text-sm font-medium">Scale</label>
            <ZoomControl
                onZoom={setZoom}
                min={10}
                max={200}
                step={10}
                defaultZoom={100}
            />
        </div>
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
                <Switch id="flip-mode"
                    checked={flip}
                    onCheckedChange={(value) => setFlip(value)}
                />
                <Label htmlFor="flop-mode">flip Item</Label>
            </div>

        </div>

    </div>
}