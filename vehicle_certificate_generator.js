class VehicleCertificateGenerator {
    ElementGenerator = new HTMLElementGenerator()
    OuterContainer = null
    PlacaTop = null
    printedFileName = "sample_name.pdf"
    generatePdfButton = null
    websiteUrl = ""
    mainApiEndpoint = ""
    mainDataFileUrl = ""

    constructor(element, websiteUrl) {
        this.websiteUrl = websiteUrl
        this.StoreOuterContainer(element)
        this.StorePageDatasetElement()
        this.SetMainApiEndpoint()
        this.SetMainDatafileUrl()
        this.GenerateGeneratePdfButton(element)
        this.StoreCurrentDate()
        this.StoreCurrentTime()
        this.components = this.ComponentsConfig.map(config => {
            if (config.class === MultiInputField) {
                return new config.class(false, this.OuterContainer, config.name, config.inputs, config.label);
            } else if (config.class === SingleInputField) {
                return new config.class(false, this.OuterContainer, config.name, config.label, config.input);
            }
        });
        console.log(this)
    }

    ComponentsConfig = [
    {
        name: 'nombre_de_la_empresa',
        class: SingleInputField,
        label: "Nombre de la empresa",
        input: "SNIPER CERTIFICATE PRECISSION PRINTER C.A.",
    },
    {
        name: 'fecha_de_emision',
        class: MultiInputField,
        label: "Fecha de Emisión",
        inputs: 8
    },
    {
        name: 'factura_1_n_fecha',
        class: SingleInputField,
        label: "Factura 1 N°/Fecha",
        input: "Nombre de la empresa"
    },
    {
        name: 'placa',
        class: MultiInputField,
        label: "Placa",
        inputs: 7
    },
    {
        name: 'marca',
        class: SingleInputField,
        label: "Marca",
        input: "FORD"
    },
    {
        name: 'modelo',
        class: SingleInputField,
        label: "Modelo",
        input: "FORD"
    },
    {
        name: 'ano_de_fabricacion',
        class: MultiInputField,
        label: "Año de frabricacion",
        inputs: 4
    },
    {
        name: 'ano_de_modelo',
        class: MultiInputField,
        label: "Año de Modelo",
        inputs: 4
    },
];
    

    GenerateNombreDeLaEmpresaComponent(mustLog) {
        this.PlacaTop = new NombreDeLaEmpresa(false, this.OuterContainer)
    }

    GeneratePlacaComponent(mustLog) {
        this.PlacaTop = new PlacaComponent(false, this.OuterContainer)
    }

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

    StoreOuterContainer(element) {
        this.OuterContainer = document.getElementById(element)
        if (!this.OuterContainer) {
            console.error(`Invalid element ${element}`)
        }
    }

    StorePageDatasetElement() {
        this.pageDatasetElement = document.getElementById(page_dataset_attributes)
    }

    GenerateGeneratePdfButton() {
        this.generatePdfButton = this.ElementGenerator.Generate(true, new HTMLComposedTags("button"), `generate_pdf_button`, ["generate_pdf_button"], [["type","button"]], this.OuterContainer, [], "Generar");
    }

    SetMainApiEndpoint() {
        this.mainApiEndpoint = this.websiteUrl + this.pageDatasetElement.dataset.mainApiEndpoint;
    }

    SetMainDatafileUrl() {
        this.mainDataFileUrl = this.websiteUrl + this.pageDatasetElement.dataset.mainDataFileUrl;
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

class MultiInputField extends VehicleRegistrationDocumentField {
    constructor(mustLog, parent, id, numberOfInputs, labelValue) {
        super(mustLog, parent, id, labelValue);
        this.inputs = [];
        for (let i = 1; i <= numberOfInputs; i++) {
            const input = this.ElementGenerator.Generate(
                mustLog,
                new HTMLSimpleTags("input"),
                `${id}_input_${i}`,
                ["sniper_list_item_input", "sniper_list_item_composed_item_input"],
                [["type", "text"], ["value", `${i}`]],
                this.ComponentInputsContainer
            );
            this.inputs.push(input);
        }
    }
}

class SingleInputField extends VehicleRegistrationDocumentField {
    constructor(mustLog, parent, id, labelValue = "label", inputValue="input") {
        super(mustLog, parent, id, labelValue);
        this.input = this.ElementGenerator.Generate(
            mustLog,
            new HTMLSimpleTags("input"),
            `${id}_input`,
            ["sniper_list_item_input", "sniper_list_item_single_item_input"],
            [["type", "text"], ["value", `${inputValue}`]],
            this.ComponentInputsContainer
        );
    }
}

class NombreDeLaEmpresa extends SingleInputField {
    constructor(mustLog, parent, id = "nombre_de_la_empresa", inputValue = "Nombre de la empresa", labelValue = "SNIPER CERTIFICATE PRECISSION PRINTER C.A.") {
        super(mustLog, parent, id, inputValue, labelValue);
    }
}

class PlacaComponent extends MultiInputField {
    constructor(mustLog, parent, id = "placa", numberOfInputs = "7") {
        super(mustLog, parent, id, numberOfInputs);
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