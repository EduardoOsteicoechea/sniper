import VehicleCertificateGenerator from "./vehicle_certificate_generator.js";

const vehicleCertificateGenerator = new VehicleCertificateGenerator(
    document.getElementsByTagName("main")[0], 
    "https://eduardoos.com/"
)

vehicleCertificateGenerator.generatePdfButton.addEventListener("click", async () => {
    var result = collectFormData();
    try {
        const response = await fetch(pythonApi, {
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
        a.download = vehicleCertificateGenerator.printedFileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Download failed:', error);
    }
})

fetch(pythonApi)
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

function collectFormData() {
    const inputs = document.querySelectorAll('input[name]');
    const formData = {};
    inputs.forEach(input => {
        formData[input.name] = input.value;
    });
    return formData;
}