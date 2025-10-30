export interface ItemsInterface {
    idItem: string;
    codigo: string,
    tienda: string,
    referencia: string,
    descripcion: string,
    color: string,
    talla: string,
    sublinea: string,
    plu: string,
    precioPublico: string,
    cantidad: string,
    fecha: string,
    codigoBarra: string
}

export interface ItemsToPrintInterface {
    id: string;
    descripcion: string;
    referencia: string;
    extension1: string;
    extension2: string;
    cantidad: number;
    codigoBarra: string;
    precio: string;
}

export interface ListaPreciosInterface {
    id: string;
    descripcion: string;
}

export interface QuincenasInterface {
    anio: string;
    quincenaNum: string;
    quincena: "01-2011",
    fechaInicio: null,
    fechaFin: null
}

export interface BodegasInterface {
    idCia: number,
    rowId: number,
    id: string,
    descripcion: string,
    descripcionCorta: string,
    idCo: string,
    idInstalacion: string,
    rowIdContacto: number
    indEstado: number
    indCntrlExistencia: number
    indMultiUbicacion: number
    indLotes: number
    indCostos: number
    indFacturable: number
    indConsiderableMrp: number
    notas: string,
    idInstalacionBaseMrp: string,
    idCiaBaseMrp: number
    indConsigDada: number
    indExclusivoPdv: number
    indCntrlDisponibilidad: number
    rowIdMovtoEntidad: number
    idBd: string,
    identificacionMac: string,
    idPortafolioInv: string,
    indUmPortafolioInv: number
    rowIdCentroCostos: number
    indConsigRecibida: number
    rowIdBodegaPropia: number
}

export interface CentroCostosSiesaInterface {
    idCentroCosto: string,
    centroCosto: string,
    descripcion: string
}

export interface TipoInventariosInterface {
    idTipoInventario: string,
    descripcion: string,
}

export interface ActivosFijosInterface {
    rowIdActivoFijo: string,
    idCompania: string,
    idActivoFijo: string,
    referencia: string,
    descripcion: string,
    compania: string,
    rowIdCentroCosto: string,
    rowIdResponsable: string,
    idUn: string,
    rowIdMovimientoEntidad: string,
    marca: string,
    modelo: string,
    serie: string,
    motor: string,
    notas: string,
    centroCosto?: CentroCostosSiesaInterface,
    tipoInventario?: TipoInventariosInterface
}

export interface UbicacionesInterface {
    id: string;
    descripcion: string;
    descripcionCortaBodega: string;
    bodegaId: string;
    bodegaRowId: number;
}

export interface DataFormHookInterface {
    typeForm: string
    information: string,
    companyEnable?: boolean | null,
    documentTypeEnable?: boolean | null,
    dateEnable?: boolean | null,
    notesEnable?: boolean | null,
    documentEnable?: boolean | null,
    monthsEnable?: boolean | null,
    buttonLabel?: string | null,
    fileEnable?: boolean | null,
    bodegaEnable?: boolean | null,
    cartaTypeEnable?: boolean | null,
    centroCostosEnable?: boolean | null,
    centroCostosOptions?: CentroCostosOfimaInterface[] | null,
    historialContratosEnable?: boolean | null,
    cartaTypeOptions?: CartaTypesInterface[] | null,
    placeholderCartaTypeOptions?: string | null,
    quincenaEnable?: boolean | null,
    ordenCompraEnable?: boolean | null,
    remisionesEnable?: boolean | null,
    newDocumentEnable?: boolean | null,
    valorDocumentoEnable?: boolean | null,
    funcionesEnable?: boolean | null,
    responsibleEnable?: boolean | null,
    customButtons?: boolean | null,
    primaryButtonLabel?: string | null,
    secondButtonLabel?: string | null,
    centroOperativo?: string | null,
    bodegas?: BodegasInterface[] | null,
    quincenas?: QuincenasInterface[] | null,

}

export interface CartaTypesInterface {
    value: string;
    label: string;
}

export interface CentroCostosOfimaInterface {
    codigo: string;
    descripcion: string;
}

export interface FilesDownloadInterface {
    archivo: Blob;
    nombreArchivo: string
}

export interface FileDownloadInterface {
    fileName: string;
    fileURL: string;
    blob: Blob;
    fileExtension: string;
    fileType: string;
}

export interface RemisionesInterface {
    cedi: string;
}

export interface ProductoRemisionInterface {
    "idBodega": string;
    "talla": string;
    "cedi": string;
    "oc": string;
    "producto": number,
    "descripcion": string;
    "telefono": string;
    "numeroDoc": string;
    "cantidad": number;
    "referencia": string;
    "fechaExp": string;
    "direccion": string;
}

export interface EmpleadoInterface {
    "cedula": string;
    "nombre": string;
    "fechaContrato": string | number;
    "fechaRetiro": string | number;
    "prorrogaUno": string | number;
    "prorrogaDos": string | number;
    "prorrogaTres": string | number;
    "codigoCentroCostos": string | number;
    "nombreCentroCostos": string | number;
    "duracionContrato": string | number;
    "empresa": string;
    "salarioIntegral": string;
    "salarioFijo": string;
    "valorSalario": string;
    "valorSalarioLetras": string;
    "cargo": string;
    "tipoContrato": string;
    "primerApellido": string;
    "segundoApellido": string;
    "primerNombre": string;
    "segundoNombre": string;
    "email": string;
    "activo": number
}

export interface BonificacionesDataExcelInterface {
    cedula: string;
    nombreEmpleado: string;
    pagoBonificacion: number;
    existeEmpleado: boolean;
}

export interface TasaCambioInterface {
    "compania": number,
    "idTipoCambio": string,
    "idMoneda": string,
    "fecha": string,
    "tasa": number
}