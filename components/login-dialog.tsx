"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog"
import * as Clerk from "@clerk/elements/common"
import * as SignIn from "@clerk/elements/sign-in"

export default function LoginDialog({ children }: { children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-sm md:max-w-md">
                <DialogHeader>
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                </DialogHeader>
                <SignIn.Root>
                    <SignIn.Step name="start">
                        <Clerk.GlobalError className="block text-sm text-red-400" />
                        <div className="flex  flex-col gap-2 items-center justify-center">
                            <Clerk.Connection name="github">
                                <Button>
                                    <svg
                                        width="19"
                                        className="mr-1.5"
                                        height="20"
                                        viewBox="0 0 21 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_32_31)">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M10.4687 0C4.67979 0 0 4.58333 0 10.2535C0 14.786 2.9985 18.6227 7.15821 19.9806C7.67829 20.0827 7.86879 19.76 7.86879 19.4885C7.86879 19.2508 7.85164 18.436 7.85164 17.5871C4.9395 18.1983 4.33307 16.3648 4.33307 16.3648C3.86507 15.1765 3.17164 14.871 3.17164 14.871C2.2185 14.2429 3.24107 14.2429 3.24107 14.2429C4.29836 14.3108 4.85314 15.2954 4.85314 15.2954C5.78893 16.8571 7.29686 16.4158 7.9035 16.1442C7.99007 15.4821 8.26757 15.0238 8.56221 14.7692C6.23957 14.5315 3.79586 13.6488 3.79586 9.71021C3.79586 8.58979 4.21157 7.67313 4.87029 6.96021C4.76636 6.70563 4.40229 5.65292 4.97443 4.24396C4.97443 4.24396 5.85836 3.97229 7.85143 5.29646C8.70473 5.07201 9.58473 4.95784 10.4687 4.95688C11.3526 4.95688 12.2537 5.07583 13.0858 5.29646C15.0791 3.97229 15.963 4.24396 15.963 4.24396C16.5351 5.65292 16.1709 6.70563 16.0669 6.96021C16.743 7.67313 17.1416 8.58979 17.1416 9.71021C17.1416 13.6488 14.6979 14.5144 12.3579 14.7692C12.7393 15.0917 13.0684 15.7027 13.0684 16.6704C13.0684 18.0454 13.0513 19.149 13.0513 19.4883C13.0513 19.76 13.242 20.0827 13.7619 19.9808C17.9216 18.6225 20.9201 14.786 20.9201 10.2535C20.9372 4.58333 16.2403 0 10.4687 0Z"
                                                fill="white"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_32_31">
                                                <rect width="21" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Login with Github
                                </Button>
                            </Clerk.Connection>
                            <div className="text-sm">
                                Don't have an account? <Link href="/sign-up">Sign up</Link>
                            </div>
                            {/*<Clerk.Connection name="discord">
                                <Button>
                                    <svg
                                        width="20"
                                        height="20"
                                        className="mr-1.5"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16.9419 3.52317C15.6473 2.91744 14.263 2.47723 12.8157 2.22656C12.638 2.5479 12.4304 2.98012 12.2872 3.32394C10.7487 3.09258 9.22445 3.09258 7.7143 3.32394C7.57116 2.98012 7.3588 2.5479 7.17947 2.22656C5.73067 2.47723 4.3448 2.91906 3.05016 3.52638C0.438869 7.47238 -0.269009 11.3204 0.0849305 15.1137C1.81688 16.4071 3.49534 17.1928 5.14548 17.7069C5.55291 17.1462 5.91628 16.5501 6.22931 15.9219C5.63313 15.6954 5.06211 15.4158 4.52256 15.0912C4.6657 14.9852 4.80571 14.8743 4.94098 14.7603C8.23183 16.2995 11.8074 16.2995 15.0589 14.7603C15.1958 14.8743 15.3358 14.9852 15.4774 15.0912C14.9362 15.4174 14.3637 15.6969 13.7675 15.9235C14.0805 16.5501 14.4423 17.1478 14.8513 17.7085C16.503 17.1944 18.183 16.4087 19.915 15.1137C20.3303 10.7163 19.2056 6.90361 16.9419 3.52317ZM6.67765 12.7809C5.68977 12.7809 4.87963 11.8586 4.87963 10.7355C4.87963 9.61247 5.67247 8.68864 6.67765 8.68864C7.68285 8.68864 8.49297 9.61085 8.47567 10.7355C8.47723 11.8586 7.68285 12.7809 6.67765 12.7809ZM13.3223 12.7809C12.3344 12.7809 11.5243 11.8586 11.5243 10.7355C11.5243 9.61247 12.3171 8.68864 13.3223 8.68864C14.3275 8.68864 15.1376 9.61085 15.1203 10.7355C15.1203 11.8586 14.3275 12.7809 13.3223 12.7809Z"
                                            fill="#5865F2"
                                        />
                                    </svg>
                                    Login with Discord
                                </Button>
                            </Clerk.Connection>*/}
                        </div>
                    </SignIn.Step>
                </SignIn.Root>
            </DialogContent>
        </Dialog>
    )
}
