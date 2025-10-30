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
            <h2 className="font-bold text-3xl text-left w-7xl">Impresión Códigos de Barra desde OPC</h2>
            <div className="flex flex-col items-center w-full flex-1">
                <div className="flex items-center justify-center h-24 gap-x-8 w-full border-b-2 border-red-500">
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
                        <label htmlFor="">Número OP</label>
                        <Input type="text"/>
                    </div>
                    <div>
                        <label htmlFor="">Despacho</label>
                        <Input type="text"/>
                    </div>
                    <div>
                        <label htmlFor="">Número Caja</label>
                        <Input type="text"/>
                    </div>
                    <div>
                        <Button className="border-2 border-red-500 px-8">
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