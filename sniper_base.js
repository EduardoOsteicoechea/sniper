import VehicleCertificateGenerator from "./vehicle_certificate_generator.js";

const componentContainerElement =  document.getElementsByTagName("main")[0];

const pageDatasetElement = document.getElementById("page_dataset_attributes");

const websiteUrl = "https://eduardoos.com";

const vehicleRegistrationFieldsDataFileUrl = "https://eduardoos.com/data_file/vehicle_registration_fields_data.json";

const mainApiEndpoint = websiteUrl + pageDatasetElement.dataset.mainApiEndpoint;

const mainDataFileUrl = websiteUrl + pageDatasetElement.dataset.mainDataFileUrl;

const vehicleCertificateGenerator = new VehicleCertificateGenerator(
    componentContainerElement, 
    websiteUrl,
    mainApiEndpoint,
    mainDataFileUrl,
    vehicleRegistrationFieldsDataFileUrl
);