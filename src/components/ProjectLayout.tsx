import React, { ReactNode } from "react";
import Nav from "./Nav";

type ProjectLayoutProps = {
    children: ReactNode;
};

export default function ProjectLayout({ children }: ProjectLayoutProps) {
    return (
        <div>
        <Nav />
        <div id='project-main' className="relative">{children}</div>
        </div>
    );
    }
 