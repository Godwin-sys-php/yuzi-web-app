const obj = {
  title: "Correction de texte",
  desc: "Vérifier si votre texte ne comprends aucune faute et les corriges",
  icon: <i className="fa-solid fa-check-to-slot fa-xl"></i>,

  colorCombo: 2,

  to: "/tools/correction",
  api: "/tools/correction",

  output: {
    title: "Texte",
    desc: "Voici le texte corrigé généré par l'IA",
  },

  prompts: [
    {
      title: "Texte",
      attr: "text",
      placeholder: "Le texte que vous souhaitez faire vérifier",
      type: "textarea",
      minLength: 1,
      maxLength: 600,
      required: true,
      example:
        "L'intelligence artificielle (IA) est un processus d'imitation de l'intelligence humaine qui repose sur la création et l'application d'algorithmes exécutés dans un environnement informatique dynamique. Son bute est de permettre à des ordinateurs de penser et d'agir comme des êtres humains.",
    },
  ],

  example: {
    output:
      "L'intelligence artificielle (IA) est un processus d'imitation de l'intelligence humaine qui repose sur la création et l'application d'algorithmes exécutés dans un environnement informatique dynamique. Son but est de permettre à des ordinateurs de penser et d'agir comme des êtres humains.",
  },
};

export default obj;
