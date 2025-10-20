import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {FormHook} from "@/components/common/FormHook";
import {typeFormEnum} from "@/lib/enums/typeFormEnum";
import {getAllQuincenas} from "@/lib/hooks/api/levisBackEndAPI";

export default async function Home() {

    const quincenas = await getAllQuincenas();

    const dataForms = [
        {
            typeForm: typeFormEnum.IngresoBonificacion,
            information: "Ingreso Bonificación",
            responsibleEnable: true,
            dateEnable: true,
            fileEnable: true,
            customButtons: true,
            quincenaEnable: true,
            quincenas,
            primaryButtonLabel: "Consultar",
            secondButtonLabel: "Listar Datos",
            buttonLabel : "Ingresar Bonificación",
        },
        {
            typeForm: typeFormEnum.LiquidacionBonificacion,
            information: "Liquidación Bonificación",
            responsibleEnable: true,
            dateEnable: true,
            fileEnable: true,
            customButtons: true,
            quincenaEnable: true,
            quincenas,
            primaryButtonLabel: "Consultar",
            secondButtonLabel: "Listar Datos",
            buttonLabel : "Liquidar Bonificación",
        }
    ]


    return (
        <div className="flex flex-col gap-y-5 items-center py-10 w-full flex-1 px-40">
            <h2 className="font-bold text-3xl text-left w-7xl">Bonificaciones</h2>
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
