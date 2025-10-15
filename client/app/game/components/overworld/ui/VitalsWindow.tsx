import { Progress } from "@mantine/core"
import DraggableWindow from "./DraggableWindow"

export const VitalsWindow = ({ initPosition }: { initPosition: { x: number, y: number } }) => {
	return (
		<DraggableWindow
			windowTitle="Health"
			initPosition={initPosition}
		>
			<div className="flex flex-col w-50">
				<Progress color="red" size="xl" value={100} />
			</div>
		</DraggableWindow>
	)
}