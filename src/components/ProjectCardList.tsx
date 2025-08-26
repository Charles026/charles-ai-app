import ProjectCard from './ProjectCard';

interface ProjectCardList {
    data: {
        projectName: string;
        coverImage: string;
        projectTitle: string;
        subtitle: string;
        tags: string[];
    }[];
}

const ProjectCardList = ({ data }: ProjectCardList) => {
    return (
        <div className='flex flex-col gap-12'>
            {data.map((props) => (
                <ProjectCard key={props.projectName} {...props} />
            ))}
        </div>
    );
};

export default ProjectCardList;
