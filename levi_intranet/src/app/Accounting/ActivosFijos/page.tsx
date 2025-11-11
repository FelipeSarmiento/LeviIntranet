'use client'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {CircleChevronLeftIcon, CircleChevronRightIcon, PrinterIcon, TrashIcon} from 'lucide-react';
import {useEffect, useState} from "react";
import * as XLSX from "xlsx";
import {generarPDFExito} from "@/lib/hooks/etiquetas/etiquetasExitoHooks";
import {ActivosFijosInterface, BodegasInterface, CentroCostosSiesaInterface, ItemsEtiquetasInterface, ItemsToPrintInterface, TipoInventariosInterface, UbicacionesInterface} from "@/lib/interfaces/_interfaces";
import {getActivosFijos, getAllBodegas, getAllCentroCostos, getAllUbicaciones, getTipoInventarios} from "@/lib/hooks/api/siesaBackEndAPI";
import {generarPDFUbicaciones} from "@/lib/hooks/etiquetas/etiquetasUbicacionesHooks";
import {generarPDFActivosFijos} from "@/lib/hooks/etiquetas/etiquetasActivosFijosHooks";

export default function Home() {
    const [listaCentroCostos, setListaCentroCostos] = useState<CentroCostosSiesaInterface[]>([])
    const [listaTipoInventarios, setListaTipoInventarios] = useState<TipoInventariosInterface[]>([])

    useEffect(() => {
        const getCentroCostos = async () => {
            setListaCentroCostos(await getAllCentroCostos())
        }
        getCentroCostos()
    }, []);

    const [centroCosto, setCentroCosto] = useState<string>('')
    const [tipoInventario, setTipoInventario] = useState<string>('')
    const [activosFijos, setActivosFijos] = useState<ActivosFijosInterface[]>([])
    const [activosFijosToPrint, setActivosFijosToPrint] = useState<ActivosFijosInterface[]>([])
    const [actualPage, setActualPage] = useState(1)
    const [actualPageToPrint, setActualPageToPrint] = useState(1)
    const [searchInput, setSearchInput] = useState<string>('')
    const [searchInputToPrint, setSearchInputToPrint] = useState<string>('')
    const [blankButtonsQuantity, setBlankButtonsQuantity] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number[]>([])
    const [totalPagesToPrint, setTotalPagesToPrint] = useState<number[]>([])
    const [blankButtonsToPrintQuantity, setBlankButtonsToPrintQuantity] = useState<number>(0)
    const [selectAll, setSelectAll] = useState<boolean>(false)

    useEffect(() => {
        setTipoInventario('')
        setActivosFijos([])
    }, [centroCosto]);

    useEffect(() => {
        const buttonsBlank = generateBlankButtonsPage(
            parseInt(String((activosFijosToPrint?.length % 50 > 0 ? (activosFijosToPrint?.length / 50 + 1) : (activosFijosToPrint?.length / 50)))
            ))
        setTotalPagesToPrint(buttonsBlank)
        if (buttonsBlank.length === 1) {
            setActualPageToPrint(1)
        }
        // alert("Activos Fijos Length: " + activosFijosToPrint?.length + " | totalPages: " + totalPagesToPrint)
        if (activosFijosToPrint === activosFijos) {
            setSelectAll(true)
        } else {
            setSelectAll(false)
        }
    }, [activosFijosToPrint]);

    const handleSubmit = () => {
        if (!centroCosto) {
            alert('Debe seleccionar un centro de costos')
            return;
        }
        if (!tipoInventario) {
            alert('Debe seleccionar un tipo de inventario')
            return;
        }
        setActualPage(1)
        setTotalPages(
            generateBlankButtonsPage(
                parseInt(String((activosFijos?.length % 50 > 0 ? (activosFijos?.length / 50 + 1) : (activosFijos?.length / 50)))
            ))
        )
        getActivosFijos(centroCosto, tipoInventario, '01').then((res) => {
            const tipoInventariosSeleccionado = listaTipoInventarios?.find(
                (_tipoInventario) => _tipoInventario.idTipoInventario === tipoInventario
            );
            const centroCostosSeleccionado = listaCentroCostos?.find(
                (_centroCosto) => _centroCosto.idCentroCosto === centroCosto
            );
            setActivosFijos(res.map((_af) => {
                return {
                    ..._af,
                    centroCosto: centroCostosSeleccionado,
                    tipoInventario: tipoInventariosSeleccionado
                }
            }))
            const total = searchInput ? (
                res.filter((activoFijo) => {
                    const busqueda = searchInput.trim().toLowerCase()
                    const descripcion = activoFijo.descripcion.trim().toLowerCase()
                    const id = activoFijo.idActivoFijo.trim().toLowerCase()
                    if (!busqueda) {
                        return activoFijo
                    }
                    if (id.includes(busqueda) || descripcion.includes(busqueda)) {
                        return activoFijo
                    }
                }).length
            ) : parseInt(String(res.length / 50 + 1))
            setTotalPages(generateBlankButtonsPage(total));
        })

    }

    const generateBlankButtonsPage = (maxPage: number) => {
        const buttonElements: number[] = [];
        for (let i = 1; i <= maxPage; i++) {
            buttonElements.push(i);
        }

        return buttonElements;
    }


    return (
        <div className="flex flex-col gap-y-5 items-center py-10 w-full flex-1 px-40">
            <h2 className="font-bold text-3xl text-left w-7xl">Impresión Activos Fijos</h2>
            <div className="flex flex-col items-center w-full flex-1">
                <div className="flex items-center justify-center h-24 gap-x-8 w-full border-b-2 ">
                    <div className="flex flex-col">
                        <label htmlFor="">Compañia</label>
                        <Input className="w-52" type="text" value="Levi Strauss Colombia (01)" disabled={true}/>
                    </div>
                    {/*
                    CENTRO COSTOS
                    CENTRO COSTOS
                    CENTRO COSTOS
                    CENTRO COSTOS
                    */}
                    <div>
                        <label htmlFor="">Centro de Costos</label>
                        <Select onValueChange={(v) => {
                            setCentroCosto(v)
                            if (v) {
                                getTipoInventarios(v, '01').then((res) => {
                                    setListaTipoInventarios(res)
                                })
                            }
                        }} defaultValue={centroCosto} disabled={listaCentroCostos?.length == 0}>
                            <SelectTrigger className="w-96 text-nowrap">
                                <SelectValue placeholder={
                                    (listaCentroCostos?.length == 0) ? (
                                        'Sin centros de costos'
                                    ) : 'Selecciona centro de costos'
                                }/>
                            </SelectTrigger>
                            <SelectContent className="bg-white w-96">
                                <SelectGroup>
                                    {
                                        listaCentroCostos?.map((centroCosto) => (
                                            <SelectItem className="px-3 flex border-b-2 text-nowrap rounded-none border-gray-300" key={"bodega-" + centroCosto.idCentroCosto} value={centroCosto.idCentroCosto}>
                                                <span>
                                                    {centroCosto.centroCosto} - | {centroCosto.descripcion}
                                                </span>
                                            </SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/*
                    TIPO INVENTARIOS
                    TIPO INVENTARIOS
                    TIPO INVENTARIOS
                    TIPO INVENTARIOS
                    */}
                    <div>
                        <label htmlFor="">Tipo Inventario</label>
                        <Select onValueChange={(v) => setTipoInventario(v)} value={tipoInventario} disabled={(listaTipoInventarios?.length === 0)}>
                            <SelectTrigger className="w-96 text-nowrap">
                                <SelectValue placeholder={
                                    (listaTipoInventarios?.length === 0) ? (
                                        'Sin tipos de inventario'
                                    ) : 'Selecciona un tipo de inventario'
                                }/>
                            </SelectTrigger>
                            <SelectContent className="bg-white w-96">
                                <SelectGroup>
                                    {
                                        listaTipoInventarios?.map((tipoInventario) => (
                                            <SelectItem className="px-3 flex border-b-2 text-nowrap rounded-none border-gray-300" key={"bodega-" + tipoInventario.idTipoInventario}
                                                        value={tipoInventario.idTipoInventario.toString()}>
                                                <span>
                                                    {tipoInventario.idTipoInventario} - | {tipoInventario.descripcion}
                                                </span>
                                            </SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/*
                    GENERAR DATOS
                    */}
                    <div>
                        <Button onClick={handleSubmit} className="cursor-pointer border-2 px-8">
                            Generar Datos
                        </Button>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center gap-y-5 pt-2 flex-1">
                    <h3 className="font-bold w-full text-center my-2">Activos Fijos</h3>
                    <div className="w-full flex justify-center gap-x-5">
                        {/*
                        ACTIVOS FIJOS
                        ACTIVOS FIJOS
                        ACTIVOS FIJOS
                        ACTIVOS FIJOS
                        */}
                        <div className="flex-1 max-w-7xl">
                            {
                                activosFijos.length > 0 ? (
                                    <div className="" key={"activosFijos"}>
                                        {/*
                                        BUSQUEDA Y PAGINACION ACTIVOS FIJOS
                                        BUSQUEDA Y PAGINACION ACTIVOS FIJOS
                                        BUSQUEDA Y PAGINACION ACTIVOS FIJOS
                                        BUSQUEDA Y PAGINACION ACTIVOS FIJOS
                                        */}
                                        <div className="h-12 mb-1 w-full flex items-center justify-end">
                                            <div className="h-8 flex flex-1 gap-x-5 grow">
                                                <input onChange={({target}) => {
                                                    const value = target.value;
                                                    const total = value ? (
                                                        parseInt(String(activosFijos.filter((activoFijo) => {
                                                            const busqueda = searchInput.trim().toLowerCase()
                                                            const descripcion = activoFijo.descripcion.trim().toLowerCase()
                                                            const id = activoFijo.idActivoFijo.trim().toLowerCase()
                                                            const marca = activoFijo.marca.trim().toLowerCase()
                                                            const modelo = activoFijo.modelo.trim().toLowerCase()
                                                            const serie = activoFijo.serie.trim().toLowerCase()
                                                            const motor = activoFijo.motor.trim().toLowerCase()
                                                            if (!busqueda) {
                                                                return activoFijo
                                                            }
                                                            if (id.includes(busqueda) || descripcion.includes(busqueda) || marca.includes(busqueda) || modelo.includes(busqueda) || serie.includes(busqueda) || motor.includes(busqueda)) {
                                                                return activoFijo
                                                            }
                                                        }).length / 50 + 1))
                                                    ) : parseInt(String(activosFijos.length / 50 + 1))
                                                    setTotalPages(generateBlankButtonsPage(total));
                                                    setActualPage(1)
                                                    setSearchInput(target.value)
                                                }} type="text" className="w-full px-5 rounded-md h-full border bg-transparent"
                                                       placeholder="Buscar activo fijo"/>
                                            </div>
                                            <button onClick={() => {
                                                if (actualPage === 1) {
                                                    setActualPage(totalPages.length)
                                                } else {
                                                    setActualPage(actualPage - 1)
                                                }
                                            }} className="cursor-pointer rounded-md text-gray-400 px-2 h-7">
                                                <CircleChevronLeftIcon/>
                                            </button>
                                            <div key={"botonesPaginacion" + String(Math.random())} className="flex gap-x-2 w-96 justify-center">
                                                {
                                                    blankButtonsQuantity > 0 ? (
                                                        <div className="flex gap-x-2">
                                                            {
                                                                generateBlankButtonsPage(blankButtonsQuantity).map((a, index) => (
                                                                    <button key={"itemBlank" + String(index + Math.random())} className="border order-last rounded-md px-2 h-7 w-7 border-gray-400 text-gray-400">

                                                                    </button>
                                                                ))
                                                            }
                                                        </div>
                                                    ) : ''
                                                }
                                                {
                                                    totalPages.map((pageButton: number, _index: number) => {
                                                        const preIndexButton = actualPage - 1;
                                                        const postIndexButton = actualPage + 1;
                                                        if (totalPages.length > 7) {
                                                            if (actualPage <= 3 && pageButton === actualPage) {
                                                                const cantidad = 4 - actualPage
                                                                if (cantidad !== blankButtonsQuantity) {
                                                                    setBlankButtonsQuantity(cantidad)
                                                                }
                                                            }
                                                            if (actualPage > 3) {
                                                                const cantidad = 0
                                                                if (cantidad !== blankButtonsQuantity) {
                                                                    setBlankButtonsQuantity(cantidad)
                                                                }
                                                            }
                                                            if (actualPage >= (totalPages.length - 2) && pageButton === actualPage) {
                                                                const cantidad = (actualPage + 3) - totalPages.length
                                                                // setBlankButtonsQuantity(cantidad)
                                                            }
                                                            if ((pageButton <= preIndexButton && pageButton <= 1) || (preIndexButton <= pageButton && pageButton <= postIndexButton) || (pageButton === totalPages.length)) {
                                                                return (
                                                                    <button onClick={() => {
                                                                        setActualPage(pageButton)
                                                                    }} key={"item" + pageButton + String(_index + Math.random())}
                                                                            className={`cursor-pointer border rounded-md px-2 h-7 ${pageButton === actualPage ? 'border-green-500 text-green-500' : 'border-gray-400 text-gray-400'}`}>
                                                                        {pageButton}
                                                                    </button>
                                                                )
                                                            }
                                                            if ((pageButton === preIndexButton - 1) || (pageButton === postIndexButton + 1)) {
                                                                return (
                                                                    <button key={"item" + pageButton + String(_index + Math.random())} className="border rounded-md px-2 h-7 border-gray-400 text-gray-400">
                                                                        ...
                                                                    </button>
                                                                )
                                                            }
                                                        } else {
                                                            return (
                                                                <button onClick={() => {
                                                                    setActualPage(pageButton)
                                                                }} key={"item" + pageButton + String(_index + Math.random())}
                                                                        className={`cursor-pointer border rounded-md px-2 h-7 ${pageButton === actualPage ? 'border-green-500 text-green-500' : 'border-gray-400 text-gray-400'}`}>
                                                                    {pageButton}
                                                                </button>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                            <button onClick={() => {
                                                if (actualPage === totalPages.length) {
                                                    setActualPage(1)
                                                } else {
                                                    setActualPage(actualPage + 1)
                                                }
                                            }} className="cursor-pointer rounded-md text-gray-400 px-2 h-7">
                                                <CircleChevronRightIcon/>
                                            </button>
                                        </div>
                                        {/*
                                        TABLA ACTIVOS FIJOS
                                        TABLA ACTIVOS FIJOS
                                        TABLA ACTIVOS FIJOS
                                        TABLA ACTIVOS FIJOS
                                        */}
                                        <div className="w-full space-y-5  h-[50vh] max-h-[50vh]">
                                            <Table className="border w-full">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableCell colSpan={8} className="text-left">
                                                            Total Activos Fijos:
                                                            <span className="font-bold  mx-1">
                                                                 {
                                                                     activosFijos.filter((activoFijo) => {
                                                                         const busqueda = searchInput.trim().toLowerCase()
                                                                         const descripcion = activoFijo.descripcion.trim().toLowerCase()
                                                                         const id = activoFijo.idActivoFijo.trim().toLowerCase()
                                                                         if (!busqueda) {
                                                                             return activoFijo
                                                                         }
                                                                         if (id.includes(busqueda) || descripcion.includes(busqueda)) {
                                                                             return activoFijo
                                                                         }
                                                                     }).length
                                                                 }
                                                            </span>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectAll}
                                                                onChange={({target}) => {
                                                                    const value = target.checked;
                                                                    if (value) {
                                                                        setActivosFijosToPrint(activosFijos);
                                                                    } else {
                                                                        setActivosFijosToPrint([]);
                                                                    }
                                                                }}
                                                            />
                                                        </TableHead>
                                                        <TableHead>Item</TableHead>
                                                        <TableHead>Descripción</TableHead>
                                                        <TableHead>Marca</TableHead>
                                                        <TableHead>Modelo</TableHead>
                                                        <TableHead>Serie</TableHead>
                                                        <TableHead>Motor</TableHead>
                                                        <TableHead>Centro Costos</TableHead>
                                                        <TableHead>Tipo Inventario</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody className="w-full">
                                                    {
                                                        activosFijos?.filter((activoFijo) => {
                                                            const busqueda = searchInput.trim().toLowerCase()
                                                            const descripcion = activoFijo.descripcion.trim().toLowerCase()
                                                            const id = activoFijo.idActivoFijo.trim().toLowerCase()
                                                            const marca = activoFijo.marca.trim().toLowerCase()
                                                            const modelo = activoFijo.modelo.trim().toLowerCase()
                                                            const serie = activoFijo.serie.trim().toLowerCase()
                                                            const motor = activoFijo.motor.trim().toLowerCase()
                                                            if (!busqueda) {
                                                                return activoFijo
                                                            }
                                                            if (id.includes(busqueda) || descripcion.includes(busqueda) || marca.includes(busqueda) || modelo.includes(busqueda) || serie.includes(busqueda) || motor.includes(busqueda)) {
                                                                return activoFijo
                                                            }
                                                        }).map((activoFijo, index) => {
                                                            const initialIndexPage = 50 * (actualPage - 1);
                                                            const finalIndexPage = initialIndexPage + 50;
                                                            if (index >= initialIndexPage && index < finalIndexPage)
                                                                return (
                                                                    <TableRow key={"activoFijo-" + activoFijo.idActivoFijo}>
                                                                        <TableCell className="font-medium w-10 border">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={activosFijosToPrint?.some(ubi => ubi.idActivoFijo.trim() === activoFijo.idActivoFijo.trim()) ?? false}
                                                                                onChange={({target}) => {
                                                                                    const value = target.checked;
                                                                                    setActivosFijosToPrint(prev => {
                                                                                        const current = prev ?? [];
                                                                                        if (value) {
                                                                                            if (current.some(_activoFijo => _activoFijo.idActivoFijo.trim() === activoFijo.idActivoFijo.trim())) {
                                                                                                return current;
                                                                                            }

                                                                                            return [
                                                                                                ...current,
                                                                                                activoFijo
                                                                                            ];
                                                                                        } else {
                                                                                            return current.filter(_activoFijo => _activoFijo.idActivoFijo.trim() !== activoFijo.idActivoFijo.trim());
                                                                                        }
                                                                                    });
                                                                                }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border font-medium">
                                                                            {activoFijo.idActivoFijo}
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                                            {activoFijo.descripcion.trim()}
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                                            {activoFijo.marca.trim()}
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                                            {activoFijo.modelo.trim()}
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                                            {activoFijo.serie.trim()}
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                                            {activoFijo.motor.trim()}
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                                            {activoFijo.centroCosto?.centroCosto}
                                                                            <span className="font-extrabold mx-2">|</span>
                                                                            {activoFijo.centroCosto?.descripcion}
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                                            {activoFijo.tipoInventario?.idTipoInventario}
                                                                            <span className="font-extrabold mx-2">|</span>
                                                                            {activoFijo.tipoInventario?.descripcion}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                        })}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                ) : 'Sin Activos Fijos'
                            }
                        </div>
                    </div>
                    {/*
                    ACTIVOS FIJOS A IMPRIMIR
                    ACTIVOS FIJOS A IMPRIMIR
                    ACTIVOS FIJOS A IMPRIMIR
                    ACTIVOS FIJOS A IMPRIMIR
                    */}
                    {
                        activosFijosToPrint && activosFijosToPrint.length > 0 ? (
                            <div className="w-full flex flex-col items-center gap-y-5 pt-2 flex-1">
                                <h3 className="font-bold w-full text-center my-2">Imprimir</h3>
                                <div className="w-full flex justify-center gap-x-5">
                                    <div className="flex-1 max-w-7xl">
                                        {/*
                                            BUSQUEDA Y PAGINACION ACTIVOS FIJOS A IMPRIMIR
                                            BUSQUEDA Y PAGINACION ACTIVOS FIJOS A IMPRIMIR
                                            BUSQUEDA Y PAGINACION ACTIVOS FIJOS A IMPRIMIR
                                            BUSQUEDA Y PAGINACION ACTIVOS FIJOS A IMPRIMIR
                                            */}
                                        <div className="h-12 mb-1 w-full flex items-center justify-end">
                                            <div className="h-8 flex flex-1 gap-x-5 grow">
                                                <input onChange={({target}) => {
                                                    const value = target.value;
                                                    const total = value ? (
                                                        parseInt(String(activosFijosToPrint.filter((activoFijo) => {
                                                            const busqueda = value.trim().toLowerCase()
                                                            const descripcion = activoFijo.descripcion.trim().toLowerCase()
                                                            const id = activoFijo.idActivoFijo.trim().toLowerCase()
                                                            if (!busqueda) {
                                                                return activoFijo
                                                            }
                                                            if (id.includes(busqueda) || descripcion.includes(busqueda)) {
                                                                return activoFijo
                                                            }
                                                        }).length / 50 + 1))
                                                    ) : parseInt(String(activosFijosToPrint.length / 50 + 1))
                                                    setTotalPages(generateBlankButtonsPage(total));
                                                    setActualPage(1)
                                                    setSearchInputToPrint(target.value)
                                                }} type="text" className="w-full px-5 rounded-md h-full border bg-transparent"
                                                       placeholder="Buscar activo fijo"/>
                                            </div>
                                            <button onClick={() => {
                                                if (actualPageToPrint === 1) {
                                                    setActualPageToPrint(totalPagesToPrint.length)
                                                } else {
                                                    setActualPageToPrint(actualPageToPrint - 1)
                                                }
                                            }} className="cursor-pointer rounded-md text-gray-400 px-2 h-7">
                                                <CircleChevronLeftIcon/>
                                            </button>
                                            <div key={"botonesPaginacionToPrint"} className="flex gap-x-2 w-96 justify-center">
                                                {
                                                    blankButtonsQuantity > 0 ? (
                                                        <div className="flex gap-x-2">
                                                            {
                                                                generateBlankButtonsPage(blankButtonsToPrintQuantity).map((buttonBlank, index) => (
                                                                    <button key={"itemBlankToPrint" + buttonBlank} className="border order-last rounded-md px-2 h-7 w-7 border-gray-400 text-gray-400">

                                                                    </button>
                                                                ))
                                                            }
                                                        </div>
                                                    ) : ''
                                                }
                                                {
                                                    totalPagesToPrint.map((pageButton: number, _index: number) => {
                                                        const preIndexButton = actualPageToPrint - 1;
                                                        const postIndexButton = actualPageToPrint + 1;
                                                        if (totalPagesToPrint.length > 7) {
                                                            if (actualPageToPrint <= 3 && pageButton === actualPageToPrint) {
                                                                const cantidad = 4 - actualPageToPrint
                                                                if (cantidad !== blankButtonsToPrintQuantity) {
                                                                    setBlankButtonsToPrintQuantity(cantidad)
                                                                }
                                                            }
                                                            if (actualPageToPrint > 3) {
                                                                const cantidad = 0
                                                                if (cantidad !== blankButtonsToPrintQuantity) {
                                                                    setBlankButtonsToPrintQuantity(cantidad)
                                                                }
                                                            }
                                                            if ((pageButton <= preIndexButton && pageButton <= 1) || (preIndexButton <= pageButton && pageButton <= postIndexButton) || (pageButton === totalPagesToPrint.length)) {
                                                                return (
                                                                    <button onClick={() => {
                                                                        setActualPageToPrint(pageButton)
                                                                    }} key={"itemBlankToPrint" + pageButton}
                                                                            className={`cursor-pointer border rounded-md px-2 h-7 ${pageButton === actualPageToPrint ? 'border-green-500 text-green-500' : 'border-gray-400 text-gray-400'}`}>
                                                                        {pageButton}
                                                                    </button>
                                                                )
                                                            }
                                                            if ((pageButton === preIndexButton - 1) || (pageButton === postIndexButton + 1)) {
                                                                return (
                                                                    <button key={"itemBlankToPrint" + pageButton} className="border rounded-md px-2 h-7 border-gray-400 text-gray-400">
                                                                        ...
                                                                    </button>
                                                                )
                                                            }
                                                        } else {
                                                            return (
                                                                <button onClick={() => {
                                                                    setActualPageToPrint(pageButton)
                                                                }} key={"itemBlankToPrint" + pageButton}
                                                                        className={`cursor-pointer border rounded-md px-2 h-7 ${pageButton === actualPageToPrint ? 'border-green-500 text-green-500' : 'border-gray-400 text-gray-400'}`}>
                                                                    {pageButton}
                                                                </button>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                            <button onClick={() => {
                                                if (actualPage === totalPages.length) {
                                                    setActualPage(1)
                                                } else {
                                                    setActualPage(actualPage + 1)
                                                }
                                            }} className="cursor-pointer rounded-md text-gray-400 px-2 h-7">
                                                <CircleChevronRightIcon/>
                                            </button>
                                        </div>
                                        {/*
                                            TABLA ACTIVOS FIJOS A IMPRIMIR
                                            */}
                                        <div className="w-full  h-[50vh] max-h-[50vh]">
                                            <Table className="border w-full">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableCell colSpan={8} className="text-left">
                                                            Total etiquetas a imprimir:
                                                            <span className="font-bold text-red-500 mx-1">
                                             {
                                                 activosFijosToPrint.filter((activoFijo) => {
                                                     const busqueda = searchInput.trim().toLowerCase()
                                                     const descripcion = activoFijo.descripcion.trim().toLowerCase()
                                                     const id = activoFijo.idActivoFijo.trim().toLowerCase()
                                                     const marca = activoFijo.marca.trim().toLowerCase()
                                                     const modelo = activoFijo.modelo.trim().toLowerCase()
                                                     const serie = activoFijo.serie.trim().toLowerCase()
                                                     const motor = activoFijo.motor.trim().toLowerCase()
                                                     if (!busqueda) {
                                                         return activoFijo
                                                     }
                                                     if (id.includes(busqueda) || descripcion.includes(busqueda) || marca.includes(busqueda) || modelo.includes(busqueda) || serie.includes(busqueda) || motor.includes(busqueda)) {
                                                         return activoFijo
                                                     }
                                                 }).length
                                             }
                                        </span>
                                                        </TableCell>
                                                        <TableCell className="text-right space-x-2">
                                                            <Button onClick={() => {
                                                                setActivosFijosToPrint([])
                                                            }} size="sm" className="cursor-pointer border border-red-500 hover:bg-red-500 hover:text-white py-4 text-sm">
                                                                <TrashIcon/>
                                                            </Button>
                                                            <Button onClick={() => {
                                                                if (activosFijosToPrint) {
                                                                    generarPDFActivosFijos(activosFijosToPrint)
                                                                }
                                                            }} size="sm" className="cursor-pointer border border-red-500 hover:bg-red-500 hover:text-white py-4 text-sm">
                                                                <PrinterIcon/>
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Sel</TableHead>
                                                        <TableHead>Item</TableHead>
                                                        <TableHead>Descripción</TableHead>
                                                        <TableHead>Marca</TableHead>
                                                        <TableHead>Modelo</TableHead>
                                                        <TableHead>Serie</TableHead>
                                                        <TableHead>Motor</TableHead>
                                                        <TableHead>Centro Costos</TableHead>
                                                        <TableHead>Tipo Inventario</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody className="w-full">
                                                    {
                                                        activosFijosToPrint.filter((activoFijo) => {
                                                            const busqueda = searchInputToPrint.trim().toLowerCase()
                                                            const descripcion = activoFijo.descripcion.trim().toLowerCase()
                                                            const id = activoFijo.idActivoFijo.trim().toLowerCase()
                                                            const marca = activoFijo.marca.trim().toLowerCase()
                                                            const modelo = activoFijo.modelo.trim().toLowerCase()
                                                            const serie = activoFijo.serie.trim().toLowerCase()
                                                            const motor = activoFijo.motor.trim().toLowerCase()
                                                            if (!busqueda) {
                                                                return activoFijo
                                                            }
                                                            if (id.includes(busqueda) || descripcion.includes(busqueda) || marca.includes(busqueda) || modelo.includes(busqueda) || serie.includes(busqueda) || motor.includes(busqueda)) {
                                                                return activoFijo
                                                            }
                                                        }).map((activoFijo, index) => {
                                                            const initialIndexPage = 50 * (actualPageToPrint - 1);
                                                            const finalIndexPage = initialIndexPage + 50;
                                                            if (index >= initialIndexPage && index < finalIndexPage)
                                                                return (
                                                                    <TableRow key={"activoFijoToPrint-" + activoFijo.idActivoFijo}>
                                                                        <TableCell className="font-medium w-10 border">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={activosFijosToPrint?.some(ubi => ubi.idActivoFijo.trim() === activoFijo.idActivoFijo.trim()) ?? false}
                                                                                onChange={({target}) => {
                                                                                    const value = target.checked;
                                                                                    setActivosFijosToPrint(prev => {
                                                                                        const current = prev ?? [];

                                                                                        if (value) {
                                                                                            if (current.some(_activoFijo => _activoFijo.idActivoFijo.trim() === activoFijo.idActivoFijo.trim())) {
                                                                                                return current;
                                                                                            }

                                                                                            return [
                                                                                                ...current,
                                                                                                activoFijo
                                                                                            ];
                                                                                        } else {
                                                                                            return current.filter(_activoFijo => _activoFijo.idActivoFijo.trim() !== activoFijo.idActivoFijo.trim());
                                                                                        }
                                                                                    });
                                                                                }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border font-medium">
                                                                            {activoFijo.idActivoFijo}
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                                            {activoFijo.descripcion.trim()}
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                                            {activoFijo.marca.trim()}
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                                            {activoFijo.modelo.trim()}
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                                            {activoFijo.serie.trim()}
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                                            {activoFijo.motor.trim()}
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                                            {activoFijo.centroCosto?.centroCosto}
                                                                            <span className="text-red-500 mx-2">|</span>
                                                                            {activoFijo.centroCosto?.descripcion}
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                                            {activoFijo.tipoInventario?.idTipoInventario}
                                                                            <span className="text-red-500 mx-2">|</span>
                                                                            {activoFijo.tipoInventario?.descripcion}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                        })}
                                                </TableBody>
                                            </Table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ) : ''
                    }
                </div>
            </div>
        </div>
    );
}