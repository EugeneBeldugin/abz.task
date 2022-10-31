import { useEffect } from "react";
import { useState } from "react";

export const Input = ({ errorType, text, helpText, type, idName, onChange, errorText }) => {
    const [isActive, setIsActive] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (errorType === idName) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    }, [errorType, idName])

    return (
        <div className="main-form__group">
            <label 
                style={isError ? { color: '#CB3D40' } : null} 
                className={isActive ? ' main-form__label main-form__label--active' : 'main-form__label'} 
                htmlFor={idName}>{text}
            </label>

            <input 
                onChange={e => onChange(e.target.value)} 
                onBlur={(e) => e.target.value === '' && setIsActive(false)} 
                onFocus={() => setIsActive(true)} 
                style={isError ? { borderColor: '#CB3D40' } : null} 
                className="field" 
                id={idName} 
                type={type} 
                name={idName}
            />

            {isError ?
                <div className="helper-text error">{errorText}</div>
                :
                <div className="helper-text">{helpText}</div>
            }

        </div>
    )
}