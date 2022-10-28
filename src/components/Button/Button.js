export const Button = ({ text, disabled, onClick }) => {
    return (
        <>
            {
            disabled ?
            <button className="btn text btn--disabled">{text}</button>
            :
            <button onClick={onClick} className="btn text">{text}</button>
        }
        </>
    )
}