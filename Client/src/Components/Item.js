

function Item (props){
    const IncDecBTN = (BTN) => {
        props.IncDecCart(BTN.target.id, BTN.target.className)
    }

    return (
        <div className="item">
            <div className="image">
                <img src={props.info.image} alt="Item1"/>
            </div>
            <div className="item-name">{props.info.name}</div>
            <div className="price">{props.info.price}</div>
            <div className="total_price">${props.info.price * props.cart.quantity}</div>
            <div className="quantity">
                <span className="minus" id={props.id} onClick={IncDecBTN}> &lt; </span>
                <span>{props.cart.quantity}</span>
                <span className="plus" id={props.id} onClick={IncDecBTN}> > </span>
            </div>
        </div>

    )
}

export default Item