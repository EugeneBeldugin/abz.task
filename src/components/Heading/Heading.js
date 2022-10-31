import { Button } from "../Button/Button"
import { Link } from "react-scroll"

export const Heading = () => {
    return (
        <section className="banner">
            <div className="container">
                <div className="banner__item">
                    <h1 className="title">Test assignment for front-end developer</h1>
                    <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
                    <Link to="sign-in" smooth={true} duration={1000}>
                        <Button text="Sign up" />
                    </Link>
                </div>
            </div>
        </section>
    )
}