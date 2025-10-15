import DraggableWindow from "./DraggableWindow"

export const ActionsWindow = ({ initPosition }: { initPosition: { x: number, y: number } }) => {
	return (
		<DraggableWindow
				windowTitle="Actions"
				initPosition={initPosition}
			>
				<div className="flex flex-col bg-gray-700 p-2 rounded-md border border-gray-600 w-136 h-25">
					<div className="flex flex-row gap-2 justify-center">
						{[...Array(6)].map((_, index) => (
						<div key={index} className="bg-gray-300 p-2 rounded-md w-20 h-20">
							
							<div className="flex text-lg font-bold w-full text-center">{index + 1}</div>
						</div>
						))}
					</div>
				</div>
			</DraggableWindow>
	)
}