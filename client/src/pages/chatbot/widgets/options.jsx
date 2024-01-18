const Options = (props) => {

  return (
    <div className="options">
      {/* <h1 className="options-header">{props.title}</h1>  */}
      <div className="options-container">
        {props.options.map((option) => {
          return (
            <div
              className={`option-item ${props.destination === option.name ? "selected-destination" : ""} ${props.trip_suggestions_destination === option.name ? "selected-suggestions-destination" : ""}`}
              onClick={option.handler}
              key={option.id}
            >
              {option.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Options;
