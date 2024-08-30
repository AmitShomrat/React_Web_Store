import { useState, useEffect } from "react";

function UserDetails({ totalPrice, totalQuantity, onChangeFastDelivery, activateAlert, handleCheckOut,fastDelivery }) {
    const [orderDetails, setOrderDetails] = useState({
        contact: { // UserDetails generates the contact domain and assembles all details into a single record:
            name: "",
            phone: "",
            address: "",
            country: "",
            city: "",
            email: "",
        },
        totalPrice: totalPrice,
        totalQuantity: totalQuantity,
        fastDelivery: fastDelivery,
    });

    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState("")
    const [cities, setCities] = useState([])


    /*------------ Handlers and listeners ----------*/

    //Users inputs changes are updating the main document.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            contact: {
                ...prevDetails.contact,
                [name]: value,
            },
        }));

        if (name === "country") {
            setSelectedCountry(e.target.value)
        }
    };

    const handleClickFastDelivery = (BTN) => {
        onChangeFastDelivery(BTN.target.checked)
    };

    //Mounting loading countries data
    useEffect(()=> {
        const fetchCountriesAndCities = async () => {
            try {
                const res = await fetch('api/countries',{
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                }
                );
            if(!res.ok) {
                console.log("Client Error fetching countries and cities");
                return;
            }

            const payload = await res.json();
            setCountries(payload.data)
        } catch (err) {
            console.error(err);
            }
        }
        fetchCountriesAndCities();
    }, [])

    useEffect(() => {

        if(selectedCountry.trim().length > 0) {

            const currentCountry = countries.find(value => value.iso3 === selectedCountry);
            const temp = currentCountry.cities;
            console.log(temp)
            setCities(temp);
        }
    }, [selectedCountry]);



    //On the change of fastDelivery checkBox the totalPrice & fastDelivery updates the final document.
    useEffect( () => {
        const temp = orderDetails
        temp.fastDelivery = fastDelivery
        temp.totalPrice = totalPrice
        setOrderDetails(temp);
    } ,[totalPrice, fastDelivery])


    const handleSubmit = (event) => {
        event.preventDefault();

        let errorMessage = "";
        const validationErrors = validateOrderDetails(orderDetails);

        //Builds a string of errors in order to displays it by using the alert component.
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).forEach((error) => {
                errorMessage += `${error}\n`;
            });
                console.log(errorMessage);
                activateAlert(errorMessage, 'danger');
        } else {
            // Proceed with form submission if no errors
            activateAlert("Order submitted successfully!", "success");
            handleCheckOut(orderDetails);
        }
    };

    /*------------ Validation  ----------*/

    const Regex = {
        name:/^[A-Za-z]+ [A-Za-z]+$/,
        phone:/^\+?(\d{1,3})?\d{10}$/,
        email:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    }

    function validateOrderDetails(orderDetails) {
        const errors = {}; // Initialize errors as an empty object

        if (orderDetails.totalQuantity <= 0) {
            errors.totalQuantity = "Cannot submit an empty cart";
        }

        if (!orderDetails.contact.name.trim()) {
            errors.name = "Full name is required";
        }
        else if(!Regex.name.test(orderDetails.contact.name)) {
            errors.name = "Invalid name";
        }

        if (!orderDetails.contact.phone.trim()) {
            errors.phone = "Phone number is required";
        }
        else if(!Regex.phone.test(orderDetails.contact.phone)){
            errors.phone = "Invalid phone number";
        }

        if (!orderDetails.contact.address.trim()) {
            errors.address = "Address is required";
        }

        if ( !orderDetails.contact.country.trim()) {
            errors.city = "Select your country";
        }

        if ( !orderDetails.contact.city.trim()) {
            errors.city = "Select your city";
        }

        if (!orderDetails.contact.email.trim()) {
            errors.email = "Email is required";
        } else if (!Regex.email.test(orderDetails.contact.email)) {
            errors.email = "Email is invalid";
        }
        return errors; // Validation errors.
    }

    /*------------ Render  ----------*/

    return (
        <div className="user_Details">
            <h1> CheckOut Order </h1>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <div className="group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={orderDetails.contact.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={orderDetails.contact.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={orderDetails.contact.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="group">
                        <label>Country</label>
                        <select
                            name="country"
                            value={orderDetails.contact.country}
                            onChange={handleChange}
                        >
                            <option value="">select a country</option>
                            {countries.map((country) => (
                                <option key={country.iso3} value={country.iso3}>
                                    {country.country}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="group">
                        <label>City</label>
                        <select
                            name="city"
                            value={orderDetails.contact.city}
                            onChange={handleChange}
                        >
                            <option value="">select a city</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={orderDetails.contact.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="return">
                    <div className="row">
                        <div>Total Quantity:</div>
                        <div className="totalQuantity">{totalQuantity}</div>
                    </div>
                    <div className="row">
                        <div>Total Price:</div>
                        <div className="totalPrice">${totalPrice}</div>
                    </div>
                    <div className="row">
                        <div>
                            Fast Delivery within 3 days (addition of 70$)\Regular delivery up-to
                            14 days
                        </div>
                        <input
                            type="checkbox"
                            onClick={handleClickFastDelivery}
                            className="fast_Delivery"
                            checked={fastDelivery}
                        />
                    </div>
                    <button className="buttonCheckout" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserDetails;
