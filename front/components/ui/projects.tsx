import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Project } from "./project";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Projects() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex flex-col items-left justify-center mt-10 p-2 gap-5 mb-20">
      <h1 className="text-xl font-semibold">Proyectos</h1>
      <div className="flex flex-col items-center justify-center w-full">
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
      </div>
    </div>
  );
}
