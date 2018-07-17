// implicitly listing widgets fabrics in registry
import "./widgets/text";
import "./widgets/select";
import "./widgets/radio";
export { widgetRegistry } from "./registry";

// available widgets
export const enum FormWidget {
    TEXT = "text",
    SELECT = "select",
    RADIO = "radio",
}

// re-export HOC
export * from "./Form";