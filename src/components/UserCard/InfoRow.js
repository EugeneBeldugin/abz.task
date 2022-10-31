import { useEffect, useState } from "react";

const sliceText = (text, screenWidth) => {
    let numberSize = 0;

    if (+screenWidth > 1024) {
        numberSize = 38;
    } else if (+screenWidth === 1024) {
        numberSize = 28;
    } else if (+screenWidth <= 768) {
        numberSize = 35;
    }
    let sliced = text.slice(0, numberSize);
    if (sliced.length < text.length) {
        // return sliced += '...';
        return {
            text: sliced += '...',
            isSliced: true
        }
    }
    return {
        text,
        isSliced: false
    };
}

const getScreenWidth = () => {
    return window.screen.width;
}

export const InfoRow = ({className, infoText}) => {
    const [text, setText] = useState();
    const [isSliced, setIsSliced] = useState(false);
    
    useEffect(() => {
        const screen = getScreenWidth();
        const obj = sliceText(infoText, screen);

        setText(obj.text);
        setIsSliced(obj.isSliced);
    }, [infoText])

    return (
        <p className={className}>
            {text}
            { isSliced && <span className="popup">{infoText}</span>}
        </p>
    )
}