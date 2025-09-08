import HTMLComposedTags from "./html_composed_tags.js";

export default class HTMLElementGenerator {
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