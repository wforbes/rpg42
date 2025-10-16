import { DevWindow } from "./DevWindow";
import { ChatWindow } from "./ChatWindow";
import { VitalsWindow } from "./VitalsWindow";
import { ActionsWindow } from "./ActionsWindow";
import { InventoryWindow } from "./InventoryWindow";
import { PauseMenu } from "./PauseMenu";

export const OverworldUI = ({ inventoryOpen, pauseMenuOpen }: { inventoryOpen: boolean, pauseMenuOpen: boolean }) => {

	return (
		<>
			{!pauseMenuOpen && (<>
				<DevWindow initPosition={{ x: (window.innerWidth - 250), y: 20 }} />
				<ChatWindow initPosition={{ x: window.innerWidth - 900, y: window.innerHeight - 400 }} />
				<VitalsWindow initPosition={{ x: (window.innerWidth / 2) - 100, y: 20 }} />
				<ActionsWindow initPosition={{ x: (window.innerWidth / 2) - 272, y: window.innerHeight - 200 }} />
			</>)}

			{inventoryOpen && !pauseMenuOpen && (
				<InventoryWindow initPosition={{ x: (window.innerWidth / 2) - 200, y: (window.innerHeight / 2) - 200 }} />
			)}

			{pauseMenuOpen && (
				<PauseMenu />
			)}
		</>
	);
};