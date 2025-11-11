"use client";
import  * as XLSX from "xlsx";
import Image from "next/image";
import {typeFormEnum} from "@/lib/enums/typeFormEnum";
import {generateRequisicionesPlano, generateRequisicionesPedidoPlano} from "@/lib/hooks/requisiciones";
import {generatePlanoConsignaciones, generatePlanoFacturacionVMI, generatePlanoFalabella, generatePlanoJumbo} from "@/lib/hooks/planos";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {ArrowBigRight, CirclePlusIcon, DownloadIcon, EyeIcon, File, LoaderIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {
    EmpleadoInterface,
    DataFormHookInterface,
    FileDownloadInterface,
    FilesDownloadInterface,
    QuincenasInterface,
    BonificacionesDataExcelInterface,
    UbicacionesInterface,
    BonificacionesInterface
} from "@/lib/interfaces/_interfaces";
import {getDataRemisiones} from "@/lib/hooks/remisiones";
import {generateCertificado} from "@/lib/hooks/certificados";
import {
    getAllEmpleadosActivos,
    getEmpleadoActivoByCedula,
    getEmpleadoRetiradoByCedula,
    getEmpleadosProximosVencer,
    getEmpleadosProximosVencerByCedula,
    getHistorialContratosEmpleadoRetirado
} from "@/lib/hooks/api/ofimaBackEndAPI";
import {sendEmail} from "@/components/common/mailHook";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {addBonificaciones, getAllBonificacionesByPeriodoAndResponsable, uploadBonificacionesToOfima} from "@/lib/hooks/api/levisBackEndAPI";
import {generatePlanoOCI} from "@/lib/hooks/TPOaOCI";

export const FormHook = ({data}: { data: DataFormHookInterface }) => {

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    const [file, setFile] = useState<File>();
    const [date, setDate] = useState<string>("");
    const [bodegaSelect, setBodegaSelect] = useState<string>("")
    const [documentTypeSelect, setDocumentTypeSelect] = useState<string>("")
    const [cartaTypeSelect, setCartaTypeSelect] = useState<string>("")
    const [centroCostosSelect, setCentroCostosSelect] = useState<string>("")
    const [monthSelect, setMonthSelect] = useState<number>(1)
    const [quincenaSelect, setQuincenaSelect] = useState<string>("")
    const [ordenCompraInput, setOrdenCompraInput] = useState<string>("")
    const [destinatarioInput, setDestinatarioInput] = useState<string>("")
    const [documentInput, setDocumentInput] = useState<string>("")
    const [numeroRemisionInput, setNumeroRemisionInput] = useState<string>("")
    const [newDocumentInput, setNewDocumentInput] = useState<string>("")
    const [valorDocumentInput, setValorDocumentInput] = useState<string>("")
    const [notesInput, setNotesInput] = useState<string>("")
    const [funcionesInput, setFuncionesInput] = useState<string>("")
    const [error, setError] = useState<string>("");
    const [fileDownload, setFileDownload] = useState<FileDownloadInterface>()
    const [filesDownload, setFilesDownload] = useState<FilesDownloadInterface[]>([])
    const [emailTo, setEmailTo] = useState<string>()
    const [dataEmployee, setDataEmployee] = useState<EmpleadoInterface>()
    const [dataEmployees, setDataEmployees] = useState<EmpleadoInterface[]>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [funcionesEnable, setFuncionesEnable] = useState<boolean>(false)
    const [historialContratosEnable, setHistorialContratosEnable] = useState<boolean>(false)
    const [contratosProximosVencer, setContratosProximosVencer] = useState<EmpleadoInterface[]>()
    const [bonificacionesEmpleadosDataExcel, setBonificacionesEmpleadosDataExcel] = useState<BonificacionesDataExcelInterface[]>()
    const [bonificacionesEmpleados, setBonificacionesEmpleados] = useState<BonificacionesInterface[]>()

    useEffect(() => {
        if (error) {
            alert(error)
        }
    }, [error]);

    const handleFile = async () => {
        setError('')
        setFileDownload(undefined)
        if (data?.fileEnable) {
            if (!file) {
                setError("Selecciona un archivo")
            }
            if (!file?.name.endsWith(".xlsx")) {
                setError("Archivo inválido");
                return;
            }
        }
        if (data?.dateEnable) {
            if (!date) {
                setError("Debe seleccionar una fecha");
                return;
            }
        }
        if (data?.bodegaEnable) {
            if (!bodegaSelect) {
                setError("Debe seleccionar una bodega");
                return;
            }
        }
        if (data?.documentTypeEnable) {
            if (!documentTypeSelect) {
                setError("Debe seleccionar un tipo de documento");
                return;
            }
        }
        if (data?.cartaTypeEnable) {
            if (!cartaTypeSelect) {
                setError("Debe seleccionar un tipo de carta");
                return;
            }
            if (cartaTypeSelect === 'conDestinatario') {
                if (!destinatarioInput) {
                    setError("Debe seleccionar un destinatario");
                    return;
                }
            }
            if (cartaTypeSelect === 'conFunciones') {
                if (!funcionesInput) {
                    setError("Digite las funciones");
                    return;
                }
            }
        }
        if (data?.quincenaEnable) {
            if (!quincenaSelect) {
                setError("Debe seleccionar un tipo de quincena");
                return;
            }
        }
        if (data?.ordenCompraEnable) {
            if (!ordenCompraInput) {
                setError("Digite una orden de compra");
                return;
            }
        }
        if (data?.documentEnable && data?.typeForm !== typeFormEnum.VencimientosContratos) {
            if (!documentInput) {
                setError("Digite el documento");
                return;
            }
        }
        if (data?.remisionesEnable) {
            if (!numeroRemisionInput) {
                setError("Digite el número de la ultima remisión");
                return;
            }
        }
        if (data?.newDocumentEnable) {
            if (!newDocumentInput) {
                setError("Digite el nuevo documento");
                return;
            }
        }
        if (data?.valorDocumentoEnable) {
            if (!valorDocumentInput) {
                setError("Debe el valor del documento");
                return;
            }
        }
        if (data?.notesEnable) {
            if (!notesInput) {
                setError("Digite las notas");
                return;
            }
        }

        setIsLoading(true)

        try {
            let jsonData;
            let dataFile;
            let workbook;
            let sheetName;
            let worksheet;
            if (file) {
                dataFile = await file.arrayBuffer();
                workbook = XLSX.read(dataFile, {type: "array"});
                sheetName = workbook.SheetNames[0];
                worksheet = workbook.Sheets[sheetName];
                jsonData = XLSX.utils.sheet_to_json(worksheet, {defval: ""});
            }

            let plano;

            let fileType = "text/plain"
            let fileExtension = ".txt"
            let dataEmployeeResult;
            // Generar archivo plano
            switch (data?.typeForm) {
                case typeFormEnum.Requisiciones:
                    plano = generateRequisicionesPlano(jsonData, date, data?.centroOperativo);
                    break;
                case typeFormEnum.RequisicionesPedido:
                    plano = generateRequisicionesPedidoPlano(jsonData, date, data?.centroOperativo);
                    break;
                case typeFormEnum.PlanoJumbo:
                    plano = generatePlanoJumbo(jsonData, date, bodegaSelect, data?.centroOperativo);
                    break;
                case typeFormEnum.PlanoFalabella:
                    plano = generatePlanoFalabella(jsonData, date, bodegaSelect, data?.centroOperativo);
                    break;
                case typeFormEnum.PlanoConsignacion:
                    plano = generatePlanoConsignaciones(jsonData, date, data?.centroOperativo);
                    break;
                case typeFormEnum.PlanoFacturacion:
                    plano = generatePlanoFacturacionVMI(jsonData, date, data?.centroOperativo);
                    break;
                case typeFormEnum.Remisiones:
                    dataFile = await file?.arrayBuffer();
                    workbook = XLSX.read(dataFile, {type: "array"});
                    sheetName = workbook.SheetNames[0];
                    worksheet = workbook.Sheets[sheetName];
                    const jsonDataRemisiones = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet, {
                        defval: "",
                        range: 1
                    });
                    const archivosDescargar = await getDataRemisiones(jsonDataRemisiones, numeroRemisionInput)
                    setFilesDownload(archivosDescargar)
                    break;
                case typeFormEnum.CertificadoLaboral:
                    dataEmployeeResult = await getEmpleadoActivoByCedula(documentInput)
                    if (dataEmployeeResult) {
                        setDataEmployee(dataEmployeeResult)

                        plano = await generateCertificado('activo', dataEmployeeResult, destinatarioInput);
                        fileType = "application/pdf"
                        fileExtension = ".pdf"
                    } else {
                        setError(`El empleado con el número de cedula ${documentInput} no existe`)
                    }

                    break;
                case typeFormEnum.CertificadoRetirado:
                    dataEmployeeResult = await getEmpleadoRetiradoByCedula(documentInput)

                    if (dataEmployeeResult) {
                        setDataEmployee(dataEmployeeResult)

                        let historialContratos;
                        if (historialContratosEnable) {
                            historialContratos = await getHistorialContratosEmpleadoRetirado(documentInput)
                        }

                        plano = await generateCertificado('retirado', dataEmployeeResult, destinatarioInput, funcionesInput, historialContratos);
                        fileType = "application/pdf"
                        fileExtension = ".pdf"
                    } else {
                        setError(`El ex-empleado con el número de cedula ${documentInput} no existe`)
                    }

                    break;
                case typeFormEnum.VencimientosContratos:
                    setContratosProximosVencer([])
                    dataEmployeeResult = await getEmpleadosProximosVencer()
                    if (centroCostosSelect && centroCostosSelect !== 'todos') {
                        if (!documentInput) {
                            setError("Debes digitar el documento del empleado si vas a consultar por centro de costos")
                            return;
                        }
                    }

                    if (documentInput) {
                        if (!centroCostosSelect || centroCostosSelect === 'todos') {
                            setError("Debes seleccionar un centro de costos si vas a consultar por empleado")
                            return;
                        }
                        dataEmployeeResult = await getEmpleadosProximosVencerByCedula(documentInput, centroCostosSelect)
                    } else {
                        dataEmployeeResult = await getEmpleadosProximosVencer()
                    }

                    if (dataEmployeeResult) {
                        setContratosProximosVencer(dataEmployeeResult?.filter((contrato) => {

                            const today = new Date();
                            const month = ((today.getMonth() + 2) % 12 == 0) ? 12 : today.getMonth() + 2;

                            const dateProrrogaUno = new Date(contrato.prorrogaUno).getMonth();
                            const dateProrrogaDos = new Date(contrato.prorrogaDos).getMonth();
                            const dateProrrogaTres = new Date(contrato.prorrogaTres).getMonth();
                            const fechaVencimiento = (new Date(contrato.prorrogaUno).getMonth() == month) ? contrato.prorrogaUno : (new Date(contrato.prorrogaDos).getMonth() == month) ? contrato.prorrogaDos : contrato.prorrogaTres

                            if (new Date(fechaVencimiento).getFullYear() >= today.getFullYear()) {
                                if (month == dateProrrogaUno || month == dateProrrogaDos || month == dateProrrogaTres) {
                                    return contrato;
                                }
                            }

                        }))
                        return
                    } else {
                        setError(`El ex-empleado con el número de cedula ${documentInput} no existe`)
                    }

                    break;
                case typeFormEnum.IngresoBonificacion:
                    const dataBonificacion = bonificacionesEmpleadosDataExcel?.filter(b => b.existeEmpleado)
                    if (dataBonificacion && quincenaSelect){
                        const result = await addBonificaciones("PRUEBA", "Felipe Sarmiento", dataBonificacion)
                        if (result){
                            alert("Se han ingresado las bonificaciones correctamente")
                        }
                        else {
                            alert("Error al ingresar las bonificaciones")
                        }
                    }
                    break;
                case typeFormEnum.LiquidacionBonificacion:
                    if (quincenaSelect){
                        const result = await uploadBonificacionesToOfima("PRUEBA", "Felipe Sarmiento")
                        if (result){
                            alert("Se han subido las bonificaciones a Ofima correctamente")
                        }
                        else {
                            alert("Error al subir las bonificaciones a Ofima")
                        }
                    }
                    break;
                case typeFormEnum.TPOaOCI:
                    plano = await generatePlanoOCI(jsonData);
                    break;
            }

            if (plano) {
                // Descargar como archivo
                const blob = new Blob([plano as BlobPart], {type: fileType});
                const url = URL.createObjectURL(blob);
                setFileDownload({
                    fileName: data.information.replace(" ", "") + fileExtension,
                    fileURL: url,
                    blob,
                    fileExtension,
                    fileType
                })
            }
            setIsLoading(false)
        } catch (err) {
            console.error(err);
            setError("Error procesando archivo");
        }
    };

    return (
        <>
            <div className="min-w-3xl px-10 gap-x-10 flex items-center rounded-xl flex-1">
                <div className="flex flex-col items-center justify-center border-2 rounded-2xl min-w-72 w-72 px-10 py-4 min-h-80 gap-y-4">
                    {
                        data?.responsibleEnable ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold text-center" htmlFor="dateDocument">Responsable</label>
                                <Input type="text" value="Felipe Sarmiento" disabled/>
                            </div>
                        ) : ''
                    }
                    {
                        data?.fileEnable ? (
                            <>
                                <div className="flex flex-col h-2/4 items-center text-center justify-end gap-y-4">
                                    <Image className="" src="/images/archivo-excel.png" width={60} height={60} alt=""/>
                                    <span className="font-bold">{file?.name ?? 'Nombre Archivo.xlsx'}</span>
                                </div>
                                <label className="flex items-center justify-center h-1/4 cursor-pointer">
                                    <span className="border-2 py-2 px-4 rounded">Subir archivo</span>
                                    <Input
                                        type="file"
                                        accept=".xlsx"
                                        onChange={(e) => {
                                            setFileDownload(undefined);
                                            setFilesDownload([]);

                                            const file = e.currentTarget.files?.[0]; // ✅ File | undefined
                                            if (file) setFile(file);
                                        }}
                                        className="hidden"
                                        id="fileUpload"
                                    />
                                </label>
                            </>
                        ) : ''
                    }
                    {
                        data?.companyEnable ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold" htmlFor="dateDocument">Compañia / Empresa</label>
                                <Input type="text" value="Levi Strauss Colombia" disabled/>
                            </div>
                        ) : ''
                    }
                    {
                        data?.monthsEnable ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold">Mes</label>
                                <Select defaultValue={monthSelect.toString()} onValueChange={(e: string) => setMonthSelect(Number(e))}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona un mes"/>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            {
                                                months?.map((option: string, index: number) => (
                                                    <SelectItem key={"optionMonth-" + option} value={(index).toString()}>{option}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : ''
                    }
                    {
                        data?.centroCostosEnable ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold" htmlFor="dateDocument">Centro de Costo</label>
                                <Select defaultValue={centroCostosSelect} onValueChange={(e: string) => setCentroCostosSelect(e)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona una Opción"/>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            <SelectItem value="todos">TODOS</SelectItem>
                                            {
                                                data?.centroCostosOptions?.map((option) => (
                                                    <SelectItem key={"optionCentroCosto-" + option.codigo} value={option.codigo}>{option.codigo} - {option.descripcion}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : ''
                    }
                    {
                        data?.dateEnable ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold" htmlFor="dateDocument">Fecha</label>
                                <Input id="dateDocument" className="w-full" onChange={(e) => setDate(e.target.value)} placeholder="Fecha" type="date" value={date}/>
                            </div>
                        ) : ''
                    }
                    {
                        data?.bodegaEnable ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold" htmlFor="dateDocument">Bodega</label>
                                <Select defaultValue={bodegaSelect} onValueChange={(e) => setBodegaSelect(e)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona una Bodega"/>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            {
                                                data.bodegas?.map((b, i: number) => (
                                                    <SelectItem key={"bodega" + b.id} value={b.id}>{b.id} - {b.descripcion}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : ''
                    }
                    {
                        data?.documentTypeEnable ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold" htmlFor="dateDocument">Tipo Documento</label>
                                <Select defaultValue={documentTypeSelect} onValueChange={(e: string) => setDocumentTypeSelect(e)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona un Documento"/>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            <SelectItem value="nomina">Nomina</SelectItem>
                                            <SelectItem value="provisiones">Provisiones</SelectItem>
                                            <SelectItem value="seguridadSocial">Seguridad Social</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : ''
                    }
                    {
                        data?.cartaTypeEnable ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold" htmlFor="dateDocument">{data?.placeholderCartaTypeOptions}</label>
                                <Select defaultValue={cartaTypeSelect} onValueChange={(e: string) => setCartaTypeSelect(e)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona una Opción"/>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            {
                                                data?.cartaTypeOptions?.map((option) => (
                                                    <SelectItem key={"optionCartaType-" + option.value} value={option.value}>{option.label}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : ''
                    }
                    {
                        data?.quincenaEnable ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold" htmlFor="dateDocument">Quincena:</label>
                                <Select defaultValue={quincenaSelect} onValueChange={(e: string) => setQuincenaSelect(e)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona una quincena"/>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            {
                                                data?.quincenas?.map((q: QuincenasInterface, index: number) => (
                                                    <SelectItem key={"quincena- " + index} value={q.quincena}>{q.quincena}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : ''
                    }
                    {
                        data?.ordenCompraEnable ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold" htmlFor="ordenCompra">Orden de Compra</label>
                                <Input value={ordenCompraInput} onChange={() => setOrdenCompraInput} className="" id="ordenCompra" placeholder="Numero Orden Compra" type="text"/>
                            </div>
                        ) : ''
                    }
                    {
                        cartaTypeSelect == 'conDestinatario' ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold" htmlFor="dateDocument">Destinatario</label>
                                <Input value={destinatarioInput} onChange={({target}) => {
                                    setDestinatarioInput(target.value)
                                }} className="border p-1 border-black rounded-md w-full" id="dateDocument" placeholder="Nombre Destinatario"/>
                            </div>
                        ) : ''
                    }
                    {
                        data?.documentEnable ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold" htmlFor="dateDocument">Documento</label>
                                <Input value={documentInput} onChange={({target}) => {
                                    setDocumentInput(target.value)
                                }} className="border p-1 border-black rounded-md w-full" id="dateDocument" placeholder="Número Documento"/>
                            </div>
                        ) : ''
                    }
                    {
                        data?.remisionesEnable ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold" htmlFor="dateDocument">Numéro Remisión</label>
                                <Input value={numeroRemisionInput} type="number" onChange={({target}) => setNumeroRemisionInput(target.value)} className="border p-1 border-black rounded-md w-full" id="numeroRemision"
                                       placeholder="Ultimo número remisión"/>
                            </div>
                        ) : ''
                    }
                    {
                        data?.newDocumentEnable ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold" htmlFor="dateDocument">Nuevo Documento</label>
                                <Input value={newDocumentInput} onChange={() => setNewDocumentInput} className="border p-1 border-black rounded-md w-full" id="dateDocument" placeholder="Número Documento"/>
                            </div>
                        ) : ''
                    }

                    {
                        data?.valorDocumentoEnable ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold" htmlFor="dateDocument">Valor Documento</label>
                                <Input value={valorDocumentInput} onChange={() => setValorDocumentInput} type="text" disabled/>
                            </div>
                        ) : ''
                    }
                    {
                        data?.notesEnable ? (
                            <div className="flex flex-col justify-center items-center gap-y-1 h-1/4 w-full">
                                <label className="font-bold" htmlFor="dateDocument">Notas</label>
                                <textarea value={notesInput} onChange={() => setNotesInput} className="border p-1 border-black rounded-md w-full" id="dateDocument" placeholder="Notas"/>
                            </div>
                        ) : ''
                    }
                    {
                        data?.historialContratosEnable ? (
                            <div className="flex flex-col justify-center items-start gap-y-1 h-1/4 w-full">
                                <div className="flex items-center space-x-2">
                                    <Input className="size-4" id="historialContratosCheckbox" type="checkbox" checked={historialContratosEnable}
                                           onChange={() => {
                                               setHistorialContratosEnable(!historialContratosEnable)
                                           }}
                                    />
                                    <label className="font-bold" htmlFor="historialContratosCheckbox">Incluir Historial Contratos</label>
                                </div>
                            </div>
                        ) : ''
                    }
                    {
                        data?.funcionesEnable ? (
                            <div className="flex flex-col justify-center items-start gap-y-1 h-1/4 w-full">
                                <div className="flex items-center space-x-2">
                                    <Input className="size-4" id="funcionesCheckbox" type="checkbox" checked={funcionesEnable}
                                           onChange={() => {
                                               setFuncionesEnable(!funcionesEnable)
                                               if (!funcionesEnable) {
                                                   setFuncionesInput('')
                                               }
                                           }}
                                    />
                                    <label className="font-bold" htmlFor="funcionesCheckbox">Incluir Funciones</label>
                                </div>
                                {
                                    funcionesEnable ? (
                                        <>
                                                <textarea defaultValue={funcionesInput} onChange={({target}) => {
                                                    setFuncionesInput(target.value)
                                                }} className="border p-1 border-black rounded-md w-full" id="funcionesTextBox" placeholder="Especifique las funciones"/>
                                        </>
                                    ) : ''
                                }
                            </div>
                        ) : ''
                    }
                    {
                        data?.typeForm === typeFormEnum.IngresoBonificacion ? (
                            <div className="flex gap-x-2">
                                <button disabled={!file} onClick={listarDatos}
                                        className=" rounded border-2  disabled:text-gray-500 hover:border-red-700 disabled:border-gray-500  flex items-center justify-center h-1/4 cursor-pointer">
                                    <span className="py-2 px-4 ">Listar Datos</span>
                                </button>
                            </div>
                        ) : ''
                    }
                    {
                        data?.typeForm === typeFormEnum.LiquidacionBonificacion ? (
                            <div className="flex gap-x-2">
                                {/* CAMBIAR VALORES HARD CODED */}
                                <button onClick={() => listarBonificaciones('PRUEBA', 'Felipe Sarmiento')}
                                        className=" rounded border-2  disabled:text-gray-500 hover:border-red-700 disabled:border-gray-500  flex items-center justify-center h-1/4 cursor-pointer">
                                    <span className="py-2 px-4 ">Listar Datos</span>
                                </button>
                            </div>
                        ) : ''
                    }
                </div>
                {
                    bonificacionesEmpleadosDataExcel ? (
                        <div className="flex flex-col items-center border-2 py-2 px-2 border-gray-500 rounded-2xl gap-y-2 max-w-[550px] h-80">
                            <Table className="border font-normal w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-10">Cedula</TableHead>
                                        <TableHead className="w-40 font-medium">Nombres</TableHead>
                                        <TableHead className="w-40 font-medium">Pagos</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="w-full">
                                    {
                                        bonificacionesEmpleadosDataExcel.map((empleado) => {
                                            return (
                                                <TableRow key={"empleado-" + empleado?.cedula} className={ !empleado?.existeEmpleado ? 'bg-red-200' : '' }>
                                                    <TableCell className="font-medium w-10 border">
                                                        {empleado?.cedula}
                                                    </TableCell>
                                                    <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border">
                                                        {empleado?.nombreEmpleado}
                                                        {
                                                            !empleado?.existeEmpleado ? (
                                                                <>
                                                                    <br/>
                                                                    <span className="text-xs font-bold">
                                                                        El empleado no existe
                                                                    </span>
                                                                </>
                                                            ) : ''
                                                        }
                                                    </TableCell>
                                                    <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                        { String(new Intl.NumberFormat("es-CO", {
                                                            style: "currency",
                                                            currency: "COP",
                                                            minimumFractionDigits: 2, // puedes ajustar si quieres mostrar decimales
                                                        }).format(Number(empleado?.pagoBonificacion))) }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                    <TableRow>
                                        <TableCell colSpan={2} className="font-medium w-10 border">
                                            Total Pago a bonificar<br/><span className="text-xs text-red-400">¡Solo empleados existentes!</span>
                                        </TableCell>
                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border font-medium">
                                            { String(new Intl.NumberFormat("es-CO", {
                                                style: "currency",
                                                currency: "COP",
                                                minimumFractionDigits: 4, // puedes ajustar si quieres mostrar decimales
                                            }).format(Number(
                                                bonificacionesEmpleadosDataExcel.reduce((acum, pago) => pago?.existeEmpleado ? acum + pago?.pagoBonificacion : acum, 0)
                                            ))) }
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className="flex text-center text-xs text-red-400">
                                Los empleados con marca no se les registrará las bonificaciones ya que no existen en la base de datos.
                            </div>
                        </div>
                    ) : ''
                }
                {
                    bonificacionesEmpleados ? (
                        <div className="flex flex-col items-center border-2 py-2 px-2 border-gray-500 rounded-2xl gap-y-2 max-w-[550px] h-80">
                            <Table className="border font-normal w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-10">Cedula</TableHead>
                                        <TableHead className="w-40 font-medium">Nombres</TableHead>
                                        <TableHead className="w-40 font-medium">Pagos</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="w-full">
                                    {
                                        bonificacionesEmpleados.map((empleado) => {
                                            return (
                                                <TableRow key={"empleado-" + empleado?.empleado}>
                                                    <TableCell className="font-medium w-10 border">
                                                        {empleado?.empleado}
                                                    </TableCell>
                                                    <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border">
                                                        {dataEmployees ?
                                                            dataEmployees.find(
                                                                (employee) => String(employee.cedula) === String(empleado.empleado)
                                                            )?.nombre : ''
                                                        }
                                                    </TableCell>
                                                    <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                        { String(new Intl.NumberFormat("es-CO", {
                                                            style: "currency",
                                                            currency: "COP",
                                                            minimumFractionDigits: 2,
                                                        }).format(Number(empleado?.valor))) }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                    <TableRow>
                                        <TableCell colSpan={2} className="font-medium w-10 border">
                                            Total Pago a bonificar
                                        </TableCell>
                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border font-medium">
                                            { String(new Intl.NumberFormat("es-CO", {
                                                style: "currency",
                                                currency: "COP",
                                                minimumFractionDigits: 4, // puedes ajustar si quieres mostrar decimales
                                            }).format(Number(
                                                bonificacionesEmpleados.reduce((acum, pago) =>  acum + pago?.valor, 0)
                                            ))) }
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    ) : ''
                }
                <button onClick={handleFile} className="cursor-pointer relative flex flex-col justify-center items-center">
                    {
                        data?.typeForm === typeFormEnum.IngresoBonificacion || data?.typeForm === typeFormEnum.LiquidacionBonificacion ? (
                            <CirclePlusIcon className="w-20 h-10"/>
                        ) : (
                            <ArrowBigRight className="w-20 h-10"/>
                        )
                    }
                    <span className="font-bold">{data?.buttonLabel}</span>
                </button>
                {
                    data?.typeForm === typeFormEnum.VencimientosContratos ? (
                        <div className="flex flex-col items-center justify-start overflow-x-hidden overflow-y-auto border-2 py-5 px-2 border-gray-500 rounded-2xl h-80">
                            <div className="border-2 text-nowrap h-12 min-h-12 text-center rounded-2xl  border-gray-500 flex items-center">
                                <div className="border-r-2 w-40 border-gray-500 px-10">
                                    <span>Nombres</span>
                                </div>
                                <div className="border-r-2 w-32 border-gray-500 px-5">
                                    <span>Cedula</span>
                                </div>
                                <div className="border-r-2  w-32 border-gray-500 px-5">
                                    <span>Centro Costos</span>
                                </div>
                                <div className="border-r-2  w-32 border-gray-500 px-5">
                                    <span>Fecha Ingreso</span>
                                </div>
                                <div className="border-r-2  w-36 border-gray-500 px-5">
                                    <span>Fecha Vencimiento</span>
                                </div>
                                <div className="w-32 text-wrap">
                                    <span>Duracion Contrato</span>
                                </div>
                                <div className="w-32 text-wrap">

                                </div>
                            </div>
                            {
                                contratosProximosVencer?.map((contrato, index) => {
                                    const today = new Date();
                                    const month = ((today.getMonth() + 2) % 12 == 0) ? 12 : today.getMonth() + 2;
                                    const fechaVencimiento = (new Date(contrato.prorrogaUno).getMonth() == month) ? contrato.prorrogaUno : (new Date(contrato.prorrogaDos).getMonth() == month) ? contrato.prorrogaDos : contrato.prorrogaTres

                                    return (
                                        <div key={"contratoVencer-" + index}>
                                            <div className="flex items-stretch text-center min-h-[50px]">
                                                <div className="border-r-2 flex items-center justify-center grow w-40 min-w-40 border-gray-500 px-5">
                                                    <span>{contrato.nombre}</span>
                                                </div>
                                                <div className="border-r-2 flex items-center justify-center grow w-32 min-w-32 border-gray-500 px-5">
                                                    <span>{contrato.cedula}</span>
                                                </div>
                                                <div className="border-r-2 flex items-center justify-center grow w-32 min-w-32 border-gray-500 px-5">
                                                    <span>{contrato.codigoCentroCostos + " - " + contrato.nombreCentroCostos}</span>
                                                </div>
                                                <div className="border-r-2 flex items-center justify-center grow w-32 min-w-32 border-gray-500 px-5">
                                                    <span>{contrato.fechaContrato}</span>
                                                </div>
                                                <div className="border-r-2 text-red-500 flex items-center justify-center grow w-36 min-w-36 border-gray-500 px-5">
                                                    <span>{fechaVencimiento}</span>
                                                </div>
                                                <div className="border-r-2 flex items-center justify-center grow w-32 min-w-32 border-gray-500 px-5">
                                                    <span>{contrato.duracionContrato}</span>
                                                </div>
                                                <div className="flex items-center justify-center grow w-32 min-w-32 px-5">
                                                    <button
                                                        onClick={async (e) => {
                                                            const file = await generateCertificado('vencimiento', contrato)
                                                            if (file) {
                                                                const blob = new Blob([file as BlobPart], {type: "application/pdf"});
                                                                const url = URL.createObjectURL(blob);
                                                                setFileDownload({
                                                                    fileName: data.information.replace(" ", "") + ".pdf",
                                                                    fileURL: url,
                                                                    blob,
                                                                    fileExtension: ".pdf",
                                                                    fileType: "application/pdf"
                                                                })
                                                                if (fileDownload) {
                                                                    const nombre = contrato.nombre
                                                                    const subject = "Vencimiento Contrato Laboral";
                                                                    const htmlText = `<p><b>Hola ${nombre}</b>,\nA Continuación, te adjuntamos el certificado de vencimiento de contrato laboral. \nEste correo es automatico, por favor no responder</p>`
                                                                    sendEmail(nombre, "f.sarmiento.personal@gmail.com", fileDownload, subject, htmlText).then(() => {
                                                                        alert("Certificado Vencimiento enviado correctamente a " + emailTo)
                                                                    })
                                                                }
                                                            }

                                                        }}
                                                        className="cursor-pointer border-2 px-4 py-2 rounded-xl" title={"Enviar certificado de vencimiento del contrato " + contrato.email}>
                                                        Enviar
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="w-full border-b-2 border-gray-500"/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : data?.typeForm !== typeFormEnum.IngresoBonificacion && data?.typeForm !== typeFormEnum.LiquidacionBonificacion ?(
                        <>
                            {
                                filesDownload.length > 0 ? (
                                        <div className="relative space-y-2">
                                            <div className="flex flex-col items-center p-2 border-2 overflow-y-auto border-gray-500 rounded-2xl w-[500px] h-72 gap-y-2">
                                                {
                                                    filesDownload.map((file, index: number) => (
                                                        <div key={"fileToDownload-" + index} className="flex items-center font-bold justify-between p-2 border-2 border-gray-500 w-full h-10 rounded-lg">
                                                            <span className="text-nowrap text-xs">{file.nombreArchivo}</span>
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    className="cursor-pointer"
                                                                    onClick={() => {
                                                                        const url = URL.createObjectURL(file.archivo);
                                                                        const html = `
                                                                      <html>
                                                                        <head><title>${file.nombreArchivo}</title></head>
                                                                        <body style="margin:0">
                                                                          <embed src="${url}" type="application/pdf" width="100%" height="100%"/>
                                                                        </body>
                                                                      </html>
                                                                    `;
                                                                        const newWindow = window.open();
                                                                        newWindow?.document.write(html);
                                                                        newWindow?.document.close();
                                                                    }}
                                                                >
                                                                    <EyeIcon/>
                                                                </button>
                                                                <a href={URL.createObjectURL(file.archivo)} download={file.nombreArchivo} className="cursor-pointer">
                                                                    <DownloadIcon/>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                            <div onClick={() => {
                                                filesDownload.map((file) => {
                                                    const linkToDownload = document.createElement('a');
                                                    const url = URL.createObjectURL(file.archivo)
                                                    linkToDownload.href = url;
                                                    linkToDownload.download = file.nombreArchivo;
                                                    document.body.appendChild(linkToDownload);
                                                    linkToDownload.click();
                                                    document.body.removeChild(linkToDownload)
                                                })
                                            }} className="cursor-pointer flex items-center justify-center font-bold text-red-500 w-[500px] h-8 border-2 border-red-500 rounded-lg">
                                                Descargar todos los archivos
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <>
                                            <div className="flex flex-col items-center justify-center border-2 py-5 border-gray-500 rounded-2xl gap-y-2 min-w-72 w-72 h-80">
                                                {
                                                    !isLoading ? (
                                                        fileDownload?.fileName !== undefined ? (
                                                            <>
                                                                <div className="flex flex-col items-center text-center justify-end gap-y-2 px-4">
                                                                    <Image className="" src="/images/archivo-txt.png" width={60} height={60} alt=""/>
                                                                    <span className="font-bold">{fileDownload?.fileName ?? 'Nombre_Archivo.txt'}</span>
                                                                </div>
                                                                <div className="flex flex-col justify-center px-4 text-center items-center h-10">
                                                                    <p>Archivo generado correctamente</p>
                                                                </div>
                                                                <label className="flex items-center justify-center h-10 cursor-pointer">
                                                                    <a href={fileDownload?.fileURL} download={fileDownload?.fileName}
                                                                       className="border-2 border-gray-600 hover:border-gray-700 text-gray-500 py-2 px-4 rounded">Descargar</a>
                                                                </label>
                                                                {
                                                                    (data?.typeForm == typeFormEnum.CertificadoLaboral || data?.typeForm == typeFormEnum.CertificadoRetirado) ? (
                                                                        <div className="flex flex-col justify-center px-4 items-center gap-y-1 w-full">
                                                                            <label className="font-bold" htmlFor="dateDocument">Enviar certificado a:</label>
                                                                            <form className="space-y-2" onSubmit={(e) => {
                                                                                e.preventDefault()
                                                                                if (emailTo && dataEmployee && filesDownload) {
                                                                                    const {primerNombre, segundoNombre, primerApellido, segundoApellido} = dataEmployee;
                                                                                    const nombre = [primerNombre, segundoNombre, primerApellido, segundoApellido].join(" ")
                                                                                    const subject = "Certificado Laboral";
                                                                                    const htmlText = `<p><b>Hola ${nombre}</b>,\nA Continuación, te adjuntamos el certificado laboral solicitado. \nEste correo es automatico, por favor no responder</p>`
                                                                                    sendEmail(nombre, emailTo, fileDownload, subject, htmlText).then(() => {
                                                                                        alert("Certificado Laboral enviado correctamente a " + emailTo)
                                                                                    })
                                                                                } else {
                                                                                    alert("Falta algún parámetro")
                                                                                }
                                                                            }}>
                                                                                <Input
                                                                                    id="email"
                                                                                    name="email"
                                                                                    required={true}
                                                                                    onChange={({target}) => {
                                                                                        setEmailTo(target.value)
                                                                                    }}
                                                                                    type="email" defaultValue={emailTo}/>
                                                                                <label className="flex items-center justify-center h-10 cursor-pointer">
                                                                                    <button type="submit" className="cursor-pointer border-2 border-gray-600 hover:border-gray-700 text-gray-500 py-2 px-4 rounded">Enviar
                                                                                    </button>
                                                                                </label>
                                                                            </form>
                                                                        </div>
                                                                    ) : ''
                                                                }
                                                            </>
                                                        ) : (
                                                            <>
                                                                <File className="w-20 h-20"/>
                                                                <p className="py-2 font-bold">*Archivo a Generar*</p>
                                                            </>
                                                        )
                                                    ) : (
                                                        <>
                                                            <LoaderIcon className="w-20 h-20"/>
                                                            <p className="py-2 font-bold">Cargando...</p>
                                                        </>
                                                    )

                                                }

                                            </div>
                                        </>
                                    )}
                        </>
                    ) : ''
                }

            </div>
        </>
    );

    async function listarDatos() {
        const listaEmpleados = await getAllEmpleadosActivos();
        if (listaEmpleados && file) {
            const listaEmpleadosExcel = await generateData(file);
            if (listaEmpleadosExcel) {
                const bonificacionesExcel = listaEmpleadosExcel
                    .filter((empleadoExcel) => !isNaN(Number(empleadoExcel.cedula)))
                    .map((empleadoExcel) => {
                        const existe = listaEmpleados?.some(
                            (empleado) => empleado.cedula == empleadoExcel.cedula
                        );
                        return {
                            ...empleadoExcel,
                            existeEmpleado: existe,
                        };
                    });
                bonificacionesExcel.sort((x, y) => {
                    return Number(x.existeEmpleado) - Number(y.existeEmpleado);
                });
                setBonificacionesEmpleadosDataExcel(bonificacionesExcel)
            }
        }
    }

    async function listarBonificaciones(periodo: string, responsable: string) {
        const result = await getAllBonificacionesByPeriodoAndResponsable(periodo, responsable);
        const resultEmployees = await getAllEmpleadosActivos();
        setDataEmployees(resultEmployees);
        setBonificacionesEmpleados(result)
    }

    async function generateData(data: File) {
        try {
            const dataFile = await data.arrayBuffer();
            const workbook = XLSX.read(dataFile, {type: "array"});
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            interface RawEmployeeData {
                "CEDULA": string;
                "NOMBRE_EMPLEADO": string;
                "PAGO": string | number;
            }
            const jsonData = XLSX.utils.sheet_to_json<RawEmployeeData>(worksheet, {
                defval: "",
                range: 6
            });

            const empleadosExcel: BonificacionesDataExcelInterface[] = [
                ...new Set(jsonData.map((r) => {
                    console.log('R:', r)
                    return {
                        cedula: r["CEDULA"],
                        nombreEmpleado: r["NOMBRE_EMPLEADO"],
                        pagoBonificacion: Number(r["PAGO"]),
                    } as BonificacionesDataExcelInterface
                }))
            ];
            console.log('Empleados Excel', empleadosExcel)
            return empleadosExcel;
        } catch (e) {
            console.log(e)
        }
    }
}
