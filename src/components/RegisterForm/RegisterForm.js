import { useEffect, useState } from "react"
import { Button } from "../Button/Button"
import { SelectForm } from "../SelectForm/SelectForm"
import { Element } from "react-scroll"
import { Input } from "../Input/Input";

const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const isPhoneNumber = number => /^\+[0-9]\d{11}/g.test(number.toString());

const isName = name => /^[a-z ,.'-]+$/i.test(name);

const getFormData = (object) => {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}

const validateImg = img => {
    if (!img) return false;
    if (img.size > 700 * 700) {
        console.log(img.type);
        console.log(img.size);
        return false;
    }
    if (img.type === 'image/jpeg' || img.type === 'image/jpg') {
        return true;
    }
}

export const RegisterForm = ({ onSuccess }) => {
    const [newUser, setNewUser] = useState({});
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userPhone, setUserPhone] = useState();
    const [selectedOptionID, setSelectedOptionID] = useState(1);
    const [images, setImages] = useState([]);

    const [inputError, setInputError] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [token, setToken] = useState();

    useEffect(() => {
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
            .then(data => data.json())
            .then(data => {
                if (data.success) {
                    setToken(data.token)
                }
            })
    }, [])

    const onImageChange = (e) => {
        if (!validateImg(e.target.files[0])) {
            setInputError('img');
        } else {
            setImages([...e.target.files]);
            setInputError('');
        }
    }

    const handleInputName = (val) => {
        if (!isName(val)) {
            setInputError('name');
        } else {
            setUserName(val);
            setInputError('');
        }
    }
    const handleInputEmail = (val) => {
        if (!isEmail(val)) {
            setInputError('email');
        } else {
            setUserEmail(val);
            setInputError('');
        }
    }
    const handleInputPhone = (val) => {
        if (!isPhoneNumber(val)) {
            setInputError('phone')
        } else {
            setUserPhone(val);
            setInputError('');
        }
    }

    useEffect(() => {
        if (userName && userEmail && userPhone && images[0]) {
            setInputError('')
            setNewUser({
                name: userName,
                email: userEmail,
                phone: userPhone,
                photo: images[0],
                position_id: Number(selectedOptionID)
            })
            setIsValid(true);
        }
    }, [userName, userEmail, userPhone, images, selectedOptionID])

    const submitForm = (e) => {
        e.preventDefault()
        const data = getFormData(newUser);
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
            method: 'POST',
            body: data,
            headers: {
                'Token': token,
            }
        })
            .then(data => data.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    onSuccess(true);
                }
            })
    }

    return (
        < section id="signup" >
            <div className="container">
                <Element name="sign-in"></Element>
                <h2 className="title">Working with POST request</h2>
                <form onSubmit={ isValid ? (e) => submitForm(e) : (e) => e.preventDefault() } className="main-form">
                    <Input
                        errorType={inputError}
                        text={"Name"}
                        type={"text"}
                        idName={"name"}
                        onChange={handleInputName}
                        errorText={'Name need to be without numbers'}
                    />
                    <Input
                        errorType={inputError}
                        text={"Email"}
                        type={"email"}
                        idName={"email"}
                        onChange={handleInputEmail}
                        errorText={'Enter pleas valid email'}
                    />
                    <Input
                        errorType={inputError}
                        text={"Phone"}
                        type={"tel"}
                        idName={"phone"}
                        onChange={handleInputPhone}
                        errorText={'Not valid phone'}
                        helpText={'+380XXXXXXXXX'}
                    />
                    <SelectForm setOption={setSelectedOptionID} />
                    <div className="upload-group">
                        <label htmlFor="upload" className="upload_label">
                            <div className="form__upload-btn field-error">Upload</div>

                            {
                                images[0]?.name ?
                                    <div className="text--placeholder field-error">{images[0].name}</div>
                                    :
                                    <div className="text--placeholder field-error">Upload your photo</div>
                            }

                            <input onChange={onImageChange} id="upload" type="file" accept=".jpg, .jpeg" className="upload-input" />
                        </label>
                        {inputError === 'img' && <div className="helper-text error">Only .jpeg or .jpg files with 70x70 size min</div>}
                    </div>
                    <Button disabled={!isValid} text="Sign up" />
                </form>
            </div>
        </section >
    )
}