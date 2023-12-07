import { useAuth0 } from '@auth0/auth0-react';


const LoginButton = () => {
    const {loginWithRedirect, isAunthenticated } = useAuth0();

    return(
        !isAunthenticated && (
            <button onClick={() => loginWithRedirect()}>
                Sign In
            </button>
        )
    )

}
export default LoginButton;