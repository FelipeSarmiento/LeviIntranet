'use client'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {CircleChevronLeftIcon, CircleChevronRightIcon, PrinterIcon, TrashIcon} from 'lucide-react';
import {useEffect, useState} from "react";
import {BodegasInterface, ItemsInterface, ItemsToPrintInterface, UbicacionesInterface} from "@/lib/interfaces/_interfaces";
import {getAllBodegas, getAllUbcaciones} from "@/lib/hooks/api/siesaBackEndAPI";
import {generarPDFUbicaciones} from "@/lib/hooks/etiquetas/etiquetasUbicacionesHooks";

export default function Home() {
    const [listaBodegas, setListaBodegas] = useState<BodegasInterface[]>()

    useEffect(() => {
        const getBodegas = async () => {
            setListaBodegas(await getAllBodegas())
        }
        getBodegas()
    }, []);

    const [bodega, setBodega] = useState<string>('')
    const [ubicaciones, setUbicaciones] = useState<UbicacionesInterface[]>([])
    const [ubicacionesToPrint, setUbicacionesToPrint] = useState<UbicacionesInterface[]>()
    const [actualPage, setActualPage] = useState(1)
    const [totalPages, setTotalPages] = useState<number[]>([])
    const [searchInput, setSearchInput] = useState<string>('')
    const [blankButtonsQuantity, setBlankButtonsQuantity] = useState<number>(0)

    const handleSubmit = () => {
        if (!bodega) {
            return;
        }
        setUbicaciones([])
        setUbicacionesToPrint([])
        setActualPage(1)
        setTotalPages(
            generateButtonPage(
                parseInt(String(ubicaciones.length / 50 + 1))
            )
        )
        getAllUbcaciones(bodega, '01').then((res) => {
            setUbicaciones(res)
            const total = searchInput ? (
                res.filter((ubicacion) => {
                        const busqueda = searchInput.trim().toLowerCase()
                        const descripcion = ubicacion.descripcion.trim().toLowerCase()
                        const id = ubicacion.id.trim().toLowerCase()
                        if (!busqueda){
                            return ubicacion
                        }
                        if (id.includes(busqueda) || descripcion.includes(busqueda)){
                            return ubicacion
                        }
                    }).length
                ) : parseInt(String(res.length / 50 + 1))
            setTotalPages(generateButtonPage(total));
        })

    }

    const generateButtonPage = (maxPage: number) => {
        const buttonElements : number[] = [];
        for (let i = 1; i <= maxPage; i++) {
            buttonElements.push(i);
        }

        return buttonElements;
    }




    return (
        <div className="flex flex-col gap-y-5 items-center py-10 w-full flex-1 px-40">
            <h2 className="font-bold text-3xl text-left w-7xl">Impresión de Ubicaciones</h2>
            <div className="flex flex-col items-center w-full flex-1">
                <div className="flex items-center justify-center h-24 gap-x-8 w-full border-b-2 border-red-500">
                    <div className="flex flex-col">
                        <label htmlFor="">Compañia</label>
                        <Input className="w-52" type="text" value="Levi Strauss Colombia (01)" disabled={true}/>
                    </div>
                    <div>
                        <label htmlFor="">Seleccionar bodega</label>
                        <Select onValueChange={(v) => setBodega(v)} defaultValue={bodega} disabled={listaBodegas?.length == 0}>
                            <SelectTrigger className="w-96 text-nowrap">
                                <SelectValue placeholder={
                                    (listaBodegas?.length == 0) ? (
                                        'Sin Bodegas'
                                    ) : 'Selecciona una bodega'
                                }/>
                            </SelectTrigger>
                            <SelectContent className="bg-white w-96">
                                <SelectGroup>
                                    {
                                        listaBodegas?.map((bodega) => (
                                            <SelectItem className="px-3 flex border-b-2 text-nowrap rounded-none border-gray-300" key={"bodega-" + bodega.rowId} value={bodega.rowId.toString()}>
                                                <div className="font-bold flex justify-center w-10 border-r-2 border-red-500 mr-1">
                                                    {bodega.rowId}
                                                </div>
                                                <span>
                                                    {bodega.descripcionCorta} - {bodega.id}
                                                </span>
                                            </SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Button onClick={handleSubmit} className="cursor-pointer border-2 border-red-500 px-8">
                            Generar Datos
                        </Button>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center gap-y-5 pt-2 flex-1">
                    <h3 className="font-bold w-full text-center my-2">Ubicaciones</h3>
                    <div className="w-full flex justify-center gap-x-5">
                        <div className="flex-1 max-w-7xl">
                            {
                                ubicaciones.length > 0 ? (
                                    <div key={"ubicaciones"}>
                                        <div className="h-12 mb-1 w-full flex items-center justify-end">
                                            <div className="h-8 flex flex-1 gap-x-5 grow">
                                                <input onChange={ ({target}) => {
                                                    const value = target.value;
                                                    const total = value ? (
                                                        parseInt(String(ubicaciones.filter((ubicacion) => {
                                                            const busqueda = value.trim().toLowerCase()
                                                            const descripcion = ubicacion.descripcion.trim().toLowerCase()
                                                            const id = ubicacion.id.trim().toLowerCase()
                                                            if (!busqueda){
                                                                return ubicacion
                                                            }
                                                            if (id.includes(busqueda) || descripcion.includes(busqueda)){
                                                                return ubicacion
                                                            }
                                                        }).length / 50 + 1))
                                                    ) : parseInt(String(ubicaciones.length / 50 + 1))
                                                    setTotalPages(generateButtonPage(total));
                                                    setActualPage(1)
                                                    setSearchInput(target.value)
                                                } } type="text" className="w-full px-5 rounded-md h-full border bg-transparent"
                                                placeholder="Buscar ubicación"/>
                                            </div>
                                            <button onClick={ () => {
                                                if (actualPage === 1) {
                                                    setActualPage(totalPages.length)
                                                } else {
                                                    setActualPage(actualPage - 1)
                                                }
                                            } } className="cursor-pointer rounded-md text-gray-400 px-2 h-7">
                                                <CircleChevronLeftIcon/>
                                            </button>
                                            <div key={"botonesPaginacion" + String(Math.random())} className="flex gap-x-2 w-96 justify-center">
                                                {
                                                    blankButtonsQuantity > 0 ? (
                                                        <div className="flex gap-x-2">
                                                            {
                                                                generateButtonPage(blankButtonsQuantity).map((a, index) => (
                                                                    <button key={"itemBlank" + String(index + Math.random())} className="border order-last rounded-md px-2 h-7 w-7 border-gray-400 text-gray-400">

                                                                    </button>
                                                                ))
                                                            }
                                                        </div>
                                                    ) : ''
                                                }
                                                {
                                                    totalPages.map( (pageButton: number, _index:number) => {
                                                        const preIndexButton = actualPage - 1;
                                                        const postIndexButton = actualPage + 1;
                                                        if (totalPages.length > 7) {
                                                            if (actualPage <= 3 && pageButton === actualPage) {
                                                                const cantidad = 4 - actualPage
                                                                if (cantidad !== blankButtonsQuantity){
                                                                    setBlankButtonsQuantity(cantidad)
                                                                }
                                                            }
                                                            if (actualPage > 3){
                                                                const cantidad = 0
                                                                if (cantidad !== blankButtonsQuantity){
                                                                    setBlankButtonsQuantity(cantidad)
                                                                }
                                                            }
                                                            if (actualPage >= (totalPages.length - 2) && pageButton === actualPage) {
                                                                const cantidad = ( actualPage + 3) - totalPages.length
                                                                // setBlankButtonsQuantity(cantidad)
                                                            }
                                                            if ((pageButton <= preIndexButton && pageButton <= 1) || (preIndexButton <= pageButton && pageButton <= postIndexButton) || (pageButton === totalPages.length)) {
                                                                return (
                                                                    <button onClick={ () => {
                                                                        setActualPage(pageButton)
                                                                    } } key={"item" + pageButton + String(_index + Math.random())} className={`cursor-pointer border rounded-md px-2 h-7 ${pageButton === actualPage ? 'border-green-500 text-green-500' : 'border-gray-400 text-gray-400'}`}>
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
                                                        }
                                                        else {
                                                            return (
                                                                <button onClick={ () => {
                                                                    setActualPage(pageButton)
                                                                } } key={"item" + pageButton + String(_index + Math.random())} className={`cursor-pointer border rounded-md px-2 h-7 ${pageButton === actualPage ? 'border-green-500 text-green-500' : 'border-gray-400 text-gray-400'}`}>
                                                                    {pageButton}
                                                                </button>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                            <button onClick={ () => {
                                                if (actualPage === totalPages.length) {
                                                    setActualPage(1)
                                                } else {
                                                    setActualPage(actualPage + 1)
                                                }
                                            }} className="cursor-pointer rounded-md text-gray-400 px-2 h-7">
                                                <CircleChevronRightIcon/>
                                            </button>
                                        </div>
                                        <div className="w-full space-y-5 h-[60vh] max-h-[60vh]">
                                            <Table className="border w-full">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableCell className="text-left">
                                                            Total Ubicaciones:
                                                            <span className="font-bold text-red-500 mx-1">
                                             {
                                                 ubicaciones.filter((ubicacion) => {
                                                     const busqueda = searchInput.trim().toLowerCase()
                                                     const descripcion = ubicacion.descripcion.trim().toLowerCase()
                                                     const id = ubicacion.id.trim().toLowerCase()
                                                     if (!busqueda){
                                                         return ubicacion
                                                     }
                                                     if (id.includes(busqueda) || descripcion.includes(busqueda)){
                                                         return ubicacion
                                                     }
                                                 }).length
                                             }
                                        </span>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-10"></TableHead>
                                                        <TableHead className="w-40 font-medium">Id</TableHead>
                                                        <TableHead className="w-40 font-medium">Descripción</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody className="w-full">
                                                    {
                                                        ubicaciones.filter((ubicacion) => {
                                                            const busqueda = searchInput.trim().toLowerCase()
                                                            const descripcion = ubicacion.descripcion.trim().toLowerCase()
                                                            const id = ubicacion.id.trim().toLowerCase()
                                                            if (!busqueda){
                                                                return ubicacion
                                                            }
                                                            if (id.includes(busqueda) || descripcion.includes(busqueda)){
                                                                return ubicacion
                                                            }
                                                        }).map((ubicacion, index) => {
                                                            const elementsPerPage = ubicaciones.length / 50;
                                                            const initialIndexPage = 50 * (actualPage - 1);
                                                            const finalIndexPage = initialIndexPage + 50;
                                                            if (index >= initialIndexPage && index < finalIndexPage)
                                                                return (
                                                                    <TableRow key={"ubicacion-" + ubicacion.id + "-" + String(index + Math.random())}>
                                                                        <TableCell className="font-medium w-10 border">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={ubicacionesToPrint?.some(ubi => ubi.id.trim() === ubicacion.id.trim()) ?? false}
                                                                                onChange={({ target }) => {
                                                                                    const value = target.checked;
                                                                                    setUbicacionesToPrint(prev => {
                                                                                        const current = prev ?? [];
                                                                                        const bodegaSeleccionada = listaBodegas?.find(
                                                                                            (_bodega) => _bodega.rowId === Number(bodega)
                                                                                        );

                                                                                        if (value) {
                                                                                            if (current.some(ubi => ubi.id.trim() === ubicacion.id.trim())) {
                                                                                                return current;
                                                                                            }

                                                                                            return [
                                                                                                ...current,
                                                                                                {
                                                                                                    id: ubicacion.id.trim(),
                                                                                                    descripcionCortaBodega: bodegaSeleccionada?.descripcionCorta?.trim(),
                                                                                                    descripcion: ubicacion.descripcion.trim(),
                                                                                                    bodegaId: bodegaSeleccionada?.id?.trim(),
                                                                                                    bodegaRowId: bodegaSeleccionada?.rowId,
                                                                                                } as UbicacionesInterface,
                                                                                            ];
                                                                                        } else {
                                                                                            return current.filter(ubi => ubi.id.trim() !== ubicacion.id.trim());
                                                                                        }
                                                                                    });
                                                                                }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border font-medium">
                                                                            {ubicacion.id}
                                                                        </TableCell>
                                                                        <TableCell className="w-[calc(50%_-_40px)] min-w-[calc(50%_-_40px)] border text-wrap">
                                                                            {ubicacion.descripcion.trim()}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                        })}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                ) : 'Sin ubicaciones'
                            }
                        </div>
                        {
                            ubicacionesToPrint && ubicacionesToPrint.length > 0 ? (
                                <div className="w-2/5 border rounded-2xl p-2 flex flex-col items-center py-2">
                                    <div className="flex w-full text-center relative">
                                        <h3 className="font-semibold  w-full text-center">Ubicaciones a imprimir</h3>
                                        <Button onClick={() => {
                                            setUbicacionesToPrint([])
                                        }} size="sm" className="cursor-pointer left-2 absolute border border-red-500 hover:bg-red-500 hover:text-white py-4 text-sm">
                                            <TrashIcon/>
                                        </Button>
                                        <Button onClick={() => {
                                            if (ubicacionesToPrint) {
                                                generarPDFUbicaciones(ubicacionesToPrint)
                                            }
                                        }} size="sm" className="cursor-pointer right-2 absolute border border-red-500 hover:bg-red-500 hover:text-white py-4 text-sm">
                                            <PrinterIcon/>
                                        </Button>
                                    </div>
                                    <div className="flex mt-5  w-full text-center font-bold">
                                        <div className="w-10"></div>
                                        <div className="w-[calc(50%_-_40px)]">Id</div>
                                        <div className="w-[calc(50%_-_40px)]">Descripción</div>
                                    </div>
                                    {
                                        ubicacionesToPrint?.map((ubicacion, index) => {
                                            return (
                                                <div key={"ubicacionToPrint-" + ubicacion.id + "-" + String(index + Math.random())} className="flex w-full min-h-10 py-1 leading-4 items-center border-b text-center">
                                                    <div className="w-10">
                                                        <input
                                                            type="checkbox"
                                                            checked={ubicacionesToPrint?.some(ubi => ubi.id.trim() === ubicacion.id.trim()) ?? false}
                                                            onChange={({ target }) => {
                                                                const value = target.checked;
                                                                setUbicacionesToPrint(prev => {
                                                                    const current = prev ?? [];
                                                                    const bodegaSeleccionada = listaBodegas?.find(
                                                                        (_bodega) => _bodega.rowId === Number(bodega)
                                                                    );

                                                                    if (value) {
                                                                        if (current.some(ubi => ubi.id.trim() === ubicacion.id.trim())) {
                                                                            return current;
                                                                        }

                                                                        return [
                                                                            ...current,
                                                                            {
                                                                                id: ubicacion.id.trim(),
                                                                                descripcionCortaBodega: bodegaSeleccionada?.descripcionCorta?.trim(),
                                                                                descripcion: ubicacion.descripcion.trim(),
                                                                                bodegaId: bodegaSeleccionada?.id?.trim(),
                                                                                bodegaRowId: bodegaSeleccionada?.rowId,
                                                                            } as UbicacionesInterface,
                                                                        ];
                                                                    } else {
                                                                        return current.filter(ubi => ubi.id.trim() !== ubicacion.id.trim());
                                                                    }
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="w-[calc(50%_-_40px)]">{ubicacion.id.trim()}</div>
                                                    <div className="w-[calc(50%_-_40px)]">{ubicacion.descripcion.trim()}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}