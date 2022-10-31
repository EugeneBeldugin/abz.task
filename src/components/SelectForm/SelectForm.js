import { useEffect, useState } from "react"
import { Select } from "../Select/Select"

export const SelectForm = ({ setOption }) => {
    const [positions, setPositions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('')

    const onSelectClick = (id) => {
        setOption(id);
        setSelectedOption(id);
    }

    useEffect(() => {
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
            .then(data => data.json())
            .then(data => {
                if (data.success) {
                    setPositions(data.positions);
                    setSelectedOption(data.positions[0].id)
                }
            })
    }, [])
    return (
        <>
            <p>Select your position</p>
            <div onChange={(e) => onSelectClick(e.target.value)} className="radio-select">
                {positions?.map(({ name, id }) => <Select key={id} text={name} selected={selectedOption} id={id} onSelectClick={onSelectClick} />)}
            </div>
        </>

    )
}