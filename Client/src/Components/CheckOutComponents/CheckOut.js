import Item_CheckOut from "./Item_CheckOut";
function CheckOut({carts, listProducts}) {
    return(
            <div className="checkOut">
                <div className="returnCart">
                    <a href="/"> Back home </a>
                    <h1> List Products </h1>
                </div>
                <div className="list_CheckOut">
                    {carts.map((cart) => {
                        let positionInProductsList = listProducts.findIndex((currentProduct) => currentProduct.id == cart.product_id);
                        return (
                            <Item_CheckOut key={cart.product_id * 100}
                                           info={listProducts[positionInProductsList]}
                                           cart={cart}
                            />)
                    })}
                </div>
            </div>
    )
}

export default CheckOut;