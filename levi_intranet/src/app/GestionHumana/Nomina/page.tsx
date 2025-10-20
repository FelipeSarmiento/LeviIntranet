import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {FormHook} from "@/components/common/FormHook";
import {typeFormEnum} from "@/lib/enums/typeFormEnum";
import {DataFormHookInterface} from "@/lib/interfaces/_interfaces";

export default function Home() {

    const dataForms = [
        {
            typeForm: typeFormEnum.PlanoNomina,
            information: "Plano Nomina",
            companyEnable : true,
            documentTypeEnable: true,
            dateEnable: true,
            notesEnable: true,
            documentEnable: true,
            buttonLabel : "Generar Plano Nomina",
        },
        {
            typeForm: typeFormEnum.DocumentoOfima,
            information: "Cambiar Documento Ofima",
            companyEnable : true,
            documentEnable: true,
            newDocumentEnable: true,
            valorDocumentoEnable: true,
            buttonLabel : "Cambiar Consecutivo",
        },
    ] as DataFormHookInterface[]

    return (
        <div className="flex flex-col gap-y-5 items-center py-10 w-full flex-1 px-40">
            <h2 className="font-bold text-3xl text-left w-7xl">Nomina</h2>
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
