export const Select = ({ text, id, selected }) => {
    return (

        <div className="radio-item">

            {
                selected === id ?
                    <input className="custom-radio" name="position" type="radio" id={id} value={id} defaultChecked />
                    :
                    <input className="custom-radio" name="position" type="radio" id={id} value={id} />
            }

            <label htmlFor={id}>{text}</label>
        </div>
    )
}