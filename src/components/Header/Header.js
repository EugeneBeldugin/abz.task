import { Link } from "react-scroll"
import { Button } from "../Button/Button"

export const Header = () => {
    return (
        <header className="header">
            <div className="header__block">
                <img src="./Assets/Logo.svg" alt="logo"/>
                <div className="header__btn-wrapper">
                    <Link to="users" smooth={true} duration={1000}>
                        <Button text="Users"/>
                    </Link>
                    <Link to="sign-in" smooth={true} duration={1000}>
                        <Button text="Sign up"/>
                    </Link>
                </div>
            </div>
        </header>
    )
}