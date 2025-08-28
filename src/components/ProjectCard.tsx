import Link from "next/link";
import  Image from "next/image";
import styles from "./ProjectCard.module.css";
import Tag from "./Tag";

interface Props {
    projectName: string;
    coverImage: string;
    projectTitle: string;
    subtitle: string;
    tags: string[];
    key: string;
    isExternalLink?: boolean;
  }

const ProjectCard = ({ projectName, projectTitle, coverImage, tags, subtitle, isExternalLink }: Props) => {

    return (
        <div className='w-full lg:w-4/5 mx-auto xl:w-full'>
            <div className={`${styles.imageContainer}`}>
            <Link href={isExternalLink ? projectName : `/projects/${projectName}`} target={isExternalLink ? "_blank" : undefined}>
                <Image className="w-full h-full object-cover"
                src={coverImage}
                alt={`${projectName} Cover`}
                width={600}
                height={400}
                />
            </Link>
            </div>
            <div className={styles.titleContainer}>
            <Link href={isExternalLink ? projectName : `/projects/${projectName}`} target={isExternalLink ? "_blank" : undefined}>
                <h3 className={styles.title}>{projectTitle}</h3>
            </Link>
            <p className={styles.subtitle}>{subtitle}</p>
            </div>
            <div className={styles.tagsWrapper}>
        {tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
        </div>
        
    )

}

export default ProjectCard;