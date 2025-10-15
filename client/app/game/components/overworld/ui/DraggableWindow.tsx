import React, { useEffect, useRef, useState } from 'react';

const DraggableWindow = ({
	windowTitle, initPosition, showTitle = true, children
}: { 
	windowTitle: string, initPosition: { x: number, y: number }, showTitle?: boolean, children: React.ReactNode
}) => {
	const [position, setPosition] = useState(initPosition);
	const [isDragging, setIsDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
	const windowRef = useRef<HTMLDivElement>(null);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		setDragOffset({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		});
		e.preventDefault();
	};

	// Use effect to handle document-level mouse events
	useEffect(() => {
		if (!isDragging) return;

		const handleMouseMove = (e: MouseEvent) => {
			setPosition({
				x: e.clientX - dragOffset.x,
				y: e.clientY - dragOffset.y,
			});
		};

		const handleMouseUp = () => {
			setIsDragging(false);
		};

		// Attach listeners to document for global tracking
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);

		// Cleanup
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging, dragOffset]);

	return (
		<div
			ref={windowRef}
			style={{
				position: 'absolute',
				left: position.x,
				top: position.y,
				pointerEvents: 'auto',
				userSelect: 'none',
			}}
			className="border-2 border-gray-300 rounded-md"
		>
			<div
				className={`w-full bg-gray-200 border-b-2 border-gray-300 ${showTitle ? 'flex items-center justify-center h-8' : 'h-5'}`}
				style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
				onMouseDown={handleMouseDown}
			>
				{showTitle && <h1 className="text-xl text-gray-600">{windowTitle}</h1>}
			</div>
			{children}
		</div>
	);
};

export default DraggableWindow;