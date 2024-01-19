import { generatePath } from "react-router-dom";

export const homePattern = '/';
export const homeRoutePattern = ()=>{
    return generatePath(homePattern)
}
export const tablePattern = '/table';
export const tableRoutePattern = ()=>{
    return generatePath(tablePattern)
}