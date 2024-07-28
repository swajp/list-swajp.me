"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.seznam.cz",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
})

export async function contribute(
    prevState: {
        message: string
    },
    formData: FormData
) {
    const schema = z.object({
        social: z.string().optional(),
        web: z.string()
    })
    const parse = schema.safeParse({
        social: formData.get("social") as string,
        web: formData.get("web") as string
    })

    if (!parse.success) {
        return { message: "fail" }
    }

    const data = parse.data

    try {
        await transporter.sendMail({
            from: '"sender@swajp.me" <sender@swajp.me>',
            to: "me@swajp.me",
            subject: "New contribution",
            html: `
        <h2>Info</h2>
        <ul>
            <li>Social: ${data.social}</li>
            <li>Web: ${data.web}</li>
        <ul>
       
      `
        })

        revalidatePath("/")
        return { message: "ok" }
    } catch (e) {
        return { message: "fail" }
    }
}
