import { useState } from "react";

export const useMainModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	const show = () => setIsOpen(true);
	const hide = () => setIsOpen(false);

	return { isOpen, show, hide };
};