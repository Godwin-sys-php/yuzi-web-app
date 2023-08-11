const obj = {
  title: "Traduction",
  desc: "Traduisez le texte de votre choix dans la langue souhaité",
  icon: <i className="fa-solid fa-language fa-xl"></i>,

  colorCombo: 4,

  to: "/tools/traduction",
  api: "/tools/traduction",

  output: {
    title: "Traduction",
    desc: "Voici la traduction trouvé par l'IA",
  },

  prompts: [
    {
      title: "La langue cible",
      attr: "langage",
      placeholder: "Français, Anglais, Espagnol, Mandarin, etc.",
      type: "input",
      minLength: 1,
      maxLength: 150,
      required: true,
      example: "Anglais",
    },
    {
      title: "Texte",
      attr: "text",
      placeholder: "Le texte à traduire",
      type: "textarea",
      minLength: 1,
      maxLength: 1000,
      required: true,
      example:
        `Les habitants de Paris sont d'une curiosité qui va jusqu'à l'extravagance. Lorsque j'arrivai, je fus regardé comme si j'avais été envoyé du ciel : vieillards, hommes, femmes, enfants, tous voulaient me voir.`,
    },
  ],
  example: {
    output: `The inhabitants of Paris are so curious that it borders on extravagance. When I arrived, I was looked upon as if I had come from heaven: old men, men, women, children, all wanted to see me.`,
    // Icon: RefreshIcon,
    // color: "blue",
  },
};

export default obj;
