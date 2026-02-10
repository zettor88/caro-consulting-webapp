import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
    title: "Caro Consulting | Pricing & Rentabilidad",
    description: "Consultora boutique especializada en Pricing, Product Management y Control de Gestión. Optimizamos tu rentabilidad con estrategias basadas en datos.",
    metadataBase: new URL('https://caro-consulting-webapp.vercel.app'),
    openGraph: {
        title: "Caro Consulting | Pricing & Rentabilidad",
        description: "Maximiza tu EBITDA con estrategias de Pricing y Control de Gestión avanzadas.",
        url: 'https://caro-consulting-webapp.vercel.app',
        siteName: 'Caro Consulting',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Caro Consulting - Estrategia Financiera',
            },
        ],
        locale: 'es_ES',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Caro Consulting | Estrategia Financiera",
        description: "Optimización de Pricing y Rentabilidad para el sector industrial.",
        images: ['/og-image.png'],
    },
    keywords: ["Consultoría Financiera", "Pricing Strategy", "EBITDA", "Control de Gestión", "Product Management", "B2B", "Industrial"],
    authors: [{ name: "Sebastian Caro" }],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
