const obj = {
  title: "Générateur de contenu",
  desc: "Créez du contenu sur le sujet de votre choix",
  icon: <i className="fa-solid fa-lightbulb fa-xl"></i>,

  colorCombo: 4,

  to: "/tools/content-generator",
  api: "/tools/content-generator",

  output: {
		title: "Contenu",
		desc: "Voici le contenu généré par l'IA",
	},

  prompts: [
    {
      title: "Le sujet ou la problématique de votre contenu",
      attr: "subject",
      placeholder: "La place de la science durant la Seconde Guerre mondiale",
      type: "input",
      minLength: 1,
      maxLength: 100,
      required: true,
      example: "L'intelligence artificielle",
    },
    {
      title: "Les éléments à inclure",
      attr: "elements",
      placeholder: "Les éléments que vous souhaitez voir dans votre contenu",
      type: "textarea",
      maxLength: 200,
      required: false,
      example: "",
    },
  ],
  example: {
    output: `L'intelligence artificielle (IA) est un domaine de l'informatique qui vise à créer des machines capables de réfléchir, d'apprendre, de résoudre des problèmes et de prendre des décisions de manière autonome, comme le ferait un être humain. Elle est généralement considérée comme l'une des technologies les plus transformantes et les plus prometteuses du siècle.

Grâce aux progrès de la puissance de calcul informatique, de la connectivité internet, du big data et de la capacité d'apprentissage profond des réseaux de neurones, l'IA est devenue un domaine dynamique et en constante évolution, permettant des avancées rapides dans de nombreux secteurs tels que la santé, l'industrie, la finance, les transports, l'énergie, la sécurité, les jeux vidéo et bien d'autres.

L'IA se décline en plusieurs formes, notamment les systèmes de reconnaissance d'image, les assistants virtuels, les chatbots, les systèmes de recommandation, les algorithmes de trading, les robots autonomes, les véhicules autonomes et les drones. Tous ces dispositifs sont conçus pour effectuer des tâches avec une grande précision, efficacité et polyvalence.

Cependant, l'IA pose également des questions cruciales pour la société, notamment la protection des données personnelles, le respect de la vie privée, l'éthique, la sécurité, la responsabilité civile, la réglementation et l'impact sur l'emploi. Les effets de l'IA sur les emplois traditionnels sont notamment associés à la destruction de certains emplois manuels.

Par conséquent, une réglementation appropriée et une stratégie publique plus large sont essentielles pour encadrer le développement de l'IA, afin de maximiser ses avantages pour l'humanité tout en minimisant les coûts et les risques.  En conclusion, l'IA est une technologie extrêmement prometteuse qui a le potentiel de transformer radicalement notre vie sociale, économique et culturelle à l'échelle mondiale. Il est essentiel de réfléchir à ce que cette technologie représente pour l'avenir et de travailler ensemble pour assurer une utilisation responsable, éthique et efficace.
      `,
  },
};

export default obj;
