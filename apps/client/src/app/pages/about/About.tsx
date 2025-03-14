import { FC } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@erisfy/shadcnui';

import { navigationConfig } from '../../constants/navigationConfig';
import { Github, Twitter } from 'lucide-react';
import imageSrc from '../../../assets/images/undraw_our_solution.svg';

import { CTASection, Footer, HeroSection } from '@erisfy/landing';
import { TestimonialsSection } from '@erisfy/shadcnui-blocks';

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio: string;
  contact: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'John Beard',
    role: 'Project Lead',
    photo: 'http://placebeard.it/150',
    bio: 'John Beard is a seasoned developer with over 10 years of experience in full-stack development.',
    contact: 'john.beard@example.com',
  },
  {
    name: 'James Beard',
    role: 'UI/UX Designer',
    photo: 'http://placebeard.it/150',
    bio: 'James Beard is a creative designer who specializes in user experience and interface design.',
    contact: 'james.beard@example.com',
  },
  {
    name: 'Alex Beard',
    role: 'Frontend Developer',
    photo: 'http://placebeard.it/150',
    bio: 'Alex Beard is a frontend developer with a passion for building responsive and accessible web applications.',
    contact: 'alex.beard@example.com',
  },
];

const AboutPage: FC = () => {
  return (
    <div className="space-y-6">
      <HeroSection
        title="About Erisfy"
        subtitle="Empowering Developers with Modern React Tools"
        image={imageSrc}
        imageAlt="Banner Image"
        description="Empowering Developers with Modern React Tools"
        className="p-10"
      />

      <section className="p-6 m-4">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Mission and Vision
        </h2>
        <p>
          Our mission is to revolutionize the way developers build applications
          by providing a robust and intuitive boilerplate. Our vision is to
          create a community-driven project that continuously evolves to meet
          the needs of developers worldwide.
        </p>
      </section>

      <section className="p-6 m-4">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Company Overview
        </h2>
        <p>
          Erisfy (RWOC) was founded with the goal of
          simplifying React SPA development. Our project aims to provide a
          comprehensive boilerplate that integrates modern tools and best
          practices.
        </p>
        <h3 className="text-2xl font-bold mb-2 mt-6 text-primary">History</h3>
        <p>
          erisfy was born out of the need for a streamlined development process.
          Over the years, we have achieved several milestones, including the
          integration of Nx, Tailwind CSS, and Shadcn UI.
        </p>
        <h3 className="text-2xl font-bold mb-2 mt-6 text-primary">
          Project Goals
        </h3>
        <ul className="list-disc list-inside">
          <li>Simplified setup</li>
          <li>Seamless integration</li>
          <li>Scalability</li>
          <li>Enhanced developer experience</li>
          <li>Community collaboration</li>
        </ul>
      </section>

      <section className="p-6 m-4">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Team Introduction
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member) => (
            <Card key={member.name}>
              <CardHeader>
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-auto mb-4 rounded-lg"
                />
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{member.bio}</p>
                <p className="mt-2 text-sm text-muted">{member.contact}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <CTASection
        buttonAction={() =>
          window.open(
            'https://github.com/CambridgeMonorail/erisfy',
            '_blank'
          )
        }
        buttonText="Contribute on GitHub"
        description="Learn how you can contribute to erisfy and collaborate with the community."
        title="Community and Contributions"
        variant="light"
      />

      <section className="p-6 m-4">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Testimonials and Acknowledgments
        </h2>
        <TestimonialsSection />
      </section>

      <section className="p-6 m-4">
        <h2 className="text-3xl font-bold mb-4 text-primary">Call to Action</h2>
        <p>
          Engage with erisfy by contributing, providing feedback, or utilizing the
          boilerplate for your projects.
        </p>
      </section>

      <div className="bg-primary">
        <Footer
          navigationLinks={[
            { text: 'Home', url: navigationConfig.paths.home },
            { text: 'Features', url: navigationConfig.paths.features },
            {
              text: 'Documentation',
              url: 'https://github.com/CambridgeMonorail/erisfy',
            },
            {
              text: 'Community',
              url: 'https://discord.com/invite/your-discord-invite',
            },
            {
              text: 'GitHub',
              url: 'https://github.com/CambridgeMonorail/erisfy',
            },
          ]}
          socialMediaIcons={[
            {
              icon: Github,
              url: 'https://github.com/CambridgeMonorail/erisfy',
            },
            {
              icon: Twitter,
              url: 'https://x.com/TimDMorris',
            },
          ]}
          copyrightText="&copy; 2025 Erisfy. All rights reserved."
        />
      </div>
    </div>
  );
};

export { AboutPage };
