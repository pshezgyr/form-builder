import * as React from "react";
import { arrayMove } from "react-sortable-hoc";
import { widgetRegistry } from "./registry";

export interface IFormScheme {
}
export interface IFormState {
    scheme: any;
}
const { Provider, Consumer } = React.createContext({});

export class FormProvider extends React.Component<any, IFormState> {
    public state = {
        scheme: [],
    };
    constructor(p, s) {
        super(p, s);
        this.addWidget = this.addWidget.bind(this);
        this.removeWidget = this.removeWidget.bind(this);
        this.rearrangeWidget = this.rearrangeWidget.bind(this);
        this.getWidgetByType = this.getWidgetByType.bind(this);
        this.setScheme = this.setScheme.bind(this);
        this.getWidgetAtPosition = this.getWidgetAtPosition.bind(this);
    }
    private addWidget(type, widget, config) {
        const { scheme } = this.state;
        scheme.push({
            type,
            config,
        });
        this.setState({ scheme });
    }
    private getWidgetByType(type) {
        return widgetRegistry.get(type)();
    }
    private getWidgetAtPosition(idx) {
        const item = this.state.scheme[idx];
        return item && this.getWidgetByType(item.type);
    }
    private removeWidget(key) {
    }
    private setScheme(scheme) {
        scheme = JSON.parse(scheme);
        this.setState({ scheme });
    }
    private rearrangeWidget(idxFrom, idxTo) {
        this.setState({
            scheme: arrayMove(this.state.scheme, idxFrom, idxTo),
        });
    }
    public componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(prevState)
    }
    public render() {
        return (
            <Provider value={{ // our api
                scheme: this.state.scheme,
                addWidget: this.addWidget,
                removeWidget: this.removeWidget,
                rearrangeWidget: this.rearrangeWidget,
                getWidgetByType: this.getWidgetByType,
                getWidgetAtPosition: this.getWidgetAtPosition,
                setScheme: this.setScheme,
            }}>
                {this.props.children}
            </Provider>
        );
    }
}

export function withForm(Comp) {
    return function FormProvidedComponent(props) {
        return (
            <Consumer>
                {(formctx: any) => <Comp {...props} formctx={formctx} />}
            </Consumer>
        );
    };
}
