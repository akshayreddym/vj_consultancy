import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

function Login() {

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {

        try {

            await login(credentialResponse);

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <Container
            className="d-flex justify-content-center align-items-center vh-100"
        >

            <Card className="p-4 text-center">

                <h3>VJ Consultancy</h3>

                <p>Continue with Google</p>

                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => console.log("Login Failed")}
                />

            </Card>

        </Container>

    );

}

export default Login;