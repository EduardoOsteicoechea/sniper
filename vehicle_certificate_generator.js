class VehicleCertificateGenerator {

    OuterContainer = null
    PlacaTop = null

    constructor(elementId) {
        this.StoreOuterContainer(elementId)
        this.StoreCurrentDate()
        this.StoreCurrentTime()
        this.GeneratePlacaComponent(true)


    }

    CreateHTMLElement(mustLog = false, tag, id, classes = [], attributes = [], parent = null, children = [], value="") {
        const component = document.createElement(tag)
        if (id) {
            component.id = id;
        }
        attributes.forEach(element => {
            component.setAttribute(element[0], element[1]);
        });
        classes.forEach(element => {
            component.classList.add(element);
        });
        if (Array.isArray(children)) {
            children.forEach(child => {
                component.appendChild(child);
            });
        } else {
            component.innerHTML = children;
        }
        if (parent) {
            parent.appendChild(component);
        }
        if(value){
            component.innerHTML
        }
        return component
    }

    GeneratePlacaComponent(mustLog) {
        this.PlacaTop = this.CreateHTMLElement(mustLog, "div", "placa_outer_container", ["sniper_list_item_composed_item_inputs"],[], this.OuterContainer)

        for (let index = 0; index < 7; index++) {
            const element = this.CreateHTMLElement(mustLog, "input", `placa_value_${index}`, ["sniper_list_item_input","sniper_list_item_composed_item_input"],[["type","text"],["value",index]], this.PlacaTop,[]);
        }
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

    StoreOuterContainer(elementId) {
        this.OuterContainer = document.getElementById(elementId)

        if (!this.OuterContainer) {
            console.error(`Invalid elementId ${elementId}`)
        }
    }
}