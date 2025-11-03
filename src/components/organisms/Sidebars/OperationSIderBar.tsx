import { Slider } from "@/components/ui/slider"
import type React from "react"
import { memo } from "react"
import { Input } from "../../ui/input"
import RotateCircle from "../RotateCricle/RotateCircle"

type TProps = {
    translations: [number, number]
    setTranslations: React.Dispatch<React.SetStateAction<[number, number]>>
    setRotation: React.Dispatch<React.SetStateAction<[number, number]>>
    rectWidth: number
    rectHeight: number
    setRectWidth: React.Dispatch<React.SetStateAction<number>>
    setRectHeight: React.Dispatch<React.SetStateAction<number>>

    maxX: number
    maxY: number
}

const OperationSideBarComponent: React.FC<TProps> = ({ translations, setTranslations, rectWidth, rectHeight, setRectWidth, setRectHeight, maxX, maxY, setRotation }) => {

    const onRotate = (normalized: { x: number; y: number; }) => {
        setRotation([normalized.x, normalized.y])
    }
    return <div className="w-full space-y-6">
        <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
                <label className="text-sm font-medium">Width</label>
                <Input
                    type="number"
                    min={1}
                    value={rectWidth}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const next = Math.max(1, Number(e.target.value) || 0)
                        setRectWidth(next)
                    }}
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Height</label>
                <Input
                    type="number"
                    min={1}
                    value={rectHeight}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const next = Math.max(1, Number(e.target.value) || 0)
                        setRectHeight(next)
                    }}
                />
            </div>
        </div>
        <div className="space-y-2">
            <h2 className="text-lg font-medium space-y-2">Translations</h2>
            <label className="text-sm font-medium">X AXIS</label>
            <Slider
                min={0}
                max={Math.max(0, maxX)}
                step={1}
                value={[translations[0]]}
                onValueChange={(value) => {
                    const [x] = value
                    setTranslations((prev) => [x, prev[1]])
                }}
            />
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium">Y AXIS</label>
            <Slider
                min={0}
                max={Math.max(0, maxY)}
                step={1}
                value={[translations[1]]}
                onValueChange={(value) => {
                    const [y] = value
                    setTranslations((prev) => [prev[0], y])
                }}
            />
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium">Rotation</label>
            <RotateCircle onRotate={onRotate} />
        </div>
    </div>
}

export const OperationSideBar = memo(OperationSideBarComponent)