import { DevWindow } from "./DevWindow";
import { ChatWindow } from "./ChatWindow";
import { VitalsWindow } from "./VitalsWindow";
import { ActionsWindow } from "./ActionsWindow";
import { InventoryWindow } from "./InventoryWindow";

export const OverworldUI = ({ inventoryOpen }: { inventoryOpen: boolean }) => {
	
	return (
		<>
			<DevWindow initPosition={{ x: (window.innerWidth - 250), y: 20 }}/>
			<ChatWindow initPosition={{ x: window.innerWidth - 900, y: window.innerHeight - 400 }}/>
			<VitalsWindow initPosition={{ x: (window.innerWidth / 2) - 100, y: 20 }}/>
			<ActionsWindow initPosition={{ x: (window.innerWidth / 2) - 272, y: window.innerHeight - 200 }}/>
			
			{inventoryOpen && (
				<InventoryWindow initPosition={{ x: (window.innerWidth / 2) - 200, y: (window.innerHeight / 2) - 200 }}/>
			)}
		</>
	);
};