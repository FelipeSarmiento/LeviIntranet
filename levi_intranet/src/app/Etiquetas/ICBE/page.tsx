'use client'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {PrinterIcon} from 'lucide-react';
import {useEffect, useState} from "react";
import {getAllItemsByCodigoBarra, getAllListaPrecios} from "@/lib/hooks/api/siesaBackEndAPI";
import * as XLSX from "xlsx";
import {generarPDF} from "@/lib/hooks/etiquetas/etiquetasHooks";

interface itemsToPrintInterface {
    id: string;
    descripcion: string;
    referencia: string;
    extension1: string;
    extension2: string;
    cantidad: number;
    codigoBarra: string;
    precio: string;
}

interface itemsInterface {
    id: string;
    idItem: string;
    descripcion: string;
    referencia: string;
    extension1: string;
    extension2: string;
    cantidad: string,
    codigoBarra: string;
    precio: string;
}

interface itemInterface {
    item: string,
    talla: string,
    color: string,
    cantidad: string,
    codigoBarra: string
}

interface listaPreciosInterface {
    id: string;
    descripcion: string;
}

export default function Home() {

    const [file, setFile] = useState<File>();
    const [listaBodegas, setListaBodegas] = useState<string[]>([])
    const [listaPrecios, setListaPrecios] = useState<listaPreciosInterface[]>([])
    const [dataExcel, setDataExcel] = useState([])
    const [documento, setDocumento] = useState<string>('')
    const [listaPrecio, setListaPrecio] = useState('')
    const [tipoBusqueda, setTipoBusqueda] = useState('manual')
    const [tipoBusquedaFijo, setTipoBusquedaFijo] = useState('manual')
    const [itemToSearch, setItemToSearch] = useState('')
    const [items, setItems] = useState<itemsInterface[]>([])
    const [itemsToPrint, setItemsToPrint] = useState<itemsToPrintInterface[]>([])

    useEffect(() => {
        setItemsToPrint([])
    }, [listaPrecio]);

    useEffect(() => {
        getListaPrecios()
    }, []);

    const handleSubmit = () => {

        setItems([])
        setTipoBusquedaFijo(tipoBusqueda)

        if (!file || !documento || !listaPrecio || !tipoBusqueda) {
            return;
        }
        dataExcel.forEach((document) => {
            if (Object.keys(document).toString() === documento) {
                document[documento].forEach((item: itemInterface) => {
                    console.log(item)
                    searchItems(item, listaPrecio, '01', tipoBusqueda)
                })
            }
        })
    }


    return (
        <div className="flex flex-col gap-y-5 items-center py-10 w-full flex-1 px-40">
            <h2 className="font-bold text-3xl text-left w-7xl">Impresión Códigos de Barra desde Excel</h2>
            <div className="flex flex-col items-center w-full flex-1">
                <div className="flex items-center justify-center h-24 gap-x-8 w-full border-b-2 border-red-500">
                    <div className="flex flex-col">
                        <label htmlFor="">Compañia</label>
                        <Input className="w-52" type="text" value="Levi Strauss Colombia (01)" disabled={true}/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">Archivo:</label>
                        <label className="border py-1 text-nowrap overflow-hidden text-ellipsis border-neutral-400 w-52 h-9 rounded-md text-sm flex items-center px-2"
                               htmlFor="file">{file?.name ?? 'Subir Archivo'}</label>
                        <Input type="file" accept=".xls" onChange={(e) => {
                            setListaBodegas([])
                            setFile(e.currentTarget.files[0])
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
                        <label htmlFor="">Lista Precios</label>
                        <Select defaultValue={listaPrecio} onValueChange={(v) => setListaPrecio(v)}>
                            <SelectTrigger className="w-72">
                                <SelectValue placeholder="Selecciona una lista de precios"/>
                            </SelectTrigger>
                            <SelectContent className="w-72 bg-white ">
                                <SelectGroup>
                                    {
                                        listaPrecios.map((lp, i: number) => (
                                            <SelectItem className="px-0 pr-2 border-b-2 rounded-none border-gray-300" key={"lp-" + i} value={lp.id}>
                                                <span className="font-bold h-full w-10 border-r-2 border-gray-300 text-center text-[10pt]">{lp.id}</span>
                                                <span className="w-[calc(100%_-_40px)]">{lp.descripcion}</span>
                                            </SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <RadioGroup onValueChange={(v) => setTipoBusqueda(v)} defaultValue={tipoBusqueda}>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="manual" id="r1"/>
                                <Label htmlFor="r1">Precio Manual</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="siesa" id="r2"/>
                                <Label htmlFor="r2">Precio Siesa</Label>
                            </div>

                        </RadioGroup>
                    </div>
                    <div>
                        <Button onClick={handleSubmit} className="cursor-pointer border-2 border-red-500 px-8">
                            Buscar
                        </Button>
                    </div>
                </div>
                <div className="w-3/4 flex flex-col items-center gap-y-2 pt-2 space-y-2 flex-1">
                    <h3 className="font-bold">Items</h3>
                    <div className="w-full">
                        <Table className="border">
                            <TableHeader>
                                <TableRow>
                                    <TableCell className="text-left" colSpan={7}>Total items: <span className="font-bold text-red-500">{items.length}</span></TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableHeader>
                                <TableRow>

                                    <TableHead>Item</TableHead>
                                    <TableHead>Referencia</TableHead>
                                    <TableHead>Lavado</TableHead>
                                    <TableHead>Tallas</TableHead>
                                    <TableHead>Código Barra</TableHead>
                                    <TableHead>Precio</TableHead>
                                    <TableHead className="text-right">Cantidad (<span className="text-red-500">{ items.reduce((contador, item) => contador + Number(item.cantidad), 0 ) }</span>)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow key={"item-" + item?.id + index}>
                                        <TableCell>{item?.id}</TableCell>
                                        <TableCell>{item?.referencia}</TableCell>
                                        <TableCell>{item?.extension1}</TableCell>
                                        <TableCell>{item?.extension2}</TableCell>
                                        <TableCell>{item?.codigoBarra}</TableCell>
                                        <TableCell>
                                            {
                                                tipoBusquedaFijo === 'manual' ? (
                                                    <Input
                                                        className="w-24 text-right"
                                                        type="text"
                                                        value={String(new Intl.NumberFormat("es-CO", {
                                                            style: "currency",
                                                            currency: "COP",
                                                            minimumFractionDigits: 0,
                                                        }).format(Number(item?.precio?.split(".")[0])))}
                                                        onChange={({target}) => {
                                                            const value = Number(target.value.replace(/[^\d]/g, ""));

                                                            setItems(prev => {
                                                                const index = prev.findIndex(it => it.idItem === item.idItem);

                                                                if (index !== -1) {
                                                                    const copy = [...prev];
                                                                    copy[index] = {...copy[index], precio: value + ".00"};
                                                                    return copy;
                                                                }

                                                                return [...prev, {...item, cantidad: value}];
                                                            });
                                                        }}
                                                    />
                                                ) : (
                                                    String(new Intl.NumberFormat("es-CO", {
                                                        style: "currency",
                                                        currency: "COP",
                                                        minimumFractionDigits: 0,
                                                    }).format(Number(item?.precio?.split(".")[0])))
                                                )
                                            }

                                        </TableCell>
                                        <TableCell className="flex justify-end">
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
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={7} className="text-right space-x-4">
                                        <Button onClick={() => {
                                            generarPDF(items)
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

    async function getListaPrecios() {
        const rs = await getAllListaPrecios();
        setListaPrecios(rs)
    }

    async function searchItems(item: itemInterface, listaPrecio: string, compania: string, tipoBusqueda: string) {
        let rs = await getAllItemsByCodigoBarra(item.codigoBarra, listaPrecio, compania);
        if (rs.length !== 0){
            switch (tipoBusqueda) {
                case 'manual':
                    setItems(prev => [...prev, {...rs[0], precio: "", cantidad: item.cantidad}]);
                    break;
                case 'siesa':
                    setItems(prev => [...prev, {...rs[0], cantidad: item.cantidad}]);
                    break;
            }
        }
    }

    async function generateData(data: FileList) {
        try {
            console.log("YES")
            const dataFile = await data.arrayBuffer();
            const workbook = XLSX.read(dataFile, {type: "array"});
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {defval: ""});

            const documentos = [
                ...new Set(jsonData.map((r) => r["Nro documento"]).filter((t) => t !== undefined))
            ];

            const rs = []

            for (const documento of documentos) {

                const doc = [];

                const rows = jsonData.filter((r) => r["Nro documento"] === documento);

                for (const row of rows) {

                    const item = {
                        idItem: generateUUID(),
                        item: row["Item"].toString(),
                        talla: row["talla"].toString(),
                        color: row["COLOR"].toString(),
                        cantidad: row["CANTIDAD"].toString(),
                        codigoBarra: row["COD BARRAS"].toString()
                    }

                    doc.push(item)
                }
                function generateUUID() {
                    let d = new Date().getTime();
                    const uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        let r = (d + Math.random() * 16) % 16 | 0;
                        d = Math.floor(d / 16);
                        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                    });
                    return uuid;
                }
                const docFinal = {
                    [documento]: doc
                }
                rs.push(docFinal)

            }
            setDataExcel(rs)
            const keys = [] as string[]
            rs.map((k) => {
                keys.push(Object.keys(k).toString())
            })
            setListaBodegas(keys)

        } catch (e) {
            console.log(e)
        }
    }
}