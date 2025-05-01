import React from "react";

interface Project {
  title: string;
  description: string;
  link: string;
}

interface HoverEffectProps {
  items: Project[];
}

const HoverEffect: React.FC<HoverEffectProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((project, index) => (
        <a
          key={index}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 border rounded-lg hover:shadow-lg transition duration-300"
        >
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="text-gray-600">{project.description}</p>
        </a>
      ))}
    </div>
  );
};

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}

const projects: Project[] = [
  {
    title: "Stripe",
    description: "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description: "A streaming service that offers award-winning TV shows, movies, anime, and more.",
    link: "https://netflix.com",
  },
  
];

export default CardHoverEffectDemo;
