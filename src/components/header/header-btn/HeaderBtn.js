import { useAuthStore } from "../../../features/useAuthStore";

const HeaderBtn = ({ onClick }) => {
	const isLoggedIn = useAuthStore(state => state.isLoggedIn);
	const logout = useAuthStore(state => state.logout);

	const handleClick = () => {
		if (isLoggedIn) {
			logout();
		} else {
			onClick();
		}
	};

	return (
		<div className='header__block-btn'>
			<button className='header__btn' onClick={handleClick}>
				{isLoggedIn ? "Exit" : "Login"}
			</button>
		</div>
	);
}

export default HeaderBtn;