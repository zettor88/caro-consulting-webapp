import { BarChart3, Target, MonitorPlay, Layers, PieChart, CheckCircle, Search, ClipboardList, TrendingUp, Zap } from "lucide-react";

export const SERVICES_DATA: Record<string, any> = {
    "pricing-estrategico": {
        title: "Pricing Estratégico & Gobernanza Comercial",
        subtitle: "Maximiza tu margen de contribución sin sacrificar volumen ni competitividad.",
        description: "El pricing es la palanca de rentabilidad más potente que tiene una empresa. Una mejora del 1% en el precio suele tener un impacto mucho mayor en el resultado operativo que una mejora del 1% en costos o volumen. Ayudamos a empresas B2B a profesionalizar su estrategia de precios, eliminar la discrecionalidad en los descuentos e instalar una gobernanza que evite la fuga de márgenes en cada transacción.",
        icon: PieChart,
        howWeHelp: [
            {
                title: "Diagnóstico de Fugas",
                description: "Analizamos el 'Price Waterfall' para identificar dónde se está perdiendo dinero: desde descuentos comerciales no controlados hasta costos logísticos no recuperados."
            },
            {
                title: "Política de Precios",
                description: "Definimos estructuras de precios claras por segmento de cliente y volumen, estableciendo reglas de juego que la fuerza de ventas pueda defender con confianza."
            },
            {
                title: "Gobernanza Comercial",
                description: "Instalamos flujos de aprobación y niveles de autoridad para que los descuentos excepcionales sean realmente la excepción y no la regla."
            },
            {
                title: "Monitor de Rentabilidad",
                description: "Implementamos herramientas de seguimiento en tiempo real para evaluar el impacto de las alzas de costos en tus márgenes y reaccionar a tiempo."
            }
        ],
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
        process: [
            "Entendimiento de la estrategia de negocio y posicionamiento.",
            "Análisis masivo de transacciones históricas y rentabilidad.",
            "Diseño de la nueva arquitectura de precios y descuentos.",
            "Implementación de herramientas de control y monitoreo."
        ],
        color: "blue"
    },
    "control-gestion": {
        title: "Control de Gestión Externo (PYMEs)",
        subtitle: "Visibilidad ejecutiva y control financiero de alto nivel, sin el costo de una estructura fija.",
        description: "Muchas empresas crecen hasta un punto donde el dueño ya no puede controlarlo todo de memoria. Nuestro servicio de Control de Gestión Externo actúa como tu brazo financiero derecho, organizando la información mes a mes para que tomes decisiones basadas en realidades financieras y operativas, asegurando que tu crecimiento sea rentable y sostenible.",
        howWeHelp: [
            {
                title: "Análisis Real vs Plan",
                description: "Realizamos un cierre de gestión mensual riguroso, comparando tus resultados reales contra el presupuesto y explicando las causas raíz de las desviaciones."
            },
            {
                title: "Visibilidad de Caja",
                description: "No solo miramos la utilidad, sino la caja. Proyectamos tus flujos para que nunca te veas sorprendido por faltantes de liquidez en momentos críticos."
            },
            {
                title: "Fijación de Metas",
                description: "Ayudamos a definir objetivos claros para cada área de la empresa, alineando los incentivos con los resultados que realmente importan."
            },
            {
                title: "Apoyo en la Estrategia",
                description: "Participamos en tus comités de gestión como un asesor objetivo, aportando una visión financiera que complementa la operación diaria."
            }
        ],
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
        process: [
            "Levantamiento de la situación financiera y administrativa actual.",
            "Definición del modelo de presupuesto y KPIs clave.",
            "Ejecución del primer ciclo de cierre y reporte mensual.",
            "Acompañamiento continuo en la toma de decisiones estratégicas."
        ],
        color: "slate"
    },
    "implementacion-kpis": {
        title: "Implementación de KPIs e Indicadores",
        subtitle: "Define y mide lo que realmente mueve la aguja de tu negocio.",
        description: "Recibir docenas de reportes no es gestión. Gestión es mirar los pocos indicadores clave que determinan la salud y el futuro de tu empresa. Te ayudamos a limpiar el ruido, definir métricas estandarizadas por área y establecer los rituales de seguimiento necesarios para que tu equipo actúe sobre los datos de forma proactiva.",
        howWeHelp: [
            {
                title: "Árbol de Indicadores",
                description: "Conectamos los indicadores operativos (el cómo) con los financieros (el resultado), para que veas cómo cada acción impacta en la última línea."
            },
            {
                title: "Estandarización",
                description: "Creamos un diccionario de métricas único para que toda la empresa hable el mismo idioma y se acaben las discusiones sobre cuál dato es el correcto."
            },
            {
                title: "Tableros de Mando",
                description: "Diseñamos visualizaciones que permiten detectar problemas a simple vista, antes de que se conviertan en crisis financieras o comerciales."
            },
            {
                title: "Rituales de Seguimiento",
                description: "Instalamos la disciplina de revisión de KPIs en tu equipo, enseñándoles a analizar variaciones y proponer planes de acción concretos."
            }
        ],
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
        process: [
            "Entrevistas con stakeholders para identificar dolores y metas.",
            "Selección y definición técnica de los KPIs críticos.",
            "Diseño visual de los tableros y reportes de gestión.",
            "Puesta en marcha de los rituales de revisión periódica."
        ],
        color: "blue"
    },
    "business-intelligence": {
        title: "Business Intelligence (Power BI)",
        subtitle: "Transforma tus datos crutos en tableros de control ejecutivos y 100% automatizados.",
        description: "Si tu equipo gasta más tiempo 'picando piedra' en Excel que analizando la estrategia, tienes un problema de eficiencia operativa. Implementamos soluciones de Power BI que automatizan la recolección de datos desde cualquier fuente (ERP, CRM, Excel) para entregarte información visual, dinámica y accionable en segundos.",
        howWeHelp: [
            {
                title: "Automatización de Datos",
                description: "Eliminamos las tareas manuales de extracción y consolidación de datos, permitiendo que tu equipo se enfoque en el análisis y no en la carpintería de reportes."
            },
            {
                title: "Visualización Avanzada",
                description: "Diseñamos dashboards que cuentan una historia, permitiéndote identificar tendencias, anomalías y oportunidades de mejora de forma intuitiva."
            },
            {
                title: "Integración Total",
                description: "Conectamos fuentes de datos dispersas en una única verdad centralizada, asegurando consistencia y rapidez en la entrega de información."
            },
            {
                title: "Acceso en Tiempo Real",
                description: "Configuramos accesos seguros desde cualquier dispositivo, para que tengas el control de tu empresa en la palma de tu mano, estés donde estés."
            }
        ],
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
        process: [
            "Auditoría de las fuentes de datos y calidad de la información.",
            "Desarrollo del modelo de datos y procesos de automatización.",
            "Maquetación y validación de los tableros con los usuarios finales.",
            "Despliegue, capacitación y soporte de la herramienta."
        ],
        color: "slate"
    },
    "control-proyectos": {
        title: "Control Financiero de Proyectos",
        subtitle: "Asegura la rentabilidad de cada obra o contrato con un control de costos riguroso.",
        description: "En industrias basadas en proyectos (construcción, ingeniería, servicios complejos), la utilidad real se decide en la ejecución diaria. Proporcionamos la metodología y el control necesario para monitorear el avance financiero, detectar desviaciones de costo de forma temprana y asegurar que el margen proyectado se convierta realmente en resultados para la empresa.",
        howWeHelp: [
            {
                title: "Control de Costos",
                description: "Implementamos un seguimiento riguroso del Presupuesto vs Costo Real, identificando ahorros e ineficiencias línea por línea del proyecto."
            },
            {
                title: "Proyección Final (EAC)",
                description: "No miramos solo lo que ya pasó. Calculamos cuánto va a costar terminar el proyecto, permitiéndote tomar medidas correctivas antes de que sea tarde."
            },
            {
                title: "Gestión de Cambios",
                description: "Controlamos las variaciones, adicionales y reclamos de obra de forma estructurada, protegiendo el margen original frente a imprevistos."
            },
            {
                title: "Productividad Financiera",
                description: "Medimos el desempeño financiero del equipo de terreno, conectando el avance físico con el gasto para asegurar una ejecución eficiente."
            }
        ],
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
        process: [
            "Establecimiento de la estructura de control de costos (CBS).",
            "Automatización del reporte de avance financiero y proyecciones.",
            "Auditoría periódica de los estados de pago y desviaciones.",
            "Entrenamiento en mentalidad de control para jefes de proyecto."
        ],
        color: "blue"
    }
};
