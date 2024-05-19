import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Project } from "./project";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export function Projects() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
        <Slider className="max-w-xl" {...settings}>
          <Project
            title="Reforestación de árboles en Bogotá"
            description="Somos una DAO enfocada en reforestar los bosques de Bogotá tras los incendios. Nos hemos desenvuelto principalmente en el área de ReFi y DeSci desde 2022"
            requiredFunds={10000}
            collectedFunds={5000}
            imageUrl="https://vhqpfhyaynbpkhkwuuwo.supabase.co/storage/v1/object/public/impacto/trees.webp"
          />
          <Project
            title="Re ubicación de los hipopótamos en Colombia"
            description="Somos un proyecto con el objetivo de reubicar los hipopótamos que habitan en el río Magdalena."
            requiredFunds={23500}
            collectedFunds={1250}
            imageUrl="https://vhqpfhyaynbpkhkwuuwo.supabase.co/storage/v1/object/public/impacto/hipos.webp"
          />
          <Project
            title="Conservación de truchas en el Huila"
            description="Somos un proyecto de DeSci que se enfoca en la investigación de parásitos en las truchas del Huila."
            requiredFunds={3500}
            collectedFunds={3000}
            imageUrl="https://vhqpfhyaynbpkhkwuuwo.supabase.co/storage/v1/object/public/impacto/truchas.webp"
          /> 
        </Slider>
  );
}
