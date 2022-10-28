const sliceText = (text) => {
    let sliced = text.slice(0, 28);
    if (sliced.length < text.length) {
        return sliced += '...';
    }
    return text;
}

export const UserCard = ({ user }) => {
    const { email, name, phone, position, photo } = user;
    return (
        <div className="user-card">
            <img className="user-card__photo" src={photo} alt="img" />
            <span className="text user-card__name">{sliceText(name)}</span>
            <span className="text">{sliceText(position)}</span>
            <span className="text">{sliceText(email)}</span>
            <span className="text">{phone}</span>
        </div>
    )
}