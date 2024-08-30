import CheckOut from "./CheckOut";
import UserDetails from "./UserDetails";
import {useEffect, useState} from "react";
import AlertComponent from './AlertComponent';
import {useLocation} from "react-router-dom";


function CheckOutContainer() {

    /*------------ init Data ----------*/
    const location = useLocation(); // useLocation hook to collect props from another route.
    const listProducts = location.state // Receives the state (Products static Details) delivery route from home page to CheckOutContainer page.

    const carts = localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [];
    const totalQuantity = localStorage.getItem("totalQuantity") ? parseInt(localStorage.getItem("totalQuantity")) : 0;
    const [totalPrice, setTotalPrice] = useState(() => localStorage.getItem("totalPrice") ? parseInt(localStorage.getItem("totalPrice")) : 0);
    const [fastDelivery, setfastDelivery] = useState(localStorage.getItem("fastDelivery") ? JSON.parse(localStorage.getItem("fastDelivery")) : false);

    // Updates memory when totalPrice / fastDelivery is change.
    useEffect( () => {
        localStorage.setItem('totalPrice', totalPrice.toString());
        localStorage.setItem('fastDelivery', fastDelivery );
    },)

    /*------------ Handlers and listeners ----------*/

    // Receives JSON doc from userDetails and sends a post request to server.
    const handleCheckOut = (newOrder) =>{
        console.log("new order request client");
        fetch("/items/order", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        }).then(res => {
            if(!res.ok){
                throw new Error("server cannot add new order")
            }
            return res.json();
        }).catch(err => {
            console.log(err);
        })
    }


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
                    <UserDetails totalPrice={totalPrice} // passing useStates vars only for reading purposes.
                                 fastDelivery={fastDelivery}
                                 totalQuantity={totalQuantity}
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