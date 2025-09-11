"use client";
import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild className="z-20">
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

const Navbar = () => {
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Coding Challenge",
      href: "/generate-challenge",
      description: "Get a coding challenge based on your experience and stack",
    },
    {
      title: "Analysis",
      href: "#",
      description: "Coming Soon",
    },
    {
      title: "Roadmap Learning",
      href: "#",
      description: "Coming Soon",
    },
  ];

  return (
    <div className="bg-background w-screen py-1 border-b border-primary/50">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Image
            src="/assets/interviewai.png"
            width={130}
            height={200}
            alt="Logo of the inetrview ai"
          />
        </div>

        <div>
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-4 md:w-[500px] lg:w-[300px]">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Social List</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[250px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          target="_blank"
                          href="https://github.com/whoshriyansh/interview-ai"
                        >
                          <div className="font-medium">Github</div>
                          <div className="text-muted-foreground">
                            See the code from here
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          target="_blank"
                          href="https://www.linkedin.com/in/whoshriyansh/"
                        >
                          <div className="font-medium">Linkedin</div>
                          <div className="text-muted-foreground">
                            Let's connect on Linkedin
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          target="_blank"
                          href="https://whoshriyansh.netlify.app/"
                        >
                          <div className="font-medium">Portfolio</div>
                          <div className="text-muted-foreground">
                            See other projects I have done
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/docs">Docs</Link>
                </NavigationMenuLink>
              </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
