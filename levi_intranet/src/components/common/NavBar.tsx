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

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export function NavigationBar() {
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="">Inicio</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Gestión Documental</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="/GestionDocumental/Requisiciones">
                                        <div className="font-medium">Requisiciones</div>
                                        <div className="text-muted-foreground">
                                            <ul>
                                                <li>- Requisiciones Jumbo</li>
                                                <li>- Requisiciones Exito por Bodega (Daniela)</li>
                                                <li>- Requisiciones Exito por Pedido (Sebastian)</li>
                                            </ul>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                                <Separator className="my-1 bg-red-500" />
                                <NavigationMenuLink asChild>
                                    <Link href="/GestionDocumental/Planos">
                                        <div className="font-medium">Planos</div>
                                        <div className="text-muted-foreground">
                                            <ul>
                                                <li>- Plano Pedidos Jumbo</li>
                                                <li>- Plano Pedidos Falabella</li>
                                                <li>- Plano Consignaciones</li>
                                                <li>- Plano Facturación VMI</li>
                                            </ul>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                                <Separator className="my-1 bg-red-500" />
                                <NavigationMenuLink asChild>
                                    <Link href="/GestionDocumental/Remisiones">
                                        <div className="font-medium">Remisiones</div>
                                        <div className="text-muted-foreground">
                                            <ul>
                                                <li>- Remisiones Jumbo</li>
                                            </ul>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Gestión Humana</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="/GestionHumana/Nomina">
                                        <div className="font-medium">Nómina</div>
                                        <div className="text-muted-foreground">
                                            <ul>
                                                <li>- Plano Nómina</li>
                                                <li>- Cambiar Número Documento Ofima</li>
                                            </ul>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                                <Separator className="my-1 bg-red-500" />
                                <NavigationMenuLink asChild>
                                    <Link href="/GestionHumana/Bonificaciones">
                                        <div className="font-medium">Bonificaciones</div>
                                        <div className="text-muted-foreground">
                                            <ul>
                                                <li>- Ingreso Bonificaciones</li>
                                                <li>- Liquidar Bonificaciones</li>
                                            </ul>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                                <Separator className="my-1 bg-red-500" />
                                <NavigationMenuLink asChild>
                                    <Link href="/GestionHumana/Certificados">
                                        <div className="font-medium">Certificados</div>
                                        <div className="text-muted-foreground">
                                            <ul>
                                                <li>- Certificados Laborales Activos</li>
                                                <li>- Certificados Laborales Retirados</li>
                                                <li>- Vencimiento de Contratos</li>
                                            </ul>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Etiquetas DC</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="/Etiquetas/ICB">
                                        <div className="font-medium">Impresión Códigos de Barra</div>
                                    </Link>
                                </NavigationMenuLink>
                                <Separator className="my-1 bg-red-500" />
                                <NavigationMenuLink asChild>
                                    <Link href="/Etiquetas/IPS">
                                        <div className="font-medium">Impresión Precios desde Siesa</div>
                                    </Link>
                                </NavigationMenuLink>
                                <Separator className="my-1 bg-red-500" />
                                <NavigationMenuLink asChild>
                                    <Link href="/Etiquetas/ICBOPC">
                                        <div className="font-medium">Impresión Códigos de Barra OPC</div>
                                    </Link>
                                </NavigationMenuLink>
                                <Separator className="my-1 bg-red-500" />
                                <NavigationMenuLink asChild>
                                    <Link href="/Etiquetas/IECE">
                                        <div className="font-medium">Impresión Etiquetas y Precios Manual</div>
                                    </Link>
                                </NavigationMenuLink>
                                <Separator className="my-1 bg-red-500" />
                                <NavigationMenuLink asChild>
                                    <Link href="/Etiquetas/ICBE">
                                        <div className="font-medium">Impresión Códigos de Barra desde Excel</div>
                                    </Link>
                                </NavigationMenuLink>
                                <Separator className="my-1 bg-red-500" />
                                <NavigationMenuLink asChild>
                                    <Link href="/Etiquetas/Ubicaciones">
                                        <div className="font-medium">Impresión Ubicaciones</div>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

function ListItem({
                      title,
                      children,
                      href,
                      ...props
                  }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
