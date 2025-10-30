import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { PrinterIcon, PlusIcon } from 'lucide-react';

export default function Home(){

    const invoices = [
        {
            invoice: "INV001",
            paymentStatus: "Paid",
            totalAmount: "$250.00",
            paymentMethod: "Credit Card",
        },
        {
            invoice: "INV002",
            paymentStatus: "Pending",
            totalAmount: "$150.00",
            paymentMethod: "PayPal",
        },
        {
            invoice: "INV003",
            paymentStatus: "Unpaid",
            totalAmount: "$350.00",
            paymentMethod: "Bank Transfer",
        },
        {
            invoice: "INV004",
            paymentStatus: "Paid",
            totalAmount: "$450.00",
            paymentMethod: "Credit Card",
        },
        {
            invoice: "INV005",
            paymentStatus: "Paid",
            totalAmount: "$550.00",
            paymentMethod: "PayPal",
        },
        {
            invoice: "INV006",
            paymentStatus: "Pending",
            totalAmount: "$200.00",
            paymentMethod: "Bank Transfer",
        },
        {
            invoice: "INV007",
            paymentStatus: "Unpaid",
            totalAmount: "$300.00",
            paymentMethod: "Credit Card",
        },
    ]
    return (
        <div className="flex flex-col gap-y-5 items-center py-10 w-full flex-1 px-40">
            <h2 className="font-bold text-3xl text-left w-7xl">Impresión Códigos de Barra desde Siesa</h2>
            <div className="flex flex-col items-center w-full flex-1">
                <div className="flex items-center justify-center h-24 gap-x-8 w-full border-b-2 border-red-500">
                    <div className="space-y-1">
                        <Label className="border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" htmlFor="file">
                            Importar XLS
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="icon icon-tabler icons-tabler-outline icon-tabler-file-type-xls">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
                                <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4"/>
                                <path d="M4 15l4 6"/>
                                <path d="M4 21l4 -6"/>
                                <path d="M17 20.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75"/>
                                <path d="M11 15v6h3"/>
                            </svg>
                        </Label>
                        <Input id="file" className="hidden" type="file"/>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecciona un documento"/>
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectGroup>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="">Compañia</label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecciona una Compañia" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectGroup>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="">Lista Precios</label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecciona un precio" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectGroup>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <RadioGroup defaultValue="comfortable">
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="default" id="r1" />
                                <Label htmlFor="r1">Item</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="comfortable" id="r2" />
                                <Label htmlFor="r2">Código Barra</Label>
                            </div>

                        </RadioGroup>
                    </div>
                    <div>
                        <label htmlFor=""></label>
                        <Input type="text" placeholder="Item o Código"/>
                    </div>
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
                    <div>
                        <Button className="border-2 border-red-500 px-8">
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
                                    <TableCell className="text-left" colSpan={6}>Total items: <span className="font-bold text-red-500">203</span></TableCell>
                                    <TableCell colSpan={2} className="text-right">
                                        <Button size="sm" className="cursor-pointer border border-red-500 hover:bg-red-500 hover:text-white py-4 text-sm">
                                            Imprimir Items <PrinterIcon/>
                                        </Button>
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
                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.invoice}>
                                        <TableCell className="font-medium">143</TableCell>
                                        <TableCell>6619</TableCell>
                                        <TableCell>00501-3769 JEAN 501</TableCell>
                                        <TableCell>058</TableCell>
                                        <TableCell>00/00</TableCell>
                                        <TableCell>7705924629643</TableCell>
                                        <TableCell>141100</TableCell>
                                        <TableCell className="flex justify-end">
                                            <Input className="w-24 text-right" type="text" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}