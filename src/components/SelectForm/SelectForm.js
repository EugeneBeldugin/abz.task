import { useEffect, useState } from "react"
import { Select } from "../Select/Select"

export const SelectForm = ({ setOption }) => {
    const [positions, setPositions] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState('')

    const onSelectClick = (name, id) => {
        setOption(id);
        setSelectedOption(name);
    }

    useEffect(() => {
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
            .then(data => data.json())
            .then(data => {
                if (data.success) {
                    setPositions(data.positions);
                    setSelectedOption(data.positions[0].name)
                    setIsLoading(false);
                    setIsError(false);
                } else {
                    setIsError(true);
                    setIsLoading(false);
                }
            })
    }, []) 
    return (
        <div className="select-wrapper">
            <span className="text text--select">Select your position</span>

            {isLoading && <p>Loading ...</p>}

            {isError && <p>Something goes wrong, try later.</p>}

            {positions?.map(({ name, id }) => <Select key={id} text={name} selected={selectedOption} id={id} onSelectClick={onSelectClick} />)}
        </div>
    )
}