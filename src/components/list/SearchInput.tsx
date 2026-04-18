import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import type { SetStateAction } from "react";

interface Props { 
    input: string;
    setInput: (value: SetStateAction<string>) => void;
    setSearchInput: (value: SetStateAction<string>) => void;
    placeholder: string;
}

const SearchInput = ({input, setInput, setSearchInput, placeholder}: Props) => {
    return (
        <div className="relative mb-4 max-w-3xs">
          <Input
            placeholder={placeholder}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="pl-9"
            onKeyDown={(event) => {
                if(event.key === 'Enter'){
                  setSearchInput(input)
                }
              }}
          />
          <Button  
              onClick={() => setSearchInput(input)} 
              className=" cursor-pointer absolute left-1 top-1/2 -translate-y-1/2 h-8 w-9 bg-white hover:bg-primary/20">
            <Search/>
          </Button>   
        </div>
    )
}

export default SearchInput;