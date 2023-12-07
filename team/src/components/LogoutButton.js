import { useAuth0 } from '@auth0/auth0-react';


const LogoutButton = () => {
    const {logoutWithRedirect, isAunthenticated } = useAuth0();

    return(
        isAunthenticated && (
            <button onClick={() => logout()}>
                Logout
            </button>
        )
    )

}
export default LogoutButton;