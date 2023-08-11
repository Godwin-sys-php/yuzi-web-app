const obj = {
  title: "Fiche de révision",
  desc: "Créez une fiche de révision sur le sujet souhaité",
  icon: <i className="fa-solid fa-graduation-cap fa-xl"></i>,

  colorCombo: 2,

  to: "/tools/revision",
  api: "/tools/revision",

  output: {
    title: "Fiche de révision",
    desc: "Voici la fiche de révision générée par l'IA",
  },
  prompts: [
    {
      title: "Le sujet de votre fiche de révision",
      attr: "subject",
      placeholder: "La première guerre mondiale",
      type: "input",
      minLength: 3,
      maxLength: 100,
      required: true,
      example: "Le système immunitaire",
    },
  ],
  example: {
    output: `Introduction:
Le système immunitaire est un ensemble de mécanismes physiologiques qui permettent à l'organisme de se défendre contre les agents pathogènes tels que les bactéries, les virus, les parasites et certains types de cellules cancéreuses. Le système immunitaire est divisé en deux types : l'immunité innée et l'immunité acquise.

I. L'immunité innée 
L'immunité innée est la première ligne de défense naturelle contre les agents pathogènes. Elle est constituée de différents types de cellules qui vont détecter et tuer les agents infectieux. Les leucocytes, globules blancs présents dans le sang, sont les principaux acteurs de cette réponse immunitaire innée.

II. L'immunité acquise 
L'immunité acquise est activée lorsque l'immunité innée n'a pas réussi à détruire l'agent pathogène. Cette immunité adaptative est spécifique à l'agent pathogène et peut-être divisée en deux catégories, l'immunité humorale et l'immunité cellulaire :

a. L'immunité humorale est médiée par des anticorps produits par les cellules B. Les anticorps vont se lier spécifiquement aux antigènes des agents pathogènes et les neutraliser.

b. L'immunité cellulaire est médiée par les lymphocytes T. Les lymphocytes T vont reconnaître et détruire les cellules infectées par les agents pathogènes ainsi que les agents pathogènes eux-mêmes.

III. La mémoire immunitaire 
Après la résolution de l'infection, une population de cellules mémoire est laissée dans l'organisme. Ces cellules mémoire permettent une réponse plus rapide et plus efficace si l'organisme est de nouveau exposé au même agent pathogène.

Conclusion:
Le système immunitaire est essentiel pour maintenir la santé de l'organisme. L'immunité innée est la première ligne de défense rapide contre les agents pathogènes tandis que l'immunité acquise est plus spécifique et crée une mémoire immunitaire pour une réponse plus rapide et plus efficace si l'organisme est de nouveau exposé à l'agent pathogène.
      `,
  },
};

export default obj;
