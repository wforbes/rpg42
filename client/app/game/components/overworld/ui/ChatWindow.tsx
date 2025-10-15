import DraggableWindow from "./DraggableWindow"

export const ChatWindow = ({ initPosition }: { initPosition: { x: number, y: number } }) => {
	return (
		<DraggableWindow
			windowTitle="Chat"
			initPosition={initPosition}
		>
			<div className="bg-white p-4 w-220 h-75">
				<h1 className="text-2xl font-bold">Chat</h1>
			</div>
		</DraggableWindow>
	)
}