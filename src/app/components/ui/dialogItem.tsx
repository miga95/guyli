import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from "./dialog";
import { DropdownMenuItem } from "./dropdown-menu";

interface DialogItemProps {
    triggerChildren: React.ReactNode;
    children: React.ReactNode;
    onSelect?: () => void;
    onOpenChange?: (open: boolean) => void;
  }

export const DialogItem = ({ triggerChildren, children, onSelect, onOpenChange, ...itemProps }: DialogItemProps) => {
    return (
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <DropdownMenuItem
            {...itemProps}
            className="DropdownMenuItem"
            onSelect={(event) => {
              event.preventDefault();
              if (onSelect) {
                onSelect();
              }
            }}
          >
            {triggerChildren}
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="DialogOverlay" />
          <DialogContent className="DialogContent">
            {children}
            <DialogClose asChild>
              <button className="IconButton" aria-label="Close">
                {/* Bouton de fermeture, ici tu peux ajouter une icône ou du texte */}
              </button>
            </DialogClose>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  };