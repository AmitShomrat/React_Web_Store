import Item from "./Item";
import {useNavigate} from "react-router-dom";


function MyCart(props) {
const navigate = useNavigate();

    //Another way of routing and passing props is the useNavigate and useLocation ( When the component does not wrap directly ).
    const navToCheckOut = (data) => {
        navigate('/CheckOut', { state: data }); //Route to check Out and pass state through useNavigate.
    }


    return (
        <div className="cartTab">
                <div className="CartHeader">
                        <h1>Shopping Cart</h1>
                        <h5>Total: ${props.totalPrice}</h5>
                </div>
                <div className="listCart">
                    {props.carts.map((cart) => {
                        let positionInProductsList = props.products.findIndex((currentProduct) => currentProduct.id == cart.product_id);
                    return  (
                        <Item key={cart.product_id * 10 }
                              id={ cart.product_id }
                              info={props.products[positionInProductsList]}
                              cart={cart}
                              IncDecCart={props.IncDecCart}
                        />
                    )}
                    )}
                </div>
                <div className="cart_btn">
                    <button className="close_cart" onClick={props.onToggleCart}>Close</button>
                    <a className="checkOut" onClick={ () => navToCheckOut(props.products) } >Check Out</a>
                </div>
        </div>
    )
}

export default MyCart;