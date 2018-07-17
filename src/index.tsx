import "./index.css";
import "core-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { widgetRegistry, withForm, FormProvider } from "./Form";
import SplitPane from "react-split-pane";
import Block from "./Block/Block";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";


const FormItem = withForm(SortableElement((props: any) => {
    // both are equal
    // console.log(formctx.getWidgetAtPosition(index));
    // console.log(formctx.getWidgetByType(item.type));

    const { item, formctx, index } = props;
    const widget = formctx.getWidgetByType(item.type);
    return (
        /* can be parametrized inplace */
        <li>{widget.component()}</li>
    );
}));
const FormItemsList = SortableContainer((props: any) => {
    const { scheme } = props;
    return (
        <ul>
            {scheme.map((item, idx) => {
                return (
                    <FormItem
                        key={`form-${idx}`}
                        index={idx}
                        item={item}
                    />
                );
            })}
        </ul>
    );
});
const Form = withForm(class extends React.Component<any, any> {
    constructor(p, s) {
        super(p, s);
        this.handleSortEnd = this.handleSortEnd.bind(this);
    }
    public handleSortEnd({ oldIndex, newIndex }) {
        return this.props.formctx.rearrangeWidget(oldIndex, newIndex);
    }
    public render() {
        const { formctx } = this.props;
        const { scheme } = formctx;
        if (!scheme.length) {
            return null;
        }
        return (
            <FormItemsList
                onSortEnd={this.handleSortEnd}
                scheme={scheme}
            />
        );
    }
});

const Pallete = withForm(({ formctx }) => {
    const keys = widgetRegistry.getKeys();
    return (
        <div>
            {keys && keys.length && keys.map((key, idx) => {
                const { preview, pallete } = widgetRegistry.get(key)();
                return (
                    <button
                        key={idx}
                        onClick={() => {
                            formctx.addWidget(key, preview, {});
                        }}
                    >{pallete}</button>
                );
            })}
        </div>
    );
});


const SchemeReceiver = withForm(({ formctx }) => {
    return (
        <textarea
            className={"Code__textarea"}
            defaultValue={"Paste your export code here"}
            onFocus={(evt: any) => evt && evt.target && evt.target.select()}
            onChange={(evt: any) => {
                formctx.setScheme(evt.target.value);
            }}
        />
    )
});

const SchemeDumper = withForm(({ formctx }) => {
    return (
        <textarea
            className={"Code__textarea"}
            value={JSON.stringify(formctx.scheme, null, 4)}
            onFocus={(evt: any) => evt && evt.target && evt.target.select()}
            onChange={() => { }}
        />
    )
});


const App = withForm(({ formctx }) => {
    return (
        <SplitPane
            split={"vertical"}
            defaultSize={"50%"}
        >
            <Block
                title={"Preview (try drag-drop)"}
            >
                <Form scheme={{}} />
            </Block>
            <SplitPane
                split={"horizontal"}
                defaultSize={100}
            >
                <Block title={"Palette (@TODO customize widgets)"}>
                    <Pallete />
                </Block>
                <Block title={"Code"} buttons={[{
                    title: "clear scheme", onClick: () => {
                        formctx.setScheme("[]");
                    }
                }]}>
                    <Tabs className={"Tabs"}>
                        <TabList className={"Tabs__list"}>
                            <Tab>Export</Tab>
                            <Tab>Import</Tab>
                        </TabList>
                        <TabPanel className={"Tabs__panel"}>
                            <SchemeDumper />
                        </TabPanel>
                        <TabPanel className={"Tabs__panel"}>
                            <SchemeReceiver />
                        </TabPanel>
                    </Tabs>
                </Block>
            </SplitPane>
        </SplitPane>
    );
});

ReactDOM.render((
    <FormProvider>
        <App />
    </FormProvider>
), document.getElementById("root") as HTMLElement);