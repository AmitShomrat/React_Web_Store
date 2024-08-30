//import './index_css.css'
import {click} from "@testing-library/user-event/dist/click";
const MyCard = (props) =>{
    const addToCartClick = (e) => {
        props.onAddToCartClick(e.target.id)
    }
    return(
        <article className="card__article">
            <img src={props.image} alt="image" className="card__img"/>
            <div className="card__data">
                <h2 className="card__title">{props.name}</h2>
                <div className="price">{props.price}</div>
                <button className="add_to_cart_button" id={props.id} onClick={addToCartClick} >Add to cart</button>
            </div>
        </article>
    )
}
export default MyCard;