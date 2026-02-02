import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import {
  Group,
  Panel as ResizablePanel,
  Separator,
} from "react-resizable-panels";
import { cn } from "../../lib/utils";

function PanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof Group>) {
  return (
    <Group
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

function Panel(props: React.ComponentProps<typeof ResizablePanel>) {
  return <ResizablePanel {...props} />;
}

function Handle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & {
  withHandle?: boolean;
}) {
  return (
    <Separator
      className={cn(
        "bg-border relative flex w-px items-center justify-center",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </Separator>
  );
}

export {
  PanelGroup as ResizablePanelGroup,
  Panel as ResizablePanel,
  Handle as ResizableHandle,
};