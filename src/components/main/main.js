import "./Main.css";

import MainBtn from "./main-btn/MainBtn";
import MainModal from "./main-modal/MainModal";

import { useAuthStore } from "../../features/useAuthStore";

const Main = ({ isOpen, onClose, onClick }) => {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const email = useAuthStore((state) => state.email);

	return (
		<main className="main">
			<section className="main__wrapper">
				<h2 className="main__title">   {isLoggedIn
					? `Welcome, ${email}!`
					: "Please log in to continue."}</h2>
				{!isLoggedIn && <MainBtn onClick={onClick} />}
				<MainModal isOpen={isOpen} onClose={onClose} />
			</section>
		</main>

	);
}

export default Main;