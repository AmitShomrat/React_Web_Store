import CheckOut from "./CheckOut";
import UserDetails from "./UserDetails";
import {useEffect, useState} from "react";
import AlertComponent from './AlertComponent';
import {useLocation} from "react-router-dom";


function CheckOutContainer() {

    /*------------ init Data ----------*/
    const location = useLocation(); // useLocation hook to collect props from another route.
    const listProducts = location.state // Receives the state (Products static Details) delivery route from home page to CheckOutContainer page.
    // for the next time instead of importing everything from the localStorage it might be better to use the same vars and pass them as props and not a duplicated ones..
    // The LocalStorage initial purpose were to remember all User activity and reload it e.g refresh page ..
    const [carts, setCarts] = useState(localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : []);
    const [totalQuantity, setTotalQuantity] = useState(localStorage.getItem("totalQuantity") ? parseInt(localStorage.getItem("totalQuantity")) : 0);
    const [totalPrice, setTotalPrice] = useState(() => localStorage.getItem("totalPrice") ? parseInt(localStorage.getItem("totalPrice")) : 0);
    const [fastDelivery, setfastDelivery] = useState(localStorage.getItem("fastDelivery") ? JSON.parse(localStorage.getItem("fastDelivery")) : false);

    // Updates memory when carts/ totalQuantity/ totalPrice / fastDelivery is change.
    useEffect( () => {
        localStorage.setItem("carts", JSON.stringify(carts));
        localStorage.setItem("totalQuantity", totalQuantity.toString());
        localStorage.setItem('totalPrice', totalPrice.toString());
        localStorage.setItem('fastDelivery', fastDelivery );
    },)

    /*------------ Handlers and listeners ----------*/

    // Receives JSON doc from userDetails and sends a post request to server.
    const handleCheckOut = (newOrder) => {
        console.log("new order request; Client");

        fetch("/items/order", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        })
            .then(response => {
                if (!response.ok) {
                    // If response is not ok, throw an error to be caught in the catch block
                    throw new Error("Server cannot add new order");
                }
                return response.json(); // Return the parsed JSON data
            })
            .then(data => {
                // Check if the server response contains the OrderID
                if (data.OrderID) {
                    activateAlert(`Order submitted successfully, Order reference: ${data.OrderID}`, "success");
                    setCarts([]);
                    setTotalQuantity(0);
                    setTotalPrice(0);
                    setfastDelivery(false);
                } else {
                    throw new Error("Order ID not found in server response.");
                }
            })
            .catch(err => {
                console.error("Error during order submission:", err);
                activateAlert("Failed to submit order. Please try again later.", "error"); // Display error alert
            });
    };



    function onChangeFastDelivery(checked) {
        if (checked) {
            setTotalPrice(prevPrice => prevPrice + 70);
            setfastDelivery(checked);
        } else {
            setTotalPrice(prevPrice => prevPrice - 70);
            setfastDelivery(checked);
        }
    }


    // Alert Constants.
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const variants = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',]
    const [variant, setVariant] = useState(variants[0])

    // Activate alert to interact the User.
    function activateAlert (message, type) {
        setShowAlert(true)
        setAlertMessage(message);
        setVariant(type);
    }

    /*------------ Render ----------*/

    return(
        <>
            <AlertComponent show={showAlert}
                            setShowAlert = {setShowAlert}
                            alertMessage = {alertMessage}
                            variant={variant}
            />
            <body>
                <div className="CheckOut_Container">
                    <CheckOut carts={carts}
                              listProducts={listProducts}
                    />
                    <UserDetails totalPrice={totalPrice} // passing useStates vars for reading purposes.
                                 fastDelivery={fastDelivery}
                                 totalQuantity={totalQuantity}
                                 carts={carts}
                                 onChangeFastDelivery={onChangeFastDelivery}
                                 activateAlert = {activateAlert}
                                 handleCheckOut={handleCheckOut}
                    />
                </div>
            </body>
        </>
    )
}
export default CheckOutContainer;