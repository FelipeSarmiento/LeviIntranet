"use client"

import * as React from "react"
import Link from "next/link"


import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {Separator} from "@/components/ui/separator";

interface ModulesInterface {
    title: string,
    href: string,
    items?: string[]
}

interface ItemsInterface {
    title: string,
    modules: ModulesInterface[]
}

const itemsNavBar = [
    {
        title: "Wholesale",
        modules: [
            {
                title: "Requisiciones",
                href: "/Wholesale/Requisiciones",
                items: [
                    'Requisiciones Jumbo',
                    'Requisiciones Exito por Bodega',
                    'Requisiciones Exito por Pedido'
                ]
            },
            {
                title: "Planos",
                href: "/Wholesale/Planos",
                items: [
                    'Plano Jumbo',
                    'Plano Falabella',
                    'Consignaciones Jumbo',
                    'Consignaciones Falabella',
                    'Facturación VMI',
                ]
            },
            {
                title: "Pedidos*",
                href: "/Wholesale/Planos"
            }
        ]
    },
    {
        title: "Accounting",
        modules: [
            {
                title: "Activos Fijos",
                href: "/Accounting/ActivosFijos",
            }
        ]
    },
    {
        title: "NPIM",
        modules: [
            {
                title: "TPO a OCI",
                href: "/MPIM/TPOaOCI",
            },
            {
                title: "Pedidos Definitivos*",
                href: "/MPIM/TPOaOCI",
            }
        ]
    },
    {
        title: "Human Resources",
        modules: [
            {
                title: "Nomima",
                href: "/HumanResources/Nomina",
                items: [
                    'Plano Nomina*',
                    'Cambiar Documento Ofima*'
                ]
            },
            {
                title: "Bonificaciones",
                href: "/HumanResources/Bonificaciones",
                items: [
                    'Ingresar Bonificaciones',
                    'Liquidar Bonificaciones'
                ]
            },
            {
                title: "Certificados",
                href: "/HumanResources/Certificados",
                items: [
                    'Certificados Laborales Activos',
                    'Certificados Laborales Retirados',
                    'Contratos Proximos a Vencer'
                ]
            }
        ]
    },
    {
        title: "Retail",
        modules: [
            {
                title: "Impresión Códigos de Barra",
                href: "/DistributionAndLogistics/ICB",
            },
            {
                title: "Impresión Descuentos",
                href: "/DistributionAndLogistics/ICB",
            },
        ]
    },
    {
        title: "Distribution and Logistics",
        modules: [
            {
                title: "Remisiones Jumbo",
                href: "/DistributionAndLogistics/Remisiones",
            },
            {
                title: "Impresión Códigos de Barra",
                href: "/DistributionAndLogistics/ICB",
            },
            {
                title: "Impresión Precios desde Siesa",
                href: "/DistributionAndLogistics/IPS",
            },
            {
                title: "Impresión Códigos de Barra OPC",
                href: "/DistributionAndLogistics/ICBOPC",
            },
            {
                title: "Impresión Etiquetas y Precios Manual",
                href: "/DistributionAndLogistics/IECE",
            },
            {
                title: "Impresión Códigos de Barra desde Excel",
                href: "/DistributionAndLogistics/ICBE",
            },
            {
                title: "Impresión Ubicaciones",
                href: "/DistributionAndLogistics/Ubicaciones",
            },
        ]
    },
] as ItemsInterface[]

export function NavigationBar() {
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                {
                    itemsNavBar.map((item, index) => (
                        <NavigationMenuItem key={"ItemNav-" + index}>
                            <NavigationMenuTrigger>{ item.title }</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[300px] gap-4">
                                    <li>
                                        {
                                            item.modules.map((module, _index) => (
                                                <div key={`ItemNavModule${module.title}-${index}`}>
                                                    <NavigationMenuLink  asChild>
                                                        <Link href={ module.href }>
                                                            <div className="font-medium">{ module.title }</div>
                                                            <div className="text-muted-foreground">
                                                                <ul>
                                                                    {
                                                                        module?.items ? module?.items.map((item, __index) => (
                                                                            <li key={`ItemNav-${module.title}-${index}-${__index}`}>- { item }</li>
                                                                        )) : ''
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    {
                                                        _index < item.modules.length - 1 ? <Separator className="my-1 " /> : ''
                                                    }
                                                </div>
                                            ))
                                        }
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ))
                }
            </NavigationMenuList>
        </NavigationMenu>
    )
}