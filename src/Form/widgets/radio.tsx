import * as React from "react";
import { FormWidget } from "../index";
import { registerWidget } from "./../registry";

class Radio extends React.Component {
    public setGender(event) {
        console.log(`Selected %s`, event.target.value);
    }
    render() {
        return (
            <div onChange={this.setGender.bind(this)}>
                <span>
                    <input type="radio" value="MALE" name="gender" />
                    Male
                </span>
                <span>
                    <input type="radio" value="FEMALE" name="gender" />
                    Female
                </span>
            </div>
        )
    }
}

registerWidget(FormWidget.RADIO, (config = {}) => {
    return {
        component: (params = {}) => {
            const props = Object.assign({}, config, params);
            return (
                <Radio {...props} />
            );
        },
        preview: "hello radio",
        pallete: "radio",
    };
});