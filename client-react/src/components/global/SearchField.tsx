
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

interface SearchFieldProps {
  className?: string;
}

const SearchField = ({ className } : SearchFieldProps) => {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <Input placeholder="Search projects..." className="pl-9" />
    </div>
  )
}

export default SearchField