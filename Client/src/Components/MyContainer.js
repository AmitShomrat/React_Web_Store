//import './index_css.css'
import CardContainer from "./CardContainer";

function MyContainer (ancestor_props) {
    return (
        <div className="container">
            <h1>Products:</h1>
            <CardContainer  ancestor_props={ancestor_props}/>
        </div>
    )
}

export default MyContainer;