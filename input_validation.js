
class InputValidationBase {
    numberOfCharacters = 0;
    inputName = "Input Name";
    forbiddenCharacters = [""];
    allowedCharacters = [""];

    constructor(
        numberOfCharacters,
        inputName
    ) {
        this.numberOfCharacters = numberOfCharacters
        this.inputName = inputName
    }

    displayError(message) {
        alert(message);
    }

    validateCharacterLength(input) {
        input.addEventListener("change", () => {
            const inputValue = input.value;

            console.log("input.value")
            console.log(inputValue)
            console.log("this.numberOfCharacters")
            console.log(this.numberOfCharacters)

            if (inputValue.length > this.numberOfCharacters) {
                this.displayError(`"${this.numberOfCharacters}" es el máximo de caracteres para ${this.inputName}.`)
                try {
                    const inputValueWithputLastCharacter = input.value.substring(0, input.value.length - 2)
                    input.value = inputValueWithputLastCharacter
                } catch { }
            }
        })
    }

    validation(input) {
        this.validateCharacterLength(input)
        this.validationAction(input)
    }
}

export class AlfanumericValidation extends InputValidationBase {
    constructor(
        numberOfCharacters,
        inputName
    ) {
        super(numberOfCharacters, inputName)
        this.validationAction = (input) => {
            input.addEventListener("change", () => {
                const inputValue = input.value
                for (let index = 0; index < inputValue.length; index++) {
                    const character = inputValue[index];
                    if (this.forbiddenCharacters.includes(character)) {
                        displayError(`${character} es inválido para ${this.inputName}`)
                        const replacementValue = inputValue.replace(character, "")
                        input.value = replacementValue;
                    }
                }
            })
        }
    }
}

export class NumericValidation extends InputValidationBase {
    allowedCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    constructor(
        numberOfCharacters,
        inputName
    ) {
        super(numberOfCharacters, inputName)
        this.validationAction = (input) => {
            input.addEventListener("change", () => {
                const inputValue = input.value
                for (let index = 0; index < inputValue.length; index++) {
                    const character = inputValue[index];
                    if (this.forbiddenCharacters.includes(character)) {
                        displayError(`${character} es inválido para ${this.inputName}. Sólo números son admitidos en este campo.`)
                        const replacementValue = inputValue.replace(character, "")
                        input.value = replacementValue;
                    }
                }
            })
        }
    }
}

export class AlphabeticValidation extends InputValidationBase {
    allowedCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "á", "é", "í", "ó", "ú", "ü", "Á", "É", "Í", "Ó", "Ú", "Ü"];
    constructor(
        numberOfCharacters,
        inputName
    ) {
        super(numberOfCharacters, inputName)
        this.validationAction = (input) => {
            input.addEventListener("change", () => {
                const inputValue = input.value
                for (let index = 0; index < inputValue.length; index++) {
                    const character = inputValue[index];
                    if (this.forbiddenCharacters.includes(character)) {
                        displayError(`${character} es inválido para ${this.inputName}. Sólo letras son admitidas en este campo.`)
                        const replacementValue = inputValue.replace(character, "")
                        input.value = replacementValue;
                    }
                }
            })
        }
    }
}