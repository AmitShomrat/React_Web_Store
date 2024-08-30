import Alert from 'react-bootstrap/Alert';
function AlertComponent(props) {
    if (props.show) {
        return (
            <Alert variant={props.variant} onClose={() => props.setShowAlert(false)} dismissible>
                <Alert.Heading>{props.variant === 'danger' ? 'Error' : 'Submission Success'}</Alert.Heading>
                <p>
                    {props.alertMessage.split("\n").map((msg, index) => (
                        <span key={index}>
                            {msg}
                            <br />
                        </span>
                        ))}
                </p>
            </Alert>
        );
    }
}
export default AlertComponent;