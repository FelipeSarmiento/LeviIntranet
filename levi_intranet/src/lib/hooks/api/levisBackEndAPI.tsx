import { variablesEnum } from "@/lib/enums/variablesEnum";
import {BonificacionesDataExcelInterface, BonificacionesInterface, QuincenasInterface} from "@/lib/interfaces/_interfaces";

const credentials = btoa(`${variablesEnum.username}:${variablesEnum.password}`);

const url =  variablesEnum.urlBase + variablesEnum.urlLevis;

export async function getAllQuincenas() {

    const urlF = url + variablesEnum.urlQuincenas

    console.log('URL', urlF)

    try {
        const response = await fetch(urlF, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            console.log('Error', response.statusText)
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data : QuincenasInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}

export async function getAllBonificacionesByPeriodoAndResponsable(periodo: string, responsable: string) {

    const urlF = url + variablesEnum.urlGetBonificaciones + `?periodo=${periodo}&responsable=${responsable}`

    try {
        const response = await fetch(urlF, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            console.log('Error', response.statusText)
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data : BonificacionesInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}

export async function addBonificaciones(periodo: string, responsable: string, bonificaciones: BonificacionesDataExcelInterface[]) {

    const urlF = url + variablesEnum.urlAddBonificaciones
    console.log('URL', urlF)

    try {
        const response = await fetch(urlF, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                periodo: periodo,
                responsable: responsable,
                bonificaciones: bonificaciones
            })
        });

        if (!response.ok) {
            console.log('Error', response.statusText)
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data : boolean = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
export async function uploadBonificacionesToOfima(periodo: string, responsable: string) {

    const urlF = url + variablesEnum.urlUploadBonificacionesToOfima + `?periodo=${periodo}&responsable=${responsable}`;

    try {
        const response = await fetch(urlF, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            console.log('Error', response.statusText)
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data : boolean = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return false;
    }
}