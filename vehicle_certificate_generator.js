export default class VehicleCertificateGenerator {
    ElementGenerator = new HTMLElementGenerator()
    
    outerContainer = null
    websiteUrl = ""
    mainApiEndpoint = ""
    mainDataFileUrl = ""

    PlacaTop = null
    printableOverlayFileName = "sample_name.pdf"
    generatePdfButton = null

    constructor(
        outerContainer, 
        websiteUrl,
        mainApiEndpoint,
        mainDataFileUrl
    ) {
        this.outerContainer = outerContainer
        this.websiteUrl = websiteUrl
        this.mainApiEndpoint = mainApiEndpoint
        this.mainDataFileUrl = mainDataFileUrl

        this.GenerateGeneratePdfButton()
        this.StoreCurrentDate()
        this.StoreCurrentTime()

        this.components = this.ComponentsConfig.map(config => new SingleInputField(
            false,
            this.outerContainer,
            config.name,
            config.label,
            config.input,
            config.validationClass
        ));

        console.log(this)
    }

    ComponentsConfig = [
        {
            name: 'nombre_de_la_empresa',
            label: "Nombre de la empresa",
            input: "SNIPER CERTIFICATE PRECISSION PRINTER C.A.",
            validationClass: new AlfanumericValidation(50, "Nombre de la empresa")
        },
        {
            name: 'fecha_de_emision',
            label: "Fecha de Emisión",
            input: "2025",
            validationClass: new NumericValidation(8, "Fecha de Emisión")
        },
        {
            name: 'serie_de_numero_de_factura_1',
            label: "Serie de Número de Factura 1",
            input: "SERIE A",
            validationClass: new AlphabeticValidation(7, "Serie de Número de Factura")
        },
        {
            name: 'numero_de_factura_1',
            label: "Número de Factura 1",
            input: "00000020",
            validationClass: new NumericValidation(8, "Número de Factura 1")
        },
        {
            name: 'fecha_de_factura_1',
            label: "Fecha Factura 1",
            input: "2025",
            validationClass: new NumericValidation(8, "Fecha Factura 1")
        }
    ];

    StoreCurrentTime(elementId, mustLog = false) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        this.time = {
            "hours": [hours[0], hours[1]],
            "minutes": [minutes[0], minutes[1]],
            "seconds": [seconds[0], seconds[1]]
        }
        if (mustLog) console.log(this.time);
    }

    StoreCurrentDate(elementId, mustLog = false) {
        const today = new Date();
        const year = today.getFullYear() + "";
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        console.log(year);
        this.date = {
            "year": [year[0], year[1], year[2], year[3],],
            "month": [month[0], month[1],],
            "day": [day[0], day[1],]
        }
        if (mustLog) console.log(this.time);
    }

    StorePageDatasetElement() {
        this.pageDatasetElement = document.getElementById("page_dataset_attributes")
    }

    SetMainApiEndpoint() {
        this.mainApiEndpoint = this.websiteUrl + this.pageDatasetElement.dataset.mainApiEndpoint;
    }

    SetMainDatafileUrl() {
        this.mainDataFileUrl = this.websiteUrl + this.pageDatasetElement.dataset.mainDataFileUrl;
    }

    TestMainApiEndpoint() {
        fetch(this.mainApiEndpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                console.log("Success:", data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    GenerateGeneratePdfButton() {
        this.generatePdfButton = this.ElementGenerator.Generate(true, new HTMLComposedTags("button"), `generate_pdf_button`, ["generate_pdf_button"], [["type", "button"]], this.outerContainer, [], "Generar");

        this.generatePdfButton.addEventListener("click", async () => {
            var result = collectFormData();
            try {
                const response = await fetch(this.mainApiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(result)
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status} ${response.statusText}`);
                }

                const pdfBlob = await response.blob();
                const url = window.URL.createObjectURL(pdfBlob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = this.printableOverlayFileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } catch (error) {
                console.error('Download failed:', error);
            }
        })

        function collectFormData() {
            const inputs = document.querySelectorAll('input[name]');
            const formData = {};
            inputs.forEach(input => {
                formData[input.name] = input.value;
            });
            return formData;
        }
    }
}


class VehicleRegistrationDocumentField {
    ElementGenerator = new HTMLElementGenerator()
    ComponentContainer;
    ComponentLabel;
    ComponentInputsContainer;
    constructor(mustLog, parent, id, labelValue = "label") {
        this.ComponentContainer = this.ElementGenerator.Generate(true, new HTMLComposedTags("div"), `${id}_outer_container`, ["sniper_list_item_container"], [], parent);
        this.ComponentLabel = this.ElementGenerator.Generate(true, new HTMLComposedTags("label"), `${id}_label`, ["sniper_list_item_label"], [], this.ComponentContainer, [], labelValue);
        this.ComponentInputsContainer = this.ElementGenerator.Generate(true, new HTMLComposedTags("div"), `${id}_inputs_container`, ["sniper_list_item_inputs_container"], [], this.ComponentContainer);
    }
    HTML() {
        return this.ComponentContainer;
    }
}

class SingleInputField extends VehicleRegistrationDocumentField {
    constructor(
        mustLog,
        parent,
        id,
        labelValue = "label",
        inputValue = "input",
        validationClass = null
    ) {
        super(mustLog, parent, id, labelValue);
        this.input = this.ElementGenerator.Generate(
            mustLog,
            new HTMLSimpleTags("input"),
            `${id}_input`,
            ["sniper_list_item_input", "sniper_list_item_single_item_input"],
            [["type", "text"], ["value", `${inputValue}`]],
            this.ComponentInputsContainer
        );

        if (validationClass) {
            validationClass.validation(this.input)
        }
    }
}

class HTMLElementGenerator {
    element = null;
    Generate(
        mustLog = false,
        htmlTag,
        id,
        classes = [],
        attributes = [],
        parent = null,
        children = [],
        value = ""
    ) {
        this.element = document.createElement(htmlTag.Tag)

        if (id) {
            this.element.id = id;
        }

        attributes.forEach(element => {
            this.element.setAttribute(element[0], element[1]);
        });

        classes.forEach(element => {
            this.element.classList.add(element);
        });

        if (Array.isArray(children)) {
            children.forEach(child => {
                this.element.appendChild(child);
            });
        } else {
            this.element.innerHTML = children;
        }

        if (parent) {
            parent.appendChild(this.element);
        }

        if (value && htmlTag instanceof HTMLComposedTags) {
            this.element.innerHTML = value
        }

        return this.element
    }
}

class HTMLSimpleTags {
    Tag = null
    constructor(tag) {
        this.Tag = tag
    }
}

class HTMLComposedTags {
    Tag = null
    constructor(tag) {
        this.Tag = tag
    }
}

class InputValidationBase {
    numberOfCharacters = 0;
    forbiddenCharacters = [""];
    allowedCharacters = [""];
    inputName = "Input Name";

    constructor(
        numberOfCharacters = 10,
        inputName
    ) {
        this.numberOfCharacters = numberOfCharacters
        this.inputName = inputName
    }

    displayError(message) {
        alert(message);
    }

    validation(input) {
        const inputValue = input.value;
        if(inputValue.length > this.numberOfCharacters){
            this.displayError(`"${this.numberOfCharacters}" es el máximo de caracteres para ${this.inputName}.`)
        }
        this.validationAction(input)
    }
}

class AlfanumericValidation extends InputValidationBase {

    constructor(
        numberOfCharacters = 10,
        inputName,
        input
    ) {
        super(numberOfCharacters, inputName)

        this.validationAction = (input) => {
            input.addEventListener("input", () => {
                const inputValue = input.value
                inputValue.forEach(character => {
                    if (this.forbiddenCharacters.includes(character)) {
                        displayError(`${character} es inválido para ${this.inputName}`)
                        const replacementValue = inputValue.replace(character, "")
                        input.value = replacementValue;
                    }
                });
            })
        }
    }
}

class NumericValidation extends InputValidationBase {
    numberOfCharacters = 0;
    allowedCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    constructor(
        numberOfCharacters = 10,
        inputName
    ) {
        super(numberOfCharacters, inputName)

        this.validationAction = (input) => {
            input.addEventListener("input", () => {
                const inputValue = input.value
                inputValue.forEach(character => {
                    if (this.forbiddenCharacters.includes(character)) {
                        displayError(`${character} es inválido para ${this.inputName}. Sólo números son admitidos en este campo.`)
                        const replacementValue = inputValue.replace(character, "")
                        input.value = replacementValue;
                    }
                });
            })
        }
    }
}

class AlphabeticValidation extends InputValidationBase {
    numberOfCharacters = 0;
    allowedCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "á", "é", "í", "ó", "ú", "ü", "Á", "É", "Í", "Ó", "Ú", "Ü"];

    constructor(
        numberOfCharacters = 10,
        inputName
    ) {
        super(numberOfCharacters, inputName)

        this.validationAction = (input) => {
            input.addEventListener("input", () => {
                const inputValue = input.value
                inputValue.forEach(character => {
                    if (this.forbiddenCharacters.includes(character)) {
                        displayError(`${character} es inválido para ${this.inputName}. Sólo letras son admitidas en este campo.`)
                        const replacementValue = inputValue.replace(character, "")
                        input.value = replacementValue;
                    }
                });
            })
        }
    }
}