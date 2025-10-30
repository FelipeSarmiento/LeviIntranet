'use client'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {PrinterIcon, PlusIcon, TrashIcon} from 'lucide-react';
import {getAllItemsByCodigoBarra, getAllItemsById, getAllListaPrecios} from "@/lib/hooks/api/siesaBackEndAPI";
import {useEffect, useState} from "react";
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
    descripcion: string;
    referencia: string;
    extension1: string;
    extension2: string;
    codigoBarra: string;
    precio: string;
}
interface listaPreciosInterface {
    id: string;
    descripcion: string;
}

export default function Home(){

    const [listaPrecios, setListaPrecios] = useState<listaPreciosInterface[]>([])
    const [listaPrecio, setListaPrecio] = useState('')
    const [tipoBusqueda, setTipoBusqueda] = useState('item')
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
        if (!listaPrecio || !tipoBusqueda || !itemToSearch){
            return;
        }
        searchItems(itemToSearch, listaPrecio, '01', tipoBusqueda)
    }
    return (
        <div className="flex flex-col gap-y-5 items-center py-10 w-full flex-1 px-40">
            <h2 className="font-bold text-3xl text-left w-7xl">Impresión Códigos de Barra</h2>
            <div className="flex flex-col items-center w-full flex-1">
                <div className="flex items-center justify-center h-24 gap-x-8 w-full border-b-2 border-red-500">
                    <div>
                        <label htmlFor="">Compañia</label>
                        <Input type="text" value="Levi Strauss Colombia (01)" disabled={true}/>
                    </div>
                    <div>
                        <label htmlFor="">Lista Precios</label>
                        <Select defaultValue={ listaPrecio }  onValueChange={ (v) => setListaPrecio(v) }>
                                <SelectTrigger className="w-72">
                                <SelectValue placeholder="Selecciona una lista de precios" />
                            </SelectTrigger>
                            <SelectContent className="w-72 bg-white">
                                <SelectGroup>
                                    {
                                        listaPrecios.map((lp, i: number) => (
                                            <SelectItem  className="px-0 border-b-2 rounded-none border-gray-300" key={ "lp-" + i } value={ lp.id }>
                                                <span className="font-bold h-full w-10 border-r-2 border-gray-300 text-center text-[10pt]">{ lp.id }</span>
                                                <span className="w-[calc(100%_-_40px)]">{ lp.descripcion }</span>
                                            </SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <RadioGroup onValueChange={ (v) => setTipoBusqueda(v) } defaultValue={ tipoBusqueda }>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="item" id="r1" />
                                <Label htmlFor="r1">Item</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="codigoBarra" id="r2" />
                                <Label htmlFor="r2">Código Barra</Label>
                            </div>

                        </RadioGroup>
                    </div>
                    <div>
                        <label htmlFor=""></label>
                        <Input onChange={ (e) => setItemToSearch(e.target.value) } type="text" placeholder="Item o Código"/>
                    </div>
                    {/*
                    <div>
                        <RadioGroup defaultValue="comfortable">
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="default" id="r1" />
                                <Label htmlFor="r1">Primeras</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="comfortable" id="r2" />
                                <Label htmlFor="r2">Segundas</Label>
                            </div>

                        </RadioGroup>
                    </div>
                    */}
                    <div>
                        <Button onClick={ handleSubmit } className="cursor-pointer border-2 border-red-500 px-8">
                            Buscar
                        </Button>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center gap-y-2 pt-2 space-y-2 flex-1">
                    <h3 className="font-bold">Items</h3>
                    <div className="w-3/4 h-[450px]">
                        <Table className="border overflow-scroll rounded-md">
                            <TableHeader>
                                <TableRow>
                                    <TableCell className="text-left" colSpan={6}>Total items: <span className="font-bold text-red-500">{ items.length }</span></TableCell>
                                    <TableCell colSpan={2} className="text-right">

                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Linx</TableHead>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Referencia</TableHead>
                                    <TableHead>Lavado</TableHead>
                                    <TableHead>Tallas</TableHead>
                                    <TableHead>Código Barra</TableHead>
                                    <TableHead>Precio</TableHead>
                                    <TableHead className="text-right">Cantidad</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow key={"item-" + item.id + index}>
                                        <TableCell className="font-medium"></TableCell>
                                        <TableCell>{ item.id }</TableCell>
                                        <TableCell>{ item.referencia }</TableCell>
                                        <TableCell>{ item.extension1 }</TableCell>
                                        <TableCell>{ item.extension2 }</TableCell>
                                        <TableCell>{ item.codigoBarra }</TableCell>
                                        <TableCell>{ String(new Intl.NumberFormat("es-CO", {
                                            style: "currency",
                                            currency: "COP",
                                            minimumFractionDigits: 0, // puedes ajustar si quieres mostrar decimales
                                        }).format(Number(item.precio.split(".")[0]))) }</TableCell>
                                        <TableCell className="flex justify-end">
                                            <Input
                                                className="w-24 text-right"
                                                type="text"
                                                value={
                                                    (itemsToPrint.find((ip) => ip.codigoBarra === item.codigoBarra)?.cantidad || '')
                                                }
                                                onChange={({ target }) => {
                                                    const value = Number(target.value);

                                                    setItemsToPrint(prev => {
                                                        const index = prev.findIndex(it => it.codigoBarra === item.codigoBarra);

                                                        if (index !== -1) {
                                                            const copy = [...prev];
                                                            copy[index] = { ...copy[index], cantidad: value };
                                                            return copy;
                                                        }

                                                        return [...prev, { ...item, cantidad: value }];
                                                    });
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="w-3/4">
                        {
                            (itemsToPrint.length !== 0) ?
                            (
                                <>
                                    <div className="bg-red-500 h-1 my-16 rounded-2xl w-full" />
                                    <h3 className="font-bold">Items a imprimir</h3>
                                    <Table className="border">
                                        <TableHeader>
                                            <TableRow>
                                                <TableCell className="text-left" colSpan={8}>Total items: <span className="font-bold text-red-500">{ items.length }</span></TableCell>
                                            </TableRow>
                                        </TableHeader>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Linx</TableHead>
                                                <TableHead>Item</TableHead>
                                                <TableHead>Referencia</TableHead>
                                                <TableHead>Lavado</TableHead>
                                                <TableHead>Tallas</TableHead>
                                                <TableHead>Código Barra</TableHead>
                                                <TableHead>Precio</TableHead>
                                                <TableHead className="text-right">Cantidad</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {itemsToPrint.map((item, index) => (
                                                <TableRow key={"itemPrint-" + item.id + index}>
                                                    <TableCell className="font-medium"></TableCell>
                                                    <TableCell>{ item.id }</TableCell>
                                                    <TableCell>{ item.referencia }</TableCell>
                                                    <TableCell>{ item.extension1 }</TableCell>
                                                    <TableCell>{ item.extension2 }</TableCell>
                                                    <TableCell>{ item.codigoBarra }</TableCell>
                                                    <TableCell>{ String(new Intl.NumberFormat("es-CO", {
                                                        style: "currency",
                                                        currency: "COP",
                                                        minimumFractionDigits: 0, // puedes ajustar si quieres mostrar decimales
                                                    }).format(Number(item.precio.split(".")[0]))) }</TableCell>
                                                    <TableCell className="flex justify-end space-x-2">
                                                        <Input
                                                            className="w-24 text-right"
                                                            type="text"
                                                            value={item.cantidad} // input controlado, refleja el estado
                                                            onChange={({ target }) => {
                                                                const value = Number(target.value);

                                                                setItemsToPrint(prev => {
                                                                    const index = prev.findIndex(it => it.codigoBarra === item.codigoBarra);

                                                                    if (index !== -1) {
                                                                        const copy = [...prev];
                                                                        copy[index] = { ...copy[index], cantidad: value };
                                                                        return copy;
                                                                    }

                                                                    return [...prev, { ...item, cantidad: value }];
                                                                });
                                                            }}
                                                        />
                                                        <Button onClick={ () => {
                                                            setItemsToPrint(prev => {
                                                                const index = prev.findIndex(it => it.codigoBarra === item.codigoBarra);

                                                                if (index !== -1) {
                                                                    const copy = [...prev];
                                                                    copy.splice(index, 1)
                                                                    return copy;
                                                                }

                                                                return itemsToPrint
                                                            });
                                                        } } size="sm" className="cursor-pointer border border-red-500 hover:bg-red-500 hover:text-white py-4 text-sm">
                                                            <TrashIcon/>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TableCell colSpan={8} className="text-right space-x-4">
                                                    <Button onClick={ () => {
                                                        setItemsToPrint([])
                                                    } } size="sm" className="cursor-pointer border border-red-500 hover:bg-red-500 hover:text-white py-4 text-sm">
                                                        Limpiar Items <TrashIcon/>
                                                    </Button>
                                                    <Button onClick={ () => {
                                                        generarPDF(itemsToPrint)
                                                    } } size="sm" className="cursor-pointer border border-red-500 hover:bg-red-500 hover:text-white py-4 text-sm">
                                                        Imprimir Items <PrinterIcon/>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </>

                            ) : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    );

    async function getListaPrecios (){
        const rs = await getAllListaPrecios();
        setListaPrecios(rs)
    }

    async function searchItems (item : string, listaPrecio: string, compania: string, tipoBusqueda : string) {
        let rs;
        switch (tipoBusqueda) {
            case 'item':
                rs = await getAllItemsById(item, listaPrecio, compania);
                setItems(rs)
                break;
            case 'codigoBarra':
                rs = await getAllItemsByCodigoBarra(item, listaPrecio, compania);
                setItems(rs)
                break;
        }
    }
}