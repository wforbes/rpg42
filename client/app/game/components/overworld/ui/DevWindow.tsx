import DraggableWindow from "./DraggableWindow"

export const DevWindow = ({ initPosition }: { initPosition: { x: number, y: number } }) => {
	return (
		<DraggableWindow
			windowTitle="Dev"
			initPosition={initPosition}
		>
			<div className="bg-white p-4">
				<h1 className="text-2xl font-bold">Dev</h1>
			</div>
		</DraggableWindow>
	)
}