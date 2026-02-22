import { BarChart3, Target, MonitorPlay, Layers, PieChart, CheckCircle } from "lucide-react";

export const SERVICES_DATA: Record<string, any> = {
    "pricing-estrategico": {
        title: "Pricing Estratégico & Gobernanza Comercial",
        subtitle: "Maximiza tu margen de contribución sin sacrificar volumen ni competitividad.",
        description: "El pricing es la palanca de rentabilidad más potente que tiene una empresa. Una mejora del 1% en el precio suele tener un impacto mucho mayor en el resultado operativo que una mejora del 1% en costos o volumen. Ayudamos a empresas B2B a profesionalizar su estrategia de precios y a instalar una gobernanza que evite la fuga de márgenes.",
        icon: PieChart,
        features: [
            "Definición de Política de Precios y Escalas de Descuento.",
            "Segmentación Estratégica de Clientes y Canales.",
            "Modelos de Rentabilidad por Producto/Servicio (Net Price Waterfall).",
            "Instalación de Niveles de Autorización y Flujos de Aprobación.",
            "Análisis de Elasticidad y Benchmarking de Mercado.",
            "Detección de Costos Ocultos y Fugas en la Transacción (Leakage Control)."
        ],
        benefits: [
            "Aumento inmediato del margen de contribución.",
            "Eliminación de descuentos arbitrarios.",
            "Mayor control sobre la fuerza de ventas.",
            "Claridad total sobre qué productos y clientes realmente dejan dinero."
        ],
        color: "blue"
    },
    "control-gestion": {
        title: "Control de Gestión Externo (PYMEs)",
        subtitle: "Visibilidad ejecutiva y control financiero de alto nivel, sin el costo de una estructura fija.",
        description: "Muchas empresas crecen hasta un punto donde el dueño ya no puede controlarlo todo de memoria. Nuestro servicio de Control de Gestión Externo actúa como tu brazo financiero derecho, organizando la información mes a mes para que tomes decisiones basadas en realidades, no en intuiciones.",
        icon: BarChart3,
        features: [
            "Diseño e Implementación de KPIs Financieros y Operativos.",
            "Cierre de Gestión Mensual con Análisis de Desviaciones (Real vs Presupuesto).",
            "Elaboración de Presupuesto Anual y Forecasts Dinámicos.",
            "Reuniones de Comité de Gestión para análisis de resultados.",
            "Análisis de Flujo de Caja y Capital de Trabajo (Cash Flow Management).",
            "Profesionalización de la Reportería para Directorios o Bancos."
        ],
        benefits: [
            "Decisiones basadas en datos frescos, no en el pasado.",
            "Anticipación de faltantes de caja o desviaciones de gastos.",
            "Orden administrativo y financiero de clase mundial.",
            "Paz mental para el dueño/gerente general."
        ],
        color: "slate"
    },
    "implementacion-kpis": {
        title: "Implementación de KPIs e Indicadores",
        subtitle: "Define y mide lo que realmente mueve la aguja de tu negocio.",
        description: "Recibir docenas de reportes no es gestión. Gestión es mirar los 5 o 7 indicadores clave que determinan el éxito de tu empresa. Te ayudamos a limpiar el ruido, definir métricas estandarizadas y establecer los rituales necesarios para que tu equipo actúe sobre los datos.",
        icon: Target,
        features: [
            "Definición de Árbol de KPIs (Métricas Financieras, Comerciales y Operativas).",
            "Estandarización de Definiciones (Diccionario de Métricas).",
            "Diseño de Scorecards por Área y Nivel de Responsabilidad.",
            "Establecimiento de Rituales de Seguimiento (Weekly / Monthly Reviews).",
            "Vinculación de KPIs con Metas y Sistemas de Incentivos.",
            "Capacitación en Cultura Data-Driven para equipos directivos."
        ],
        benefits: [
            "Alineación de toda la empresa hacia los mismos objetivos.",
            "Enfoque total en las áreas de bajo performance.",
            "Eliminación de discusiones sobre 'quién tiene el dato correcto'.",
            "Mejora continua basada en medición objetiva."
        ],
        color: "blue"
    },
    "business-intelligence": {
        title: "Business Intelligence (Power BI)",
        subtitle: "Transforma tus datos crutos en tableros de control ejecutivos y 100% automatizados.",
        description: "Si tu equipo gasta más tiempo haciendo Excel que analizando la estrategia, tienes un problema de eficiencia. Implementamos soluciones de Power BI que se conectan directamente a tu ERP (o archivos) para entregarte tableros dinámicos en tiempo real.",
        icon: MonitorPlay,
        features: [
            "Diseño de Dashboards Ejecutivos e Interactivos en Power BI.",
            "Automatización de Extracción, Transformación y Carga de Datos (ETL).",
            "Consolidación de múltiples fuentes de datos (ERP, CRM, Excel, SQL).",
            "Modelamiento de Datos optimizado para consultas rápidas.",
            "Configuración de Alertas automáticas ante variaciones críticas.",
            "Acceso Mobile para que lleves tu empresa en el celular."
        ],
        benefits: [
            "Ahorro drástico de horas hombre en generación de reportes.",
            "Información disponible 24/7 sin depender de nadie.",
            "Identificación visual inmediata de tendencias y anomalías.",
            "Capacidad de hacer 'drill-down' hasta el nivel de transacción."
        ],
        color: "slate"
    },
    "control-proyectos": {
        title: "Control Financiero de Proyectos",
        subtitle: "Asegura la rentabilidad de cada obra o contrato con un control de costos riguroso.",
        description: "En negocios de proyectos, la utilidad se gana en la planificación y se pierde en la ejecución. Proporcionamos las herramientas y la metodología para monitorear el avance financiero, detectar desviaciones de costo y asegurar que el margen proyectado se convierta en caja real.",
        icon: Layers,
        features: [
            "Control de Presupuesto Base vs. Costos Reales incurridos.",
            "Gestión del EAC (Estimate at Completion) para proyectar el resultado final.",
            "Monitoreo de Curva S y Productividad financiera.",
            "Control de Variaciones, Adicionales y Reclamos de Obra.",
            "Análisis de Resultado a Término por proyecto y portafolio.",
            "Implementación de Metodología de Valor Ganado (EVM) simplificada."
        ],
        benefits: [
            "Evita sorpresas de rentabilidad al finalizar el proyecto.",
            "Mayor disciplina financiera en el equipo de terreno.",
            "Optimización del flujo de caja por frente de trabajo.",
            "Detección temprana de ineficiencias operativas."
        ],
        color: "blue"
    }
};
