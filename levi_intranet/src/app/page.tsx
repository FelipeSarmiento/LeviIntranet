import Image from "next/image";
import {ChevronRightIcon} from "lucide-react";

export default function Home() {

    const shortcuts = [
        {
            title: "Impresión Codigos Barra",
            href: "/impresion-codigos-barra"
        },
        {
            title: "Requisiciones",
            href: "/impresion-codigos-barra"
        },
        {
            title: "Remisiones",
            href: "/impresion-codigos-barra"
        },
        {
            title: "Certificados",
            href: "/impresion-codigos-barra"
        },
    ]

  return (
    <div className="flex w-full px-40 py-20 gap-10 items-center justify-center">
      <div className="w-2/4 h-full flex flex-col items-center justify-center">
          <Image className="" src="/images/Levis-LogoEscalaGrises.png" width={350} height={350} alt="" />
          {/*<h2 className="font-extrabold text-5xl">Levi Strauss Intranet</h2>*/}
      </div>
      <div className="w-2/4 h-full flex flex-col space-y-10 px-10 items-center justify-center">
          <h2 className="text-3xl">
              ¡Bienvenido <span className="font-bold">Felipe Sarmiento</span>!
          </h2>
          <div className="w-full space-y-3">
              <h3>Accesos Directos</h3>
              {
                  shortcuts.map((shortcut, index) => (
                      <div key={`Shortcut-${shortcut.title}-${index}`} className="h-14 flex items-center justify-between font-bold px-10 border-2 rounded-md w-full">
                          <h4>{ shortcut.title }</h4>
                          <ChevronRightIcon/>
                      </div>
                  ))
              }
          </div>
      </div>
    </div>
  );
}
