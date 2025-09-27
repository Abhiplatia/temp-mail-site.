import { useState } from 'react';
import { ChevronDown, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Domain } from '@/lib/mail-api';

interface DomainSelectorProps {
  domains: Domain[];
  selectedDomain: Domain | null;
  onDomainSelect: (domain: Domain | null) => void;
  onGenerateNew: () => void;
}

export function DomainSelector({ domains, selectedDomain, onDomainSelect, onGenerateNew }: DomainSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDomainSelect = (domain: Domain | null) => {
    onDomainSelect(domain);
    setIsOpen(false);
  };

  const displayText = selectedDomain 
    ? `@${selectedDomain.domain}` 
    : 'Random domain';

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            data-testid="button-domain-selector"
          >
            {displayText}
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" data-testid="domain-menu">
          <DropdownMenuItem 
            onClick={() => handleDomainSelect(null)}
            data-testid="domain-random"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            <span>Random domain</span>
          </DropdownMenuItem>
          {domains.map((domain) => (
            <DropdownMenuItem 
              key={domain.id}
              onClick={() => handleDomainSelect(domain)}
              data-testid={`domain-${domain.domain}`}
            >
              <span>@{domain.domain}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button 
        onClick={onGenerateNew}
        size="sm"
        variant="secondary"
        className="text-xs"
        data-testid="button-generate-new"
      >
        <Shuffle className="mr-1 h-3 w-3" />
        New Email
      </Button>
    </div>
  );
}