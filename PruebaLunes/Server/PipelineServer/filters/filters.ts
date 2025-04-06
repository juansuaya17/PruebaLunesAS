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

// Segundo filtro: Reemplaza los espacios por guiones bajos, asincronico con timeout forzado.
export const secondFilter = async (input: CustomData): Promise<CustomData> => {
    const result = await new Promise<CustomData>((resolve) => {
        setTimeout(() => {
            let result: string = input.data.replace(/ /g, '_'); // Reemplaza los espacios por guiones bajos.
            console.log(`Filtro replaceSpacesWithUnderscores,  input${JSON.stringify(input)}, output ${result} }`)
            resolve({data: result});
        }, 1000); // Simula un retraso de 1 segundo.
    });
    return result;
}