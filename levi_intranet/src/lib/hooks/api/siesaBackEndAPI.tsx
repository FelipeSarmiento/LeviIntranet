import { variablesEnum } from "@/lib/enums/variablesEnum";
import {BodegasInterface, UbicacionesInterface} from "@/lib/interfaces/_interfaces";

const credentials = btoa(`${variablesEnum.username}:${variablesEnum.password}`);

const url = variablesEnum.urlBase + variablesEnum.urlSiesa;

export async function getAllBodegas() {
    const urlF = url +  variablesEnum.urlBodegas;

    try {
        const response = await fetch(urlF, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: BodegasInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
export async function getAllUbcaciones(bodega: string, compania: string) {
    const urlF = url +  variablesEnum.urlUbicaciones + "?bodega=" + bodega + "&compania=" + compania;

    try {
        const response = await fetch(urlF, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: UbicacionesInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
export async function getAllListaPrecios() {
    const urlF = url +  variablesEnum.urlListaPrecios;

    try {
        const response = await fetch(urlF, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
export async function getAllItemsById(item : string, listaPrecio : string, compania: string) {
    const urlF = url +  variablesEnum.urlItemsById + '?id=' + item + '&listaPrecio=' + listaPrecio + '&compania=' + compania;

    try {
        const response = await fetch(urlF, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
export async function getAllItemsByCodigoBarra(codigoBarra : string, listaPrecio : string, compania: string) {
    const urlF = url + variablesEnum.urlItemsByCodigoBarra + '?codigoBarra=' + codigoBarra + '&listaPrecio=' + listaPrecio + '&compania=' + compania;

    try{
        const response = await fetch(urlF, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            console.log('Error Respuestaa: ', response)
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
export async function getRemisionesByConsecutivo(consecutivos : string[]) {
    const urlF = url + variablesEnum.urlRemisionesConsecutivo;

    try {
        const response = await fetch(urlF, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(consecutivos)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
