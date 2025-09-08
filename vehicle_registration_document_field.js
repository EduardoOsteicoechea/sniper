import HTMLElementGenerator from "./html_generator.js";

export default class VehicleRegistrationDocumentField {

    ElementGenerator = new HTMLElementGenerator()
    ComponentContainer;
    ComponentLabel;
    ComponentInputsContainer;

    constructor(
        mustLog, 
        parent, 
        id, 
        labelValue = "label", 
        inputValue = "default",
        validationClass = null,
    ) {

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