//import './index_css.css'
import image from './assets/WalkAwayimg.jpg'
function CustomNavbar({onToggleCart, totalQuantity}) {

    return (
        <>
            <nav className="navbar bg-body-tertiary" >
                <div className="container-fluid d-flex justify-content-center">
                    <a className="navbar-brand">
                        <img src={image} alt="Logo" width="200" height="200" className="d-inline-block align-text-top"/>
                            <h1>
                                <span>
                                    Walk Away
                                </span>
                            </h1>
                    </a>
                </div>
                <header>
                    <div className="cart__icon" onClick={onToggleCart}>
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                        </svg>
                        <span>{totalQuantity}</span>
                    </div>
                </header>
            </nav>
        </>    
    );
}

export default CustomNavbar;