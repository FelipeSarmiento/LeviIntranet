import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {FormHook} from "@/components/common/FormHook";
import {typeFormEnum} from "@/lib/enums/typeFormEnum";
import {DataFormHookInterface} from "@/lib/interfaces/_interfaces";
import {getAllCentroCostos} from "@/lib/hooks/api/ofimaBackEndAPI";

export default async function Home() {

    const centroCostosOptions = await getAllCentroCostos();

    const dataForms = [
        {
            typeForm: typeFormEnum.CertificadoLaboral,
            information: "Certificado Laboral",
            companyEnable : true,
            cartaTypeEnable: true,
            cartaTypeOptions: [
                {
                    value: "sinDestinatario",
                    label: "Sin Destinatario"
                },
                {
                    value: "conDestinatario",
                    label: "Con Destinatario"
                }
            ],
            placeholderCartaTypeOptions: "Destinatario",
            documentEnable: true,
            buttonLabel : "Generar certificado",
        },
        {
            typeForm: typeFormEnum.CertificadoRetirado,
            information: "Certificado Retirado",
            companyEnable : true,
            funcionesEnable: true,
            historialContratosEnable: true,
            documentEnable: true,
            buttonLabel : "Generar certificado",
        },
        {
            typeForm: typeFormEnum.VencimientosContratos,
            information: "Vencimiento Contratos",
            companyEnable : true,
            centroCostosEnable: true,
            centroCostosOptions,
            documentEnable: true,
            buttonLabel : "Buscar",
        },
    ] as DataFormHookInterface[]

    return (
        <div className="flex flex-col gap-y-5 items-center py-10 w-full flex-1 px-40">
            <h2 className="font-bold text-3xl text-left w-7xl">Certificados</h2>
            <div className="w-full">
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
