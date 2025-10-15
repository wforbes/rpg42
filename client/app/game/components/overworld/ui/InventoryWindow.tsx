import DraggableWindow from "./DraggableWindow"

export const InventoryWindow = ({ initPosition }: { initPosition: { x: number, y: number } }) => {
	return (
		<DraggableWindow
					windowTitle="Inventory"
					initPosition={initPosition}
				>
					<div className="bg-white p-4">
						<div className="grid grid-cols-4 gap-2">
							{[...Array(16)].map((_, index) => (
								<div key={index} className="bg-gray-200 p-2 rounded-md w-20 h-20">
									<h2 className="text-lg font-bold"></h2>
								</div>
							))}
						</div>
					</div>
				</DraggableWindow>
	);
}