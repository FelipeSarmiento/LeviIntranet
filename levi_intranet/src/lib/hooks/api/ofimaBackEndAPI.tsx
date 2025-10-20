import { variablesEnum } from "@/lib/enums/variablesEnum";
import {CentroCostosInterface, CertificadosInterface, QuincenasInterface} from "@/lib/interfaces/_interfaces";

const credentials = btoa(`${variablesEnum.username}:${variablesEnum.password}`);

const url =  variablesEnum.urlBase + variablesEnum.urlOfima;

export async function getCertificadoActivo(cedula : string) {

    const urlF = url + variablesEnum.urlCertificadosActivos + "?cedula=" + cedula

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

        const data : CertificadosInterface = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return undefined;
    }
}
export async function getCertificadoRetirado(cedula : string) {

    const urlF = url + variablesEnum.urlCertificadosRetirado + "?cedula=" + cedula

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

        const data : CertificadosInterface = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return undefined;
    }
}
export async function getContratosProximosVencerByCedula(cedula : string, centroCostos: string) {

    const urlF = url + variablesEnum.urlContratosProximoVencerByCedula + "?cedula=" + cedula + "&centroCostos=" + centroCostos

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

        const data : CertificadosInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return undefined;
    }
}
export async function getContratosProximosVencer() {

    const urlF = url + variablesEnum.urlContratosProximoVencer

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

        const data : CertificadosInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return undefined;
    }
}
export async function getHistorialContratosRetirado(cedula : string) {

    const urlF = url + variablesEnum.urlHistorialContratosRetirado + "?cedula=" + cedula

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

        const data : CertificadosInterface[] = await response.json();
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

        const data : CentroCostosInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return undefined;
    }
}