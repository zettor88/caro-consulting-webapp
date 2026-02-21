import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
    title: "Caro Consulting | Consulting Boutique B2B: Rentabilidad & Control de Gestión",
    description: "Consultora financiera experta en maximizar el EBITDA del sector B2B. Implementamos estrategias efectivas de Pricing, FP&A y Business Intelligence.",
    metadataBase: new URL('https://caro-consulting-webapp.vercel.app'),
    openGraph: {
        title: "Caro Consulting | Rentabilidad, Pricing y Business Intelligence",
        description: "Diagnóstico, Estrategia Directiva y Control de Gestión. Deje de perder margen y transforme la complejidad operativa en rentabilidad predecible.",
        url: 'https://caro-consulting-webapp.vercel.app',
        siteName: 'Caro Consulting',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Caro Consulting - Estrategia Financiera B2B',
            },
        ],
        locale: 'es_CL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Caro Consulting | Estrategia Financiera Directiva",
        description: "Expertos en Pricing, Product Management y Data-Driven Control de Gestión B2B.",
        images: ['/og-image.png'],
    },
    keywords: ["Consultoría Financiera", "Pricing Strategy", "EBITDA", "Control de Gestión", "Product Management", "Business Intelligence", "PowerBI", "B2B", "Sector Industrial", "Consultora Boutique", "Chile"],
    authors: [{ name: "Sebastian Caro" }],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="scroll-smooth">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
