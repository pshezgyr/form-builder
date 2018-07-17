import * as React from "react";
import { FormWidget } from "../index";
import { registerWidget } from "./../registry";

registerWidget(FormWidget.SELECT, (config = {}) => {
    return {
        component: (params = {}) => {
            const props = Object.assign({}, config, params);
            return (
                <select>
                    <option>1</option>
                </select>
            );
        },
        preview: "hello select",
        pallete: "select",
    };
});