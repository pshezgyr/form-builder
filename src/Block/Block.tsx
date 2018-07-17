import "./Block.css";
import * as React from "react";

const cn = {
    wrapper: "Block",
    header: "Block__header",
    title: "Block__title",
    button: "Block__button",
    items: "Block__items",
}

interface IBlockHeaderProps {
    title: string;
    buttons?: { title: string, onClick: () => void }[];
}
const BlockHeader = (props: IBlockHeaderProps) => {
    const { title, buttons } = props;
    return (
        <div className={cn.header}>
            {buttons && buttons.map((button, idx) => {
                return <button className={cn.button} key={`block-button-${idx}`} onClick={button.onClick}>{button.title}</button>
            })}
            <div className={cn.title}>{title}</div>
        </div>
    )
}

interface IBlockItemsProps {
    children?: JSX.Element | JSX.Element[];
}
const BlockItems = (props: IBlockItemsProps) => {
    if (!props.children) {
        return null;
    }
    return (
        <div className={cn.items}>
            {props.children}
        </div>
    )
}

export interface IBlockProps extends IBlockHeaderProps, IBlockItemsProps {
}
const Block = (props: IBlockProps) => {
    return (
        <div className={cn.wrapper}>
            {props.title && <BlockHeader {...props} />}
            {props.children && <BlockItems {...props} />}
        </div>
    );
}

export default Block;