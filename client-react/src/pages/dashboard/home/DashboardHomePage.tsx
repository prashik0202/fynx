import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react'
import ProjectFilters from '@/components/project/ProjectFilters';
import ProjectCard from '@/components/project/projectCard';
import SearchField from '@/components/global/SearchField';
import { mockProjects } from '@/constants/projects';
import ProjectForm from '@/components/project/ProjectForm';

const DashboardHomePage = () => {
  return (
    <div className='w-full md:max-w-3/4 p-5 md:p-10 flex flex-col gap-5'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-semibold'>Projects</h1>
        <ProjectForm 
          trigger={
            <Button>Create Project <Plus /></Button>
          }
          type='create'
        />
      </div>

      <div className='flex flex-col lg:flex-row gap-5'>
        <SearchField className='relative w-full lg:max-w-sm'/>
        <ProjectFilters />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {mockProjects.filter(f => f.status !== 'archived').map((project) => (
          <ProjectCard project={project} key={project.id}/>
        ))}
      </div>

    </div>
  )
}

export default DashboardHomePage