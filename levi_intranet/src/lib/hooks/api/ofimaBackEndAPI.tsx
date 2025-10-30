import { variablesEnum } from "@/lib/enums/variablesEnum";
import {CentroCostosOfimaInterface, EmpleadoInterface, QuincenasInterface} from "@/lib/interfaces/_interfaces";

const credentials = btoa(`${variablesEnum.username}:${variablesEnum.password}`);

const url =  variablesEnum.urlBase + variablesEnum.urlOfima;

export async function getEmpleadoActivoByCedula(cedula : string) {

    const urlF = url + variablesEnum.urlEmpleadosActivos + "?cedula=" + cedula

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

        const data : EmpleadoInterface = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return undefined;
    }
}
export async function getAllEmpleadosActivos() {

    const urlF = url + variablesEnum.urlAllEmpleadosActivos

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

        const data : EmpleadoInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return undefined;
    }
}
export async function getEmpleadoRetiradoByCedula(cedula : string) {

    const urlF = url + variablesEnum.urlEmpleadoRetirado + "?cedula=" + cedula

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

        const data : EmpleadoInterface = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return undefined;
    }
}
export async function getEmpleadosProximosVencerByCedula(cedula : string, centroCostos: string) {

    const urlF = url + variablesEnum.urlEmpleadosProximoVencerByCedula + "?cedula=" + cedula + "&centroCostos=" + centroCostos

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

        const data : EmpleadoInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return undefined;
    }
}
export async function getEmpleadosProximosVencer() {

    const urlF = url + variablesEnum.urlEmpleadosProximoVencer

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

        const data : EmpleadoInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return undefined;
    }
}
export async function getHistorialContratosEmpleadoRetirado(cedula : string) {

    const urlF = url + variablesEnum.urlEmpleadosRetirados + "?cedula=" + cedula

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

        const data : EmpleadoInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return undefined;
    }
}
export async function getAllCentroCostos() {

    const urlF = url + variablesEnum.urlCentroCostos

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

        const data : CentroCostosOfimaInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return undefined;
    }
}