// action types
const clear = "clear";
const append = "append";
const operator = "operator";
const solve = "solve";
const special = "special";

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.updateState = this.updateState.bind(this);

    this.state = {
      result: 0,
      pastDisplay: "",
      currentDisplay: "0",
      currentInput: "",
      inputArray: [] };

  }

  // handle button click
  handleClick(event) {
    switch (event.target.id) {
      case "clear":
        this.updateInput(event.target.id);
        break;
      case "divide":
        this.updateInput(event.target.id);
        break;
      case "multiply":
        this.updateInput(event.target.id);
        break;
      case "subtract":
        this.updateInput(event.target.id);
        break;
      case "add":
        this.updateInput(event.target.id);
        break;
      case "nine":
        this.updateInput(event.target.id);
        break;
      case "eight":
        this.updateInput(event.target.id);
        break;
      case "seven":
        this.updateInput(event.target.id);
        break;
      case "six":
        this.updateInput(event.target.id);
        break;
      case "five":
        this.updateInput(event.target.id);
        break;
      case "four":
        this.updateInput(event.target.id);
        break;
      case "three":
        this.updateInput(event.target.id);
        break;
      case "two":
        this.updateInput(event.target.id);
        break;
      case "one":
        this.updateInput(event.target.id);
        break;
      case "zero":
        this.updateInput(event.target.id);
        break;
      case "decimal":
        this.updateInput(event.target.id);
        break;
      case "equals":
        this.updateInput(event.target.id);
        break;}

  }

  // decipher action from button click
  updateInput(type) {
    switch (type) {
      case "clear":
        this.updateState({
          action: clear,
          value: "" });

        break;
      case "divide":
        this.updateState({
          action: operator,
          value: "/" });

        break;
      case "multiply":
        this.updateState({
          action: operator,
          value: "*" });

        break;
      case "subtract":
        this.updateState({
          action: special,
          value: "-" });

        break;
      case "add":
        this.updateState({
          action: operator,
          value: "+" });

        break;
      case "nine":
        this.updateState({
          action: append,
          value: "9" });

        break;
      case "eight":
        this.updateState({
          action: append,
          value: "8" });

        break;
      case "seven":
        this.updateState({
          action: append,
          value: "7" });

        break;
      case "six":
        this.updateState({
          action: append,
          value: "6" });

        break;
      case "five":
        this.updateState({
          action: append,
          value: "5" });

        break;
      case "four":
        this.updateState({
          action: append,
          value: "4" });

        break;
      case "three":
        this.updateState({
          action: append,
          value: "3" });

        break;
      case "two":
        this.updateState({
          action: append,
          value: "2" });

        break;
      case "one":
        this.updateState({
          action: append,
          value: "1" });

        break;
      case "zero":
        this.updateState({
          action: append,
          value: "0" });

        break;
      case "decimal":
        this.updateState({
          action: append,
          value: "." });

        break;
      case "equals":
        this.updateState({
          action: solve,
          value: null });

        break;}

  }

  // execute action on state
  updateState(info) {
    // if action type is clear, then clear state
    if (info.action === clear) {
      this.setState({
        pastDisplay: "",
        currentDisplay: "0",
        currentInput: "",
        inputArray: [] });

    }

    function checkSymbol(symbol) {// symbol checker func
      switch (symbol) {
        case "+":
          return true;
          break;
        case "-":
          return true;
          break;
        case "*":
          return true;
          break;
        case "/":
          return true;
          break;
        default:
          return false;
          break;}

    }

    // if action type is append, then append character
    if (info.action === append) {
      // sanitize for 0s
      if (info.value === "0" && this.state.currentInput[0] === "0") {
        info.value = "";
      }

      // sanitize for decimals
      if (info.value === "." && this.state.currentInput.indexOf(".") > -1) {
        info.value = "";
      }

      // local variables for updating state
      let oldDisplayUpdate = this.state.oldDisplay;
      let oldCurrentDisplay = this.state.currentDisplay;
      let oldCurrentInput = this.state.currentInput;
      let oldArrayUpdate = [...this.state.inputArray];

      // determine if past display should be updated as well
      if (this.state.pastDisplay === "") {
        oldDisplayUpdate = this.state.currentInput.concat(info.value);
        oldCurrentDisplay = this.state.currentInput.concat(info.value);
      } else
      if (this.state.pastDisplay === this.state.currentInput) {
        oldDisplayUpdate = this.state.currentInput.concat(info.value);
        oldCurrentDisplay = this.state.currentInput.concat(info.value);
      } else
      {
        oldDisplayUpdate = this.state.pastDisplay.concat(info.value);
        oldCurrentDisplay = this.state.currentInput.concat(info.value);
      }

      if (info.value !== "") {
        oldCurrentInput = oldCurrentInput.concat(info.value);
      }

      // finally, update state
      this.setState({
        pastDisplay: oldDisplayUpdate,
        currentDisplay: oldCurrentDisplay,
        currentInput: oldCurrentInput,
        inputArray: oldArrayUpdate.slice() });

    }

    // if action type is special, then deal with the minus symbol button
    if (info.action === special) {
      // local variables for updating state
      let pastDisplay = this.state.pastDisplay;
      let currentDisplay = this.state.currentDisplay;
      let currentInput = this.state.currentInput;
      let inputArray = [...this.state.inputArray];

      console.log(pastDisplay[pastDisplay.length - 1]);

      // handle operation
      if (typeof parseFloat(pastDisplay[pastDisplay.length - 1]) === "number") {
        inputArray.push(currentInput);
        inputArray.push("-");
        currentInput = "";
      } else
      {
        currentInput = currentInput + "-";
      }

      // update past display
      pastDisplay = pastDisplay + "-";

      // finally, update state
      this.setState({
        pastDisplay: pastDisplay,
        currentDisplay: currentDisplay,
        currentInput: currentInput,
        inputArray: [...inputArray] });

    }

    // if action type is operator, then update displays and append operator
    if (info.action === operator) {
      // local variables for updating state
      let oldDisplayUpdate = this.state.pastDisplay;
      let oldCurrentDisplay = this.state.currentDisplay;
      let oldCurrentInput = this.state.currentInput;
      let oldArrayUpdate = [...this.state.inputArray];

      // sanitize symbols
      let a = info.value;
      /*if (checkSymbol(a)) {
        if (oldCurrentInput === "0" || oldCurrentInput === "") {
          a = "";
        }
        if (checkSymbol(oldCurrentInput[oldCurrentInput - 1])) {
          a = "";
        }
      }*/
      info.value = a;

      // begin updating local variables, but verify if value is indeed an operator
      if (checkSymbol(info.value)) {
        // update the input array with new values
        oldArrayUpdate.push(oldCurrentInput.slice(0, oldCurrentInput.length)); // push current number to the input array
        oldArrayUpdate.push(info.value); // push operator to the input array

        // update the displays
        oldDisplayUpdate = oldDisplayUpdate + info.value; // update the past display
        oldCurrentDisplay = info.value; // display the operator to the current display
        oldCurrentInput = ""; // reset the current numerical input
      }

      // finally, update state
      this.setState({
        pastDisplay: oldDisplayUpdate,
        currentDisplay: oldCurrentDisplay,
        currentInput: oldCurrentInput,
        inputArray: oldArrayUpdate.slice() });

    }

    // if action type is solve, then solve equation
    if (info.action === solve) {
      let result = this.state.result;
      let firstNum = 0;
      let secondNum = 0;
      let charCounter = 0;
      let lastChar = "";
      let array = [...this.state.inputArray];
      array.push(this.state.currentInput);

      console.log(array);

      // sanitize array of blank indexes
      array = array.filter(index => index !== "");

      console.log(array);

      // handle multipler operators
      array = array.map((char, index) => {
        if (checkSymbol(char)) {
          // incrememt counter for # of characters
          charCounter++;
          lastChar = char;
          return char;
        } else
        {
          charCounter--;
          return char;
        }
      });
      console.log("Char: " + charCounter);
      if (lastChar !== "" && charCounter >= 1) {
        let index = array.lastIndexOf(lastChar);
        array.splice(index - charCounter - 1, charCounter);
      }
      lastChar = "";
      charCounter = 0;

      // sanitize array of blank indexes left over
      array = array.filter(index => index !== "");

      // handle negative numbers
      array = array.map((char, index) => {
        if (char === "-") {
          if (checkSymbol(array[index - 1])) {
            array[index + 1] = char + array[index + 1];
            return "";
          } else
          {
            return char;
          }
        } else
        {
          return char;
        }
      });

      // sanitize array of leftover items
      array = array.filter(index => index !== "");

      console.log(array);

      array.map((char, index) => {
        if (checkSymbol(char)) {
          charCounter++;

          // sanitize for extra operators
          if (checkSymbol(array[index + 1])) {
            firstNum = parseFloat(array[index - 1]);
          } else
          {
            if (firstNum !== 0) {
              secondNum = parseFloat(array[index + 1]);
            } else
            {
              firstNum = parseFloat(array[index - 1]);
              secondNum = parseFloat(array[index + 1]);
            }
          }

          if (charCounter > 1) {
            firstNum = result;
          }

          // handle operators
          if (char === "*") {
            result = firstNum * secondNum;
          }
          if (char === "/") {
            result = firstNum / secondNum;
          }
          if (char === "+") {
            result = firstNum + secondNum;
          }
          if (char === "-") {
            result = firstNum - secondNum;
          }
          console.log(result);
        }
      });

      console.log(firstNum + ", " + secondNum + "=" + result);

      this.setState({
        result: result,
        pastDisplay: this.state.pastDisplay + "=" + result,
        currentDisplay: result,
        currentInput: "",
        inputArray: [result] });

      result = 0;
      charCounter = 0;
    }
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "calculator-container" }, /*#__PURE__*/
      React.createElement("div", { id: "display-container" }, /*#__PURE__*/
      React.createElement("div", { id: "past-display" }, /*#__PURE__*/
      React.createElement("h4", null, this.state.pastDisplay)), /*#__PURE__*/

      React.createElement("div", { id: "current-display" }, /*#__PURE__*/
      React.createElement("h3", { id: "display" }, this.state.currentDisplay))), /*#__PURE__*/


      React.createElement("div", { id: "buttons" }, /*#__PURE__*/
      React.createElement("div", { id: "clear", className: "button", href: "#", onClick: this.handleClick }, "AC"), /*#__PURE__*/
      React.createElement("div", { id: "divide", className: "button", href: "#", onClick: this.handleClick }, "/"), /*#__PURE__*/
      React.createElement("div", { id: "multiply", className: "button", href: "#", onClick: this.handleClick }, "X"), /*#__PURE__*/
      React.createElement("div", { id: "seven", className: "button", href: "#", onClick: this.handleClick }, "7"), /*#__PURE__*/
      React.createElement("div", { id: "eight", className: "button", href: "#", onClick: this.handleClick }, "8"), /*#__PURE__*/
      React.createElement("div", { id: "nine", className: "button", href: "#", onClick: this.handleClick }, "9"), /*#__PURE__*/
      React.createElement("div", { id: "subtract", className: "button", href: "#", onClick: this.handleClick }, "-"), /*#__PURE__*/
      React.createElement("div", { id: "four", className: "button", href: "#", onClick: this.handleClick }, "4"), /*#__PURE__*/
      React.createElement("div", { id: "five", className: "button", href: "#", onClick: this.handleClick }, "5"), /*#__PURE__*/
      React.createElement("div", { id: "six", className: "button", href: "#", onClick: this.handleClick }, "6"), /*#__PURE__*/
      React.createElement("div", { id: "add", className: "button", href: "#", onClick: this.handleClick }, "+"), /*#__PURE__*/
      React.createElement("div", { id: "one", className: "button", href: "#", onClick: this.handleClick }, "1"), /*#__PURE__*/
      React.createElement("div", { id: "two", className: "button", href: "#", onClick: this.handleClick }, "2"), /*#__PURE__*/
      React.createElement("div", { id: "three", className: "button", href: "#", onClick: this.handleClick }, "3"), /*#__PURE__*/
      React.createElement("div", { id: "zero", className: "button", href: "#", onClick: this.handleClick }, "0"), /*#__PURE__*/
      React.createElement("div", { id: "decimal", className: "button", href: "#", onClick: this.handleClick }, "."), /*#__PURE__*/
      React.createElement("div", { id: "equals", className: "button", href: "#", onClick: this.handleClick }, "="))));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Calculator, null), document.getElementById("root"));
