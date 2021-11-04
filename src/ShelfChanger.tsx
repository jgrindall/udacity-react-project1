import * as React from 'react';
import {IBookProps, Shelf, IOption} from "./types";
import {getLabel} from "./Labels";

const shelves = [
    Shelf.SHELF_CURRENTLY_READING,
    Shelf.SHELF_WANT_TO_READ,
    Shelf.SHELF_READ
];

const ShelfChanger = (props:IBookProps)=>{
    const value:string = props.book.shelf || "none";

    const moveOptions = shelves.map( (shelf:Shelf, i:number)=>{
        const isCurrentShelf = (props.book.shelf === shelf);
        return {
            value:shelf,
            label: getLabel(shelf),
            disabled: isCurrentShelf
        };
    });

    const options:IOption[] = [
        {
            value:"move",
            label:"Move to...",
            disabled:true
        },
        ...moveOptions,
        {
            value:"none",
            label:"None",
            disabled: !shelves.includes(props.book.shelf)
        }
    ];

    const makeOptionElement = (option:IOption)=>{
        const prefix = (props.book.shelf === option.value ? "* " : "");
        return <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
        >
            {prefix + option.label}
        </option>;
    };

    return (
        <div className={"book-shelf-changer" + (shelves.includes(props.book.shelf) ? ' exists' : '')}>
            <select value={value} onChange={props.onMove}>
                {options.map(makeOptionElement)}
            </select>
        </div>
    );
};

export default ShelfChanger;
