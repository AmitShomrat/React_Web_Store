function Item_CheckOut(props) {

    return (
        <div className="item_CheckOut">
            <div className="image_CheckOut">
                <img src={props.info.image} alt="Image"/>
            </div>
            <div className="info">
                <div className="item_Name">{props.info.name}</div>
                <div className="price">${props.info.price}</div>
            </div>
            <div className="amount_Of_Item">{props.cart.quantity}</div>
            <div className="total">${props.info.price * props.cart.quantity}</div>
        </div>
    )
}

export default Item_CheckOut