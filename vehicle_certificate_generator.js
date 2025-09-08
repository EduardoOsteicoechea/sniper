import HTMLElementGenerator from "./html_generator.js";
import HTMLComposedTags from "./html_composed_tags.js";
import HTMLSimpleTags from "./html_simple_tags.js";
import InputValidationBase from './input_validation.js';

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

        this.components = this.ComponentsConfig.map(config => new VehicleRegistrationDocumentField(
            false,
            this.outerContainer,
            config.name,
            config.label,
            config.input,
            new InputValidationBase(
                config.validationClassArgs[0],
                config.label,
                config.validationClassArgs[1]
            )
        ));

        console.log(this)
    }

    ComponentsConfig = [
        {
            name: 'nombre_de_la_empresa',
            label: "Nombre de la empresa",
            input: "SNIPER CERTIFICATE PRECISSION PRINTER C.A.",
            validationClassArgs: [50, 3]
        },
        {
            name: 'fecha_de_emision',
            label: "Fecha de Emisión",
            input: "2025",
            validationClassArgs: [8, 2]
        },
        {
            name: 'serie_de_numero_de_factura_1',
            label: "Serie de Número de Factura 1",
            input: "SERIE A",
            validationClassArgs: [7, 1]
        },
        {
            name: 'numero_de_factura_1',
            label: "Número de Factura 1",
            input: "00000020",
            validationClassArgs: [8, 2]
        },
        {
            name: 'fecha_de_factura_1',
            label: "Fecha Factura 1",
            input: "20250908",
            validationClassArgs: [8, 2]
        },
        {
            name: 'placa',
            label: "Placa",
            input: "AD3J59R",
            validationClassArgs: [7, 3]
        },
        {
            name: 'marca',
            label: "Marca",
            input: "LEILONG",
            validationClassArgs: [50, 3]
        },
        {
            name: 'modelo',
            label: "Modelo",
            input: "AS 150",
            validationClassArgs: [15, 3]
        },
        {
            name: 'ano_de_fabricacion',
            label: "Año de Fabricación",
            input: "2025",
            validationClassArgs: [4, 2]
        },
        {
            name: 'serial_niv',
            label: "Serial N.I.V.",
            input: "L2YPCKLC3S0L02148",
            validationClassArgs: [17, 3]
        },
        {
            name: 'ano_modelo',
            label: "Año Modelo",
            input: "2025",
            validationClassArgs: [4, 2]
        },
        {
            name: 'serial_chasis',
            label: "Serial Chasis",
            input: "L2YPCKLC3S0L02148",
            validationClassArgs: [17, 3]
        },
        {
            name: 'serial_motor',
            label: "Serial Motor",
            input: "L2YPCKLC3S0L021480",
            validationClassArgs: [18, 3]
        },
        {
            name: 'serial_carrocería',
            label: "Serial Carrocería",
            input: "L2YPCKLC3S0L021480",
            validationClassArgs: [18, 3]
        },
        {
            name: 'serial_carrocería',
            label: "Serial Carrocería",
            input: "L2YPCKLC3S0L021480",
            validationClassArgs: [18, 3]
        },
        {
            name: 'clase',
            label: "Clase",
            input: "MT",
            validationClassArgs: [3, 1]
        },
        {
            name: 'tipo',
            label: "Tipo",
            input: "MT",
            validationClassArgs: [3, 1]
        },
        {
            name: 'uso',
            label: "Uso",
            input: "PR",
            validationClassArgs: [3, 1]
        },
        {
            name: 'servicio',
            label: "Servicio",
            input: "PR",
            validationClassArgs: [3, 1]
        },
        {
            name: 'color_pr',
            label: "Color Pr",
            input: "RJ",
            validationClassArgs: [2, 1]
        },
        {
            name: 'color_sec',
            label: "Color Sec",
            input: "",
            validationClassArgs: [2, 1]
        },
        {
            name: 'n_puestos',
            label: "N° de puestos",
            input: "2",
            validationClassArgs: [3, 2]
        },
        {
            name: 'n_ejes',
            label: "N° de Ejes",
            input: "2",
            validationClassArgs: [1, 2]
        },
        {
            name: 'peso_tara',
            label: "Peso (Tara)",
            input: "150",
            validationClassArgs: [5, 2]
        },
        {
            name: 'cap_de_carga',
            label: "Cap de Carga",
            input: "150",
            validationClassArgs: [5, 2]
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

            var result = this.collectFormData();

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
    }

    collectFormData() {
        const inputs = document.querySelectorAll('input[name]');
        const formData = {};
        inputs.forEach(input => {
            formData[input.name] = input.value;
        });
        return formData;
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

    HTML() {
        return this.ComponentContainer;
    }
}