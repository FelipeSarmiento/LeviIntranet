import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Home() {
    return (
        <div className="w-full flex items-center justify-center">
            <Card className="w-full max-w-sm border-2 border-gray-500">
                <CardHeader>
                    <Button className="w-full pb-15 pt-10 mb-5 border-0">
                        <Image src="/images/Levis-Logo.png" width={150} height={150} alt="" />
                    </Button>
                    <CardTitle>Iniciar sesión en <span className="text-red-500 font-bold">Levi</span> Intranet</CardTitle>
                    <CardDescription>
                        Ingresa tus credenciales
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@levi.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Contraseña</Label>
                                </div>
                                <Input id="password" type="password" placeholder="**********" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Ingresar
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
