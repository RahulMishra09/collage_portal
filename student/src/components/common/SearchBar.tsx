import type { FC } from 'react';
import { memo } from 'react';
import {Search} from 'lucide-react';
import type { SearchBarProps } from '@/models/search';

const SearchBar: FC<SearchBarProps> = memo(({placeholder = "Search..."}) => {
    return (
        <div
            className="h-12 flex items-center border-2 rounded-full px-4 py-2 shadow-sm flex-grow "
        >
            <Search className="w-5 h-5 text-gray-500 mr-2"/>
            <input
                type="text"
                placeholder={placeholder}
                className="flex-grow outline-none bg-transparent text-sm"
            />
        </div>
    );
});

export default SearchBar;
