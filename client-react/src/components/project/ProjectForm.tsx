import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ProjectProps {
  trigger: React.ReactNode;
  type: "create" | "update"
}

const ProjectForm = ({ trigger, type } : ProjectProps ) => {

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === 'create' && "Create Project"}
            {type === 'update' && "Update Project"}
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectForm