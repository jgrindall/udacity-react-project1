import {Shelf} from "./types";

export function getLabel(shelf:Shelf){

    const shelves = [
        Shelf.SHELF_CURRENTLY_READING,
        Shelf.SHELF_WANT_TO_READ,
        Shelf.SHELF_READ
    ];

    const labels = [
        'Currently Reading',
        'Want to Read',
        'Read'
    ];

    return labels[shelves.indexOf(shelf)];
}
