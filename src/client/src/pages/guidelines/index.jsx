import '../styles/css/tos.css';

const publishTos = [
    {
        title: 'No distribuyas contenido ilegal',
        description: 'Ni sexualices a niños de ningún modo',
        lines: [
            'No puedes compartir enlaces o archivos que contengan material sexual o violento en el que se vean envueltos menores de edad',
            'No puedes publicar documentos que atenten contra la propiedad intelectual u otros derechos de cualquier persona o entidad',
            'No amenaces contra la vida, integridad física o personal de nadie',
            'No compartas archivos o enlaces maliciosos con el fin de infectar a otros usuarios de la plataforma'
        ]
    },
    {
        title: 'Ahórrate el spam',
        description: 'Cuenta como spam:',
        lines: [
            'Contenido que no tenga relación con el concepto de NationSquad',
            'Documentos publicados más de una vez',
            'Documentos subidos posteriormente a su eliminación',
            'Información falsa o engañosa'
        ]
    }
]

const userGuidelines = [
    {
        title: 'No suplantes la identidad de ninguna persona u organización',
        description: '',
        lines: [
            'No te hagas pasar de forma maliciosa por nada ni por nadie',
            'No crees cuentas falsas',
            'No hagas uso de multicuentas si ya fuiste baneado del sitio'
        ],
        title: 'Respeta al staff',
        description: 'Nuestro equipo de staff trabaja continuamente para lograr la mejora de la comunidad',
        lines: [
            'No publiques de forma reiterativa documentos que ya han sido borrados previamente por nuestro staff',
            'No te hagas pasar por un staff de NationSquad',
            'No intentes engañar a nuestro staff haciendo denuncias falsas o reiterativas'
        ]
    }
]
export const Guidelines = () => (
    <div className="guidelines-container">
        <div>
            <h1>Directivas de NationSquad</h1>
            <div className="guidelines-info">
                <span>Última actualización: 21/3/2022</span>
                <p>Creamos NationSquad para darle un espacio público a distintos documentos basados en texto hechos por la comunidad hispanohablante.</p>
                <p>De antemano, NationSquad no se responsabiliza por si el contenido de algún documento publicado en nuestra web resulta ofensivo para algo o alguien.
                    <br />Asímismo, los documentos publicados dentro del sitio web no fueron escritos por NationSquad y la veracidad de los mismos quedan a criterio propio.</p>
                <p>
                    Por otro lado, como usuario de nation-squad.ga, debes de seguir ciertos lineamientos para asegurar la permanencia de la web.<br />Si encuentras a algún usuario violando alguna de estas normas, no dudes en reportarlo y nuestro equipo directivo llevará a cabo las acciones necesarias.
                </p>

            </div>
            <div className="guidelines-box">
                <h2>Al usar NationSquad...</h2>
                <div className="publish-tos">
                    <ul>
                        {
                            publishTos.map(({ title, description, lines }) => (
                                <li key={title}>
                                    <div>
                                        <div className="tos-titleanddescription flex">
                                            <p className="tos-title">{title}</p>

                                            <p className="tos-description">・{description}</p>
                                        </div>
                                        <ul>
                                            {
                                                lines.map((l, i) => (
                                                    <li key={i}>- {l}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>

                </div>
                <div className="publish-tos">
                    <ul>
                        {
                            userGuidelines.map(({ title, description, lines }) => (
                                <li key={title}>
                                    <div>
                                        <div className="tos-titleanddescription flex">
                                            <p className="tos-title">{title}</p>
                                            <p className="tos-description">・{description}</p>
                                        </div>
                                        <ul>
                                            {
                                                lines.map((l, i) => (
                                                    <li key={i}>- {l}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </li>

                            ))
                        }
                    </ul>
                </div>
                <div className="guidelines-info terms">
                    <p>
                        Si obvias el cumplimiento de alguna de estas normas, ten por seguro que tomaremos medidas que pueden, incluso, llegar a la eliminación de tu cuenta de NationSquad.
                    </p>
                </div>
                <p>
                    <em>att. nationsquad</em>
                </p>
            </div>
        </div>
    </div>
);
