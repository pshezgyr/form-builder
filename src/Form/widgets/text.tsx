import * as React from "react";
import { FormWidget } from "../index";
import { registerWidget } from "./../registry";

registerWidget(FormWidget.TEXT, (config = {}) => {
    return {
        component: (params = {}) => { // could be anything
            const props = Object.assign({}, config, params);
            return <input {...props} />;
        },
        preview: "hello text",
        pallete: "text",
    };
});