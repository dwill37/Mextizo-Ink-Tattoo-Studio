import type { StaticImageData } from "next/image";

import img1 from "@/image/image_1.jpg";
import img2 from "@/image/image_2.jpg";
import img3 from "@/image/image_3.jpg";
import img4 from "@/image/image_4.jpg";
import img6 from "@/image/image_6_profil.jpg";
import img7 from "@/image/image_7.jpg";
import img8 from "@/image/image_8.jpg";
import img9 from "@/image/image_9.jpg";
import img10 from "@/image/image_10.jpg";
import img11 from "@/image/image_11.jpg";
import img12 from "@/image/image_12.jpg";
import img14 from "@/image/image_14.jpg";
import img15 from "@/image/image_15.jpg";

export type Photo = { id: string; src: StaticImageData; alt: string };

export const PHOTOS = {
  tigerChest: {
    id: "tigre-pecho",
    src: img1,
    alt: "Tatuaje de cabeza de tigre rugiendo en negro y gris sobre el pecho, con trazos gruesos y sombreado suave",
  },
  portraitsThighs: {
    id: "retratos-gluteos",
    src: img2,
    alt: "Dos retratos femeninos en realismo negro y gris sobre la parte trasera de ambos muslos, con grecas, luna y ornamentos",
  },
  lionCalf: {
    id: "leon-pantorrilla",
    src: img3,
    alt: "Tatuaje realista de león con corona y cruz alada en la pantorrilla, en negro y gris con ojos en tono turquesa",
  },
  christForearm: {
    id: "cristo-antebrazo",
    src: img4,
    alt: "Retrato realista de Cristo con corona de espinas en el antebrazo, en negro y gris, con tres cruces en la muñeca",
  },
  joel: {
    id: "joel",
    src: img6,
    alt: "Joel Ernesto, tatuador de Mextizo Ink, con playera negra y guantes negros, tomándose una foto en el espejo",
  },
  zeusThigh: {
    id: "rostro-muslo",
    src: img7,
    alt: "Tatuaje de rostro esculpido estilo estatua griega en el muslo, en negro y gris con cristales azules y una franja roja",
  },
  catrinaArm: {
    id: "catrina-brazo",
    src: img8,
    alt: "Media manga realista en el brazo: mujer con maquillaje de catrina, tocado prehispánico y trenza, en negro y gris",
  },
  aztecCalf: {
    id: "guerrero-pantorrilla",
    src: img9,
    alt: "Figura prehispánica con penacho de plumas y cuerpo esquelético en la pantorrilla, en negro y gris",
  },
  dragonArm: {
    id: "dragon-brazo",
    src: img10,
    alt: "Dragón con escamas y fauces abiertas sobre el hombro y brazo, sombreado en negro y gris",
  },
  pandaArm: {
    id: "panda-brazo",
    src: img11,
    alt: "Cabeza de panda mitad geométrica y mitad realista en el brazo, enmarcada con hojas de bambú en negro",
  },
  childPortraitArm: {
    id: "retrato-nino-brazo",
    src: img12,
    alt: "Retrato realista de un niño sonriente con tocado prehispánico en el brazo, en negro y gris",
  },
  seahorseArm: {
    id: "caballito-brazo",
    src: img14,
    alt: "Pequeño caballito de mar realista en la parte trasera del brazo, en negro y gris con textura detallada",
  },
  ornamentChest: {
    id: "ornamental-pecho",
    src: img15,
    alt: "Diseño ornamental de flor de loto en línea fina negra sobre el esternón",
  },
} satisfies Record<string, Photo>;

// Orden editorial de la galería: alterna piezas grandes, retratos y detalle fino.
export const GALLERY: Photo[] = [
  PHOTOS.christForearm,
  PHOTOS.dragonArm,
  PHOTOS.lionCalf,
  PHOTOS.portraitsThighs,
  PHOTOS.childPortraitArm,
  PHOTOS.tigerChest,
  PHOTOS.catrinaArm,
  PHOTOS.seahorseArm,
  PHOTOS.zeusThigh,
  PHOTOS.aztecCalf,
  PHOTOS.ornamentChest,
  PHOTOS.pandaArm,
];
