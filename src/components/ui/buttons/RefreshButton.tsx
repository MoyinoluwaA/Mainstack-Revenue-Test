import { type FC } from 'react'
import { ActionIcon, Tooltip } from "@mantine/core";
import { RotateCw } from "lucide-react";

interface Props { 
  onClick: () => void 
}
const RefreshButton: FC<Props> = ({ onClick }) => {
return (
  <Tooltip label="Refresh">
      <ActionIcon
        variant="filled"
        onClick={onClick}
        aria-label="Refresh"
        className="text-gray-600 hover:text-blue-600 border-1 border-black"
        radius={100}
        color="gray.3"
      >
        <RotateCw size={16} />
      </ActionIcon>
    </Tooltip>
  );
};

export default RefreshButton;
