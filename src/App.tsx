import "./index.css";
import { RenderForm } from "./components/form-render";

import jsonInput from "./profile.json";
// import jsonInput1 from "./test.json";
// import jsonInput2 from "./mixed.json";

const App = () => {
  //TODO form submit
  const handleSubmit = () => {
    console.log("clicked");
  };

  const formData = jsonInput;

  return (
    <div className="container">
      <h1 className="title">Form Builder App</h1>
      <form onSubmit={handleSubmit} className="form">
        {RenderForm(formData.properties)}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
