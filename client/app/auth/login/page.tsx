'use client'

import { useState } from "react"
import { Button } from "../../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "@/app/components/ui/label"
import { redirect } from "next/navigation"
import Image from "next/image"

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false)

    const handleLoading = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            redirect("/")
        }, 2000)
    }
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    className="bg-white border-[1.5px] border-[#0000001f]"
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input className="bg-white border-[1.5px] border-[#0000001f]" id="password" type="password" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" onClick={handleLoading} disabled={isLoading}>
                        {isLoading && (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {isLoading ? "Processing…" : "Login"}
                    </Button>
                    <Button variant="outline" className="w-full bg-[#ffffff] flex justify-center items-center">
                        <Image src="/google.svg" alt="" width={20} height={20} />
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginPage
