import Button from "./Button";

interface DropdownItem {
  label: string;
  onClick: () => void;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface DropdownProps {
  buttonLabel: string;
  items: DropdownItem[];
}

const Dropdown = ({ buttonLabel, items }: DropdownProps) => {
  return <></>;
};

export default Dropdown;
