const obj = {
  title: "Résumeur",
  desc: "Analysez votre texte ou vos documents et transmettez les concepts importants sous forme de texte.",
  icon: <i className="fa-solid fa-compress fa-xl"></i>,

  colorCombo: 3,

  to: "/tools/summarize",
  api: "/tools/summarize",

  output: {
    title: "Résumeur",
    desc: "Voici le résumé écrit par l'IA",
  },
  prompts: [
    {
      title: "Contenu",
      attr: "content",
      value: "",
      placeholder: "La phrase ou le paragraphe que vous souhaitez résumer",
      type: "textarea",
      minLength: 1,
      maxLength: 600,
      required: true,
      example:
        "L'intelligence artificielle (IA) est un processus d'imitation de l'intelligence humaine qui repose sur la création et l'application d'algorithmes exécutés dans un environnement informatique dynamique. Son but est de permettre à des ordinateurs de penser et d'agir comme des êtres humains.",
    },
  ],
  example: {
    output:
      "L'intelligence artificielle est un processus qui permet aux ordinateurs de penser et d'agir comme des êtres humains en imitant leur intelligence grâce à des algorithmes exécutés dans un environnement informatique dynamique.",
  },
};

export default obj;
