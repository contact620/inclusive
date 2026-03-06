export default function ToolboxPage() {
  const documents = [
    {
      title: "Dénoncer votre bail",
      description: "Modèle de lettre pour résilier votre bail commercial en respectant les délais légaux.",
      format: ".docx",
    },
    {
      title: "Rechercher un successeur",
      description: "Courrier type pour informer votre bailleur de votre recherche de repreneur.",
      format: ".docx",
    },
    {
      title: "Rechercher un sous-locataire",
      description: "Modèle d'annonce et de courrier pour trouver un sous-locataire pour vos bureaux.",
      format: ".docx",
    },
    {
      title: "Rédiger une proposition financière",
      description: "Template de proposition financière à adresser à un bailleur pour la location de bureaux.",
      format: ".docx",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl p-6 lg:p-10">
      <h1 className="text-2xl font-bold text-gray-900">Toolbox</h1>
      <p className="mt-2 text-gray-600">
        Modèles de documents utiles pour vos démarches immobilières.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {documents.map((doc) => (
          <div
            key={doc.title}
            className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-lg">
                📄
              </div>
              <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 uppercase">
                {doc.format}
              </span>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-gray-900">
              {doc.title}
            </h3>
            <p className="mt-1 flex-1 text-xs text-gray-500">
              {doc.description}
            </p>
            <button className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              ⬇ Télécharger
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
