import { useEffect, useState } from "react"
import { Button } from "../Button/Button"
import { SelectForm } from "../SelectForm/SelectForm"
import { Element } from "react-scroll"

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

    const [inputError, setInputError] = useState('');
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

    console.log(isValid);
    console.log(userName);
    console.log(userEmail);
    console.log(userPhone);
    console.log(images);
    console.log(selectedOptionID);

    return (
        <section className="block--post">
            <Element name="sign-in"></Element>
            <h2 className="title">Working with POST request</h2>
            <form onSubmit={isValid ? (e) => submitForm(e) : (e) => e.preventDefault()} className="block form">
                <input style={inputError === 'name' ? { border: 'solid 1px #CB3D40' } : null} onChange={(e) => handleInputName(e.target.value)} placeholder="Your name" className="form__input text" />
                {inputError === 'name' && <div className="error">Please enter valide name, without numbers</div>}

                <input style={inputError === 'email' ? { border: 'solid 1px #CB3D40' } : null} onChange={(e) => handleInputEmail(e.target.value)} placeholder="Email" className="form__input text" />
                {inputError === 'email' && <div className="error">This email is not valide</div>}

                <input style={inputError === 'phone' ? { border: 'solid 1px #CB3D40' } : null} onChange={(e) => handleInputPhone(e.target.value)} name="phone" placeholder="Phone" className="form__input text" />
                {inputError === 'phone' && <div className="error">Please enter valide phone number</div>}

                <label className="text text--phone-label" htmlFor="phone">+38 (XXX) XXX - XX - XX</label>
                <SelectForm setOption={setSelectedOptionID} />

                <label style={inputError === 'img' ? { border: 'solid 1px #CB3D40' } : null} htmlFor="upload" className="text upload_label upload-wrapper">
                    <span style={inputError === 'img' ? { border: 'solid 1px red' } : null} className="form__upload-btn text">Upload</span>
                    {
                        images[0]?.name ?
                            <span className="text text--placeholder">{images[0].name}</span>
                            :
                            <span className="text text--placeholder">Upload your photo</span>
                    }
                    <input onChange={onImageChange} id="upload" type="file" accept=".jpg, .jpeg" className="form__input upload-input text" />
                    {inputError === 'img' && <div className="error error--upload">Only .jpeg files none biger than 70x70</div>}
                </label>
                <Button disabled={!isValid} text="Sign up" />
            </form>
        </section>
    )
}