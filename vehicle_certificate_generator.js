import HTMLElementGenerator from "./html_generator.js";
import HTMLComposedTags from "./html_composed_tags.js";
import VehicleRegistrationDocumentField from "./vehicle_registration_document_field.js";
import InputValidationBase from './input_validation.js';

export default class VehicleCertificateGenerator {
    ElementGenerator = new HTMLElementGenerator()

    outerContainer = null
    websiteUrl = ""
    mainApiEndpoint = ""
    mainDataFileUrl = ""
    componentConfigDataFileUrl = ""
    componentConfigData = ""

    PlacaTop = null
    printableOverlayFileName = "sample_name.pdf"
    generatePdfButton = null

    constructor(
        outerContainer,
        websiteUrl,
        mainApiEndpoint,
        mainDataFileUrl,
        componentConfigDataFileUrl,
    ) {
        this.outerContainer = outerContainer
        this.websiteUrl = websiteUrl
        this.mainApiEndpoint = mainApiEndpoint
        this.mainDataFileUrl = mainDataFileUrl
        this.componentConfigDataFileUrl = componentConfigDataFileUrl

        this.GenerateGeneratePdfButton()
        this.StoreCurrentDate()
        this.StoreCurrentTime()
    }

    async initialize() {
        try {
            this.componentConfigData = await this.GetComponentConfigData();

            console.log(this.componentConfigData);

            this.components = this.componentConfigData.fieldsData.map(config => new VehicleRegistrationDocumentField(
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

        } catch (error) {
            console.error("Failed to initialize component config data:", error);
        }
    }

    async GetComponentConfigData() {
        return await fetch(this.componentConfigDataFileUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Success:", data);
                return data;
            })
            .catch(error => {
                console.error("Error:", error);
                throw error;
            });
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
            console.log(result);
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
}