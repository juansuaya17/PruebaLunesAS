import { CustomData } from '../../data-structure/CustomData';
// Primer filtro: Convierte el input a minúsculas y añade un espacio entre cada letra.
export const firstFilter = (input: CustomData): CustomData => {
    let result: string = input.data
        .toLowerCase()             // Convierte el string a minúsculas.
        .split('')                  // Separa el string en un array de caracteres.
        .join(' ');                 // Une los caracteres con un espacio entre ellos.
    console.log(`Filtro toLowercaseWithSpaces,  input${JSON.stringify(input)}, output ${result} }`)
    return {data: result}
};