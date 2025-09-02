'use client'

import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter } from "next/navigation"
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
import Image from "next/image"
import { useLogin } from '@/app/hooks/auth/UseLogin'

const LoginPage = () => {
    const router = useRouter()
    const { state, dispatch, handleLogin } = useLogin(() => router.push('/'))

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-4 px-4">
            <Image src={"/images/logo-wgs.svg"} alt="logo WGS" width={140} height={140} />
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {state.generalError && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                            {state.generalError}
                        </div>
                    )}
                    <form onSubmit={handleLogin}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    className="bg-accent border-[1.5px] border-[#0000001f] text-foreground"
                                    value={state.email}
                                    onChange={(e) => {
                                        dispatch({ type: "SET_EMAIL", payload: e.target.value })
                                    }}
                                />
                                {state.emailError && (
                                    <p className="text-sm text-red-600 mt-1">{state.emailError}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={state.showPassword ? "text" : "password"}
                                        className="bg-accent border-[1.5px] border-[#0000001f] pr-10 text-foreground"
                                        value={state.password}
                                        placeholder="Type your password"
                                        onChange={(e) => dispatch({ type: "SET_PASSWORD", payload: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => dispatch({ type: "TOGGLE_SHOW_PASSWORD" })}
                                        className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 text-sm"
                                        tabIndex={-1}
                                    >
                                        {state.showPassword ? (
                                            <i className="bi bi-eye-slash-fill" />
                                        ) : (
                                            <i className="bi bi-eye-fill" />
                                        )}
                                    </button>
                                </div>
                                {state.passwordError && (
                                    <p className="text-sm text-red-600 mt-1">{state.passwordError}</p>
                                )}
                            </div>
                        </div>

                        <CardFooter className="flex-col gap-3 mt-6 px-0">
                            <Button type="submit" className="w-full text-foreground dark:bg-secondary" disabled={state.isLoading}>
                                {state.isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z" />
                                        </svg>
                                        Processing…
                                    </>
                                ) : 'Login'}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage