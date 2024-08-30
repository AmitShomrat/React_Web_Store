import './index_css.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from "react";
import CustomNavbar from "./Components/CustomNavbar";
import MainComp from "./Components/MainComp";
import MyContainer from "./Components/MyContainer";
import MyCart from "./Components/MyCart";
import CheckOutContainer from "./Components/CheckOutComponents/CheckOutContainer";

function App() {

    const [listProducts, setListProducts] = useState([]);  // Initially empty array
    const [isDataLoaded, setIsDataLoaded] = useState(false);  // New state to track data loading

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetch assets");
            try {
                const res = await fetch("http://localhost:3000/items/assets", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (!res.ok) {
                    console.log("Error server cannot fetch assets");
                    return;
                }

                const data = await res.json();
                console.log(data);
                setListProducts(data.data);
                setIsDataLoaded(true); // Set data loaded state to true once data is fetched
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    //Cart component is Visible to client.
    const [isCartVisible, set_isCart_Visible] = useState(false);

    //Carts updates dynamically due to client requests.
    const [carts, setCarts] = useState(() => {
        return localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : [];
    });

    //Carts Summarize variables.
    const [totalPrice, setTotalPrice] = useState(() => {
        return localStorage.getItem('totalPrice') ? parseInt(localStorage.getItem('totalPrice')) : 0;
    });

    const [totalQuantity, SetTotalQuantity] = useState(() => {
        return localStorage.getItem('totalQuantity') ? parseInt(localStorage.getItem('totalQuantity')) : 0;
    });

    // Update total calculation whenever carts change
    useEffect(() => {
        setTotalCalculation();
    }, []);

    // Saves all related to carts into memory.
    useEffect(() => {
        if (isDataLoaded) {
            setTotalCalculation()
            localStorage.setItem('carts', JSON.stringify(carts));
            localStorage.setItem('totalPrice', totalPrice.toString());
            localStorage.setItem('totalQuantity', totalQuantity.toString());
        }
    }, [carts, totalPrice, totalQuantity, isDataLoaded]);

    // Updates cart related variables
    const setTotalCalculation = () => {
        let tempPrice = 0;
        let tempQuantity = 0;
        carts.forEach(cart => {
            let positionInListProducts = listProducts.findIndex((currentProduct) => currentProduct.id == cart.product_id);
            if (positionInListProducts !== -1) {
                tempQuantity += cart.quantity;
                tempPrice += cart.quantity * listProducts[positionInListProducts].price;
            }
        });
        SetTotalQuantity(tempQuantity);
        setTotalPrice(tempPrice);
    };

    // Function to toggle the cart visibility.
    function toggleCart() {
        set_isCart_Visible(!isCartVisible);
    }

    // Add to Cart Button
    function addToCart(product_id) {
        // Empty Cart.
        if (carts.length === 0) {
            setCarts([{
                product_id: product_id,
                quantity: 1
            }]);
        } else if (carts.findIndex(value => value.product_id === product_id) < 0) {
            // New item type
            setCarts(carts.concat({
                product_id: product_id,
                quantity: 1
            }));
        } else {
            // Updating quantity through add to cart BTN.
            increment_decrement_Cart(product_id, 'plus');
        }
    }

    // Updating carts to the corresponding buttons.
    function increment_decrement_Cart(product_id, type) {
        switch (type) {
            case 'plus':
                setCarts(carts.map(product => {
                    if (product.product_id === product_id) {
                        // Update the product quantity
                        return { ...product, quantity: product.quantity + 1 };
                    } else {
                        // Return the product as is
                        return product;
                    }
                }));
                break;
            case 'minus':
                setCarts(carts => {
                    const index = carts.findIndex(product => product.product_id === product_id);

                    if (index !== -1) {
                        const product = carts[index];
                        if (product.quantity > 1) {
                            // Decrease the quantity if it's greater than 1
                            const newProduct = { ...product, quantity: product.quantity - 1 };
                            return [...carts.slice(0, index), newProduct, ...carts.slice(index + 1)];
                        } else {
                            // Remove the product if the quantity is 1
                            return [...carts.slice(0, index), ...carts.slice(index + 1)];
                        }
                    }
                    return carts; // If the product isn't found, return the original array
                });
                break;
            default:
                break;
        }
    }

    // Render conditionally based on data loading status
    if (!isDataLoaded) {
        return <div>Loading...</div>;  // Or a more sophisticated loading indicator
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <>
                        <main>
                            <CustomNavbar onToggleCart={toggleCart} totalQuantity={totalQuantity} />
                            <MainComp />
                        </main>
                        <body className={isCartVisible ? "showCart" : null}>
                        <MyContainer onAddToCartClick={addToCart} products={listProducts} />
                        <MyCart
                            onToggleCart={toggleCart}
                            IncDecCart={increment_decrement_Cart}
                            products={listProducts}
                            carts={carts}
                            totalQuantity={totalQuantity}
                            totalPrice={totalPrice}
                        />
                        </body>
                    </>
                } />
                <Route path="/CheckOut" element={<CheckOutContainer />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
