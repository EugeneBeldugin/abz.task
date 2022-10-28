export const Select = ({ text, id, selected, onSelectClick }) => {
    return (
        <div onClick={() => onSelectClick(text, id)} className="checkbox-wrapper">
            {
                selected === text ?
                    <div className="checkbox checkbox--selected">
                        <div></div>
                    </div>
                    :
                    <div className="checkbox"></div>
            }
            <span className="text">{text}</span>
        </div>
    )
}