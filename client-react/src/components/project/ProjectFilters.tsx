import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const ProjectFilters = () => {
  return (
    <div className='w-full flex gap-4'>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive" >Inactive</SelectItem>
          <SelectItem value="archive" >Archive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default ProjectFilters