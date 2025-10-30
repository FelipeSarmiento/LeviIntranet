'use client'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {PrinterIcon} from 'lucide-react';
import {useEffect, useState} from "react";
import * as XLSX from "xlsx";
import {generarPDFExito} from "@/lib/hooks/etiquetas/etiquetasExitoHooks";
import {ItemsInterface, ItemsToPrintInterface} from "@/lib/interfaces/_interfaces";




export default function Home() {



    const [file, setFile] = useState<FileList>();
    const [listaBodegas, setListaBodegas] = useState<string[]>([])
    const [dataExcel, setDataExcel] = useState([])
    const [documento, setDocumento] = useState<string>('')
    const [listaPrecio, setListaPrecio] = useState('')
    const [tipoBusqueda, setTipoBusqueda] = useState('manual')
    const [itemToSearch, setItemToSearch] = useState('')
    const [items, setItems] = useState<ItemsInterface[]>([])
    const [itemsToPrint, setItemsToPrint] = useState<ItemsToPrintInterface[]>([])

    useEffect(() => {
        setItemsToPrint([])
    }, [listaPrecio]);

    const handleSubmit = () => {

        setItems([])

        if (!file || !documento) {
            return;
        }
        dataExcel.forEach((tienda) => {
            if (Object.keys(tienda).toString() === documento) {
                console.log(tienda[documento])
                setItems(tienda[documento])
            }
        })
    }


    return (
        <div className="flex flex-col gap-y-5 items-center py-10 w-full flex-1 px-40">
            <h2 className="font-bold text-3xl text-left w-7xl">Impresión Etiquetas y Precios Manual</h2>
            <div className="flex flex-col items-center w-full flex-1">
                <div className="flex items-center justify-center h-24 gap-x-8 w-full border-b-2 border-red-500">
                    <div className="flex flex-col">
                        <label htmlFor="">Archivo:</label>
                        <label className="border py-1 text-nowrap overflow-hidden text-ellipsis border-neutral-400 w-52 h-9 rounded-md text-sm flex items-center px-2"
                               htmlFor="file">{file?.name ?? 'Subir Archivo'}</label>
                        <Input type="file" accept=".xls" onChange={(e) => {
                            setListaBodegas([])
                            setFile(e.target.files[0])
                            generateData(e.target.files[0])
                        }} className="hidden " id="file"/>
                    </div>
                    <div>
                        <label htmlFor="">Seleccionar documento</label>
                        <Select onValueChange={(v) => setDocumento(v)} defaultValue={documento} disabled={listaBodegas.length == 0}>
                            <SelectTrigger className="w-56 ">
                                <SelectValue placeholder={
                                    (listaBodegas.length == 0 && file !== undefined) ? (
                                        'Formato Invalido'
                                    ) : 'Selecciona un documento'
                                }/>
                            </SelectTrigger>
                            <SelectContent className="bg-white w-56 ">
                                <SelectGroup>
                                    {
                                        listaBodegas.map((bodega) => (
                                            <SelectItem className="px-3 font-bold border-b-2 rounded-none border-gray-300" key={"bodega-" + bodega} value={bodega}>{bodega}</SelectItem>
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
                <div className="w-3/4 flex flex-col items-center gap-y-2 pt-2 space-y-2 flex-1">
                    <h3 className="font-bold">Items</h3>
                    <div className="w-full">
                        <Table className="border">
                            <TableHeader>
                                <TableRow>
                                    <TableCell className="text-left" colSpan={8}>Total items: <span className="font-bold text-red-500">{ items.length }</span></TableCell>
                                    <TableCell colSpan={2} className="text-right space-x-4">
                                        <Button onClick={() => {
                                            generarPDFExito(items)
                                        }} size="sm" className="cursor-pointer border border-red-500 hover:bg-red-500 hover:text-white py-4 text-sm">
                                            Imprimir Items <PrinterIcon/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Referencia</TableHead>
                                    <TableHead>Descripción</TableHead>
                                    <TableHead>Color</TableHead>
                                    <TableHead>Talla</TableHead>
                                    <TableHead>Código Barra</TableHead>
                                    <TableHead>Sub Linea</TableHead>
                                    <TableHead>PLU</TableHead>
                                    <TableHead>Precio Publico</TableHead>
                                    <TableHead>Cantidad (<span className="text-red-500">{ items.reduce((contador, item) => contador + item.cantidad, 0 ) }</span>)</TableHead>
                                    <TableHead>Fecha</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow key={"item-" + item.codigoBarra + "-" + index}>
                                        <TableCell className="font-medium">{ item.referencia }</TableCell>
                                        <TableCell className="max-w-40 text-wrap">{ item.descripcion }</TableCell>
                                        <TableCell>{ item.color }</TableCell>
                                        <TableCell>{ item.talla }</TableCell>
                                        <TableCell>{ item.codigoBarra }</TableCell>
                                        <TableCell>{ item.sublinea }</TableCell>
                                        <TableCell>{ item.plu }</TableCell>
                                        <TableCell>{String(new Intl.NumberFormat("es-CO", {
                                            style: "currency",
                                            currency: "COP",
                                            minimumFractionDigits: 0, // puedes ajustar si quieres mostrar decimales
                                        }).format(Number(item?.precioPublico)))}</TableCell>
                                        <TableCell>
                                            <Input
                                                className="w-24 text-right"
                                                type="text"
                                                value={String(item?.cantidad)}
                                                onChange={({target}) => {
                                                    const value = Number(target.value);

                                                    setItems(prev => {
                                                        const index = prev.findIndex(it => it.idItem === item.idItem);

                                                        if (index !== -1) {
                                                            const copy = [...prev];
                                                            copy[index] = {...copy[index], cantidad: value};
                                                            return copy;
                                                        }

                                                        return [...prev, {...item, cantidad: value}];
                                                    });
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>{ item.fecha }</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={10} className="text-right space-x-4">
                                        <Button onClick={() => {
                                            generarPDFExito(items)
                                        }} size="sm" className="cursor-pointer border border-red-500 hover:bg-red-500 hover:text-white py-4 text-sm">
                                            Imprimir Items <PrinterIcon/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );

    async function generateData(data: File) {
        try {

            const dataFile = await data.arrayBuffer();
            const workbook = XLSX.read(dataFile, {type: "array"});
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {defval: ""});

            const documentos = [
                ...new Set(jsonData.map((r) => r["TIENDA"]).filter((t) => t !== undefined))
            ];

            console.log('Documentos:', documentos)
            const rs = []

            if (documentos){
                for (const documento of documentos) {

                    const doc = [];

                    const rows = jsonData.filter((r) => r["TIENDA"] === documento);


                    for (const row of rows) {

                        const item = {
                            idItem: generateUUID(),
                            codigo: row["CODIGO"],
                            tienda: row["TIENDA"],
                            referencia: row["REFERENCIA"],
                            descripcion: row["DESCRIPCION"],
                            color: row["COLOR"],
                            talla: row["TALLA"],
                            codigoBarra: row["COD BARRAS"],
                            sublinea: row["SUBLINEA"],
                            plu: row["PLU"],
                            precioPublico: row["PRECIO PUBLICO"],
                            cantidad: row[" CARGA DESEADA ( INICIAL ) "],
                            fecha: row["fecha"],
                        } as itemsInterface

                        function generateUUID() {
                            let d = new Date().getTime();
                            const uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                                let r = (d + Math.random() * 16) % 16 | 0;
                                d = Math.floor(d / 16);
                                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                            });
                            return uuid;
                        }

                        doc.push(item)
                    }
                    const docFinal = {
                        [documento]: doc
                    }
                    rs.push(docFinal)
                }
            }
            console.log('RS:', rs)
            setDataExcel(rs)
            const keys = [] as string[]
            rs.map((k) => {
                if (k){
                    keys.push(Object.keys(k).toString())
                }
            })
            setListaBodegas(keys)

        } catch (e) {
            console.log(e)
        }
    }
}