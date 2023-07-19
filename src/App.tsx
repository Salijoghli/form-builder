import "./index.css";

import jsonInput from "./profile.json";
// import jsonInput1 from "./test.json";
// import jsonInput2 from "./mixed.json";

interface Option {
  value: string;
  label: string;
}
interface Field {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  inputType?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  integer?: boolean;
  minimum?: number;
  maximum?: number;
  options?: Option[];
  properties?: any;
  item?: any;
  multiline?: boolean;
}

const formData = jsonInput;

// console.log(formData);

// console.log(formData.properties);

const renderForm = (fields: Field[]) => {
  return (
    <>
      {fields.map((field, index) => {
        if (field.type === "object" && field.properties) {
          return (
            <div key={index} className="form-group nested-object">
              <h3>{field.label}</h3>
              {renderForm(field.properties)}
            </div>
          );
        } else if (field.type === "array" && field.item) {
          return (
            <div key={index} className="box">
              <div className="ss">
                <div className="nested-group">
                  <h3>{field.label}</h3>

                  {field.item.map(
                    (
                      item: { properties: Field[] },
                      itemIndex: React.Key | null | undefined
                    ) => (
                      <div key={itemIndex} className="nested-group">
                        {renderForm(item.properties)}
                      </div>
                    )
                  )}
                </div>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => console.log("removed")}
                >
                  Remove
                </button>
              </div>
              <button
                type="button"
                className="add-btn"
                onClick={() => console.log("added")}
              >
                Add
              </button>
            </div>
          );
        }
        // else if (field.type === "object" && field.properties) {
        //   return (
        //     <div key={index} className="nested-group">
        //       <h3>{field.label}</h3>
        //       {renderForm(field.properties)}
        //     </div>
        //   );
        // }
        else {
          return (
            <div key={index} className="form-group">
              <label htmlFor={field.name}>{field.label}:</label>
              {field.type === "enum" ? (
                <select name={field.name} className="form-control">
                  {field.options?.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "boolean" ? (
                <input type="checkbox" name={field.name} />
              ) : field.multiline ? (
                <textarea
                  name={field.name}
                  required={field.required}
                  className="form-control"
                ></textarea>
              ) : (
                <input
                  type={field.inputType ? field.inputType : "text"}
                  name={field.name}
                  required={field.required}
                  minLength={field.minLength}
                  maxLength={field.maxLength}
                  pattern={field.pattern}
                  min={field.minimum}
                  max={field.maximum}
                  className="form-control"
                />
              )}
            </div>
          );
        }
      })}
    </>
  );
};

const App = () => {
  //TODO form submit
  const handleSubmit = () => {
    console.log("clicked");
  };

  return (
    <div className="container">
      <h1 className="title">Form Builder App</h1>
      <form onSubmit={handleSubmit} className="form">
        {renderForm(formData.properties)}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
