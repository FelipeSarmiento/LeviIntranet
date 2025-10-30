import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {FormHook} from "@/components/common/FormHook";
import {typeFormEnum} from "@/lib/enums/typeFormEnum";
import {getAllBodegas} from "@/lib/hooks/api/siesaBackEndAPI";

export default async  function Home() {

    const bodegas = await getAllBodegas();

    const dataForms = [
        {
            typeForm: typeFormEnum.PlanoJumbo,
            information: "Jumbo",
            fileEnable : true,
            dateEnable : true,
            bodegaEnable : true,
            bodegas,
            buttonLabel : "Generar Plano Pedido Jumbo",
            centroOperativo: "202"
        },
        {
            typeForm: typeFormEnum.PlanoFalabella,
            information: "Falabella",
            fileEnable : true,
            dateEnable :true,
            bodegaEnable : true,
            bodegas,
            buttonLabel : "Generar Plano Pedido Falabella",
            centroOperativo: "201"
        },
        {
            typeForm: typeFormEnum.PlanoConsignacion,
            information: "Consignaciones Jumbo",
            fileEnable : true,
            dateEnable :true,
            buttonLabel : "Generar Plano Consignaciones",
            centroOperativo: "202"
        },
        {
            typeForm: typeFormEnum.PlanoConsignacion,
            information: "Consignaciones Falabella",
            fileEnable : true,
            dateEnable :true,
            buttonLabel : "Generar Plano Consignaciones",
            centroOperativo: "201"
        },
        {
            typeForm: typeFormEnum.PlanoFacturacion,
            information: "Facturaciones VMI",
            fileEnable : true,
            dateEnable :true,
            buttonLabel : "Generar Plano Facturaciones VMI",
            centroOperativo: "202"
        }
    ]

    return (
        <div className="flex flex-col gap-y-5 items-center py-10 w-full flex-1 px-40">
            <h2 className="font-bold text-3xl text-left w-7xl">Planos</h2>
            <div className="w-7xl">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                >
                    {
                        dataForms.map((data, index) => {
                            return (
                                <AccordionItem key={"Accordion-" + data.information + "-" + index} value={'item-' + index}>
                                    <AccordionTrigger>{ data.information }</AccordionTrigger>
                                    <AccordionContent className="flex flex-col p-2 min-h-40 text-balance">
                                        <FormHook data={data}/>
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })
                    }
                </Accordion>
            </div>
        </div>
    )
}
