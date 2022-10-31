import { InfoRow } from "./InfoRow";

export const UserCard = ({ user }) => {
    const { email, name, phone, position, photo } = user;

    return (
        <div className="user-card">
            <img className="user-card__photo" src={photo} alt="img" />
            <InfoRow className="user-card__name user-info" infoText={name} />
            <InfoRow className="user-info" infoText={position} />
            <InfoRow className="user-info" infoText={email} />
            <InfoRow className="user-info" infoText={phone} />
        </div>
    )
}