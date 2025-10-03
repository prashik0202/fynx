
import type { ProjectType } from '@/constants/projects'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ProjectForm from './ProjectForm'
import { Button } from '../ui/button'
import { Calendar, Edit, Trash2 } from 'lucide-react'
import Alert from '../global/Alert'

interface ProjectCardProps {
  project: ProjectType
}

const ProjectCard = ({project} : ProjectCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <ProjectForm 
            trigger={
              <Button size={"icon"} variant={"ghost"}>
                <Edit className='h-4 w-4 text-muted-foreground' />
              </Button>
            }
            type='update'
          />
          <Alert
            title='Are your sure want to delete Project'
            description='This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.'
            trigger={
              <Button size={"icon"} variant={"ghost"}>
                <Trash2 className='h-4 w-4 text-muted-foreground' />
              </Button>
            }
            onContinue={() => console.log("deleted")}
          />
        </CardAction>
      </CardHeader>
      <CardFooter>
        <span className='text-xs text-muted-foreground w-full flex items-center gap-2'>
         <Calendar className='h-3 w-3'/>{project.createdDate}
        </span>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard