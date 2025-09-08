export default class InputValidationBase {
    alphabeticCharacters = [" ", ".", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "á", "é", "í", "ó", "ú", "ü", "Á", "É", "Í", "Ó", "Ú", "Ü"]
    numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    numberOfCharacters = 0;
    inputName = "";
    allowedCharacters = [""];

    constructor(
        numberOfCharacters,
        inputName,
        validationType = 1
    ) {
        if (Number.isNaN(numberOfCharacters)) {
            throw new Error("numberOfCharacters must be a valid number.");
        }
        this.numberOfCharacters = numberOfCharacters;

        if (inputName === "") {
            throw new Error("Provide a name for the input.");
        }
        this.inputName = inputName;

        if (validationType < 1 || validationType > 3) {
            throw new Error("Invalid validation type. Please use 1, 2, or 3.");
        }
        switch (validationType) {
            case 1:
                this.allowedCharacters = new Set(this.alphabeticCharacters);
                break;
            case 2:
                this.allowedCharacters = new Set(this.numericCharacters);
                break;
            case 3:
                this.allowedCharacters = new Set([...this.alphabeticCharacters, ...this.numericCharacters]);
                break;
            default:
                this.allowedCharacters = new Set([...this.alphabeticCharacters, ...this.numericCharacters]);
                break;
        }
    }

    displayError(message) {
        alert(message);
    }

    validation(input) {
        input.addEventListener("input", () => {

            const inputValue = input.value;

            if (inputValue.length > this.numberOfCharacters) {
                this.displayError(`"${this.numberOfCharacters}" es el máximo de caracteres para ${this.inputName}.`)
                try {
                    input.value = inputValue.substring(0, this.numberOfCharacters);
                } catch { }
            }

            let sanitizedValue = '';

            for (const character of input.value) {
                if (this.allowedCharacters.has(character)) {
                    sanitizedValue += character;
                } else {
                    this.displayError(`"${character}" es inválido para ${this.inputName}.`);
                }
            }

            input.value = sanitizedValue;
        })
    }
}