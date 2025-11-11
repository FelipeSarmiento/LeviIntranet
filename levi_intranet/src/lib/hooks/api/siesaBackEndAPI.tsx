import { variablesEnum } from "@/lib/enums/variablesEnum";
import {
    ActivosFijosInterface,
    BodegasInterface,
    CentroCostosSiesaInterface,
    ItemsEtiquetasInterface, ItemsInterface, ItemsToPrintInterface,
    ListaPreciosInterface, RemisionesInterface,
    TasaCambioInterface,
    TipoInventariosInterface,
    UbicacionesInterface
} from "@/lib/interfaces/_interfaces";

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
            console.log(response)
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: BodegasInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
export async function getAllCentroCostos() {
    const urlF = url +  variablesEnum.urlCentroCostos; // Misma URL del centro de costos de Ofima, pero con el identificador de Siesa

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

        const data: CentroCostosSiesaInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
export async function getTipoInventarios(centroCosto : string, compania: string) {
    const urlF = url +  variablesEnum.urlTipoInventarios + `?centroCosto=${centroCosto}&compania=${compania}`;

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

        const data: TipoInventariosInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
export async function getActivosFijos(centroCosto : string, tipoInventario: string, compania: string) {
    const urlF = url +  variablesEnum.urlActivosFijos + `?centroCosto=${centroCosto}&tipoInventario=${tipoInventario}&compania=${compania}`;

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

        const data: ActivosFijosInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
export async function getAllUbicaciones(bodega: string, compania: string) {
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

        const data: ListaPreciosInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
export async function getAllTasaCambio() {
    const urlF = url +  variablesEnum.urlTasaCambio;

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

        const data: TasaCambioInterface[] = await response.json();
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

        const data: ItemsEtiquetasInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
export async function getAllItemsByIds(item : string[], compania: string) {
    const urlF = url +  variablesEnum.urlItemsByIds + '?compania=' + compania;

    try {
        const response = await fetch(urlF, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: ItemsToPrintInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
export async function getItemById(item : string) {
    const urlF = url +  variablesEnum.urlItemById + '?id=' + item;

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

        const data: ItemsInterface = await response.json();
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

        const data: ItemsEtiquetasInterface[] = await response.json();
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

        const data: RemisionesInterface[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
