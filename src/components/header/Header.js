import HeaderLogo from "./header-logo/HeaderLogo";
import HeaderBtn from "./header-btn/HeaderBtn";

const Header = ({ onClick }) => {
	return (
		<header className='header'>
			<div className='header__wrapper'>
				<HeaderLogo />
				<HeaderBtn onClick={onClick} />
			</div>
		</header>
	);

}
export default Header;