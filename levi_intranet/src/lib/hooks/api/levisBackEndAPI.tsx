import { variablesEnum } from "@/lib/enums/variablesEnum";
import {QuincenasInterface} from "@/lib/interfaces/_interfaces";

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