
import MyCard from './MyCard';

function CardContainer(ancestor_props) {

    return (
        <div className="card__container">
            {ancestor_props.ancestor_props.products.map((element) => {
                return  (
                    <MyCard
                        key={element.id}
                        id={element.id}
                        name={element.name}
                        price={element.price}
                        image={process.env.PUBLIC_URL + '/' + element.image}
                        onAddToCartClick={ancestor_props.ancestor_props.onAddToCartClick}
                    />
                );
            })}
        </div>
    );
}

export default CardContainer;
