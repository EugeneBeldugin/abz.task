import { useEffect, useState } from "react"
import { Button } from "../Button/Button"
import { UserCard } from "../UserCard/UserCard";
import { Element } from "react-scroll"

const sortUsersByDate = (a, b) => {
    return b.registration_timestamp - a.registration_timestamp
}

export const UsersBlock = ({isUpdate}) => {
    const [users, setUsers] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [usersCount, setUsersCount] = useState(6);
    const [isAllUsers, setIsAllUsers] = useState(false)

    useEffect(() => {
        fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${usersCount}`)
            .then(data => data.json())
            .then(data => {
                if (data.success) {
                    setUsers(data.users.sort(sortUsersByDate))
                    setIsLoading(false);
                    setIsError(false);
                } else {
                    setIsError(true);
                    setIsLoading(false);
                }
            })
    }, [usersCount, isUpdate])

    useEffect(() => {
        if (users.length === 75) {
            setIsAllUsers(true)
        }
    }, [users])

    useEffect(() => {
        setUsersCount(6)
    }, [isUpdate])

    const onClick = () => {
        setUsersCount(usersCount + 6)
    }

    return (
        <section className="block">
            <Element name="users"></Element>
            <h2 className="title">Working with GET request</h2>

            {isLoading && <img className="preloader" alt="loading" src="./Assets/Preloader.png" />}

            {isError && <p>Something goes wrong, try later.</p>}

            <div className="block--users">
                { users?.map((user) => <UserCard key={user.id} user={user}/>) }
            </div>

            <Button disabled={isAllUsers} onClick={onClick} text="Show more" />
        </section>
    )
}